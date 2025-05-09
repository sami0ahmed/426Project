import logging
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import time
import asyncio
from contextlib import asynccontextmanager

# Define port, microservice URL, and logger info
PORT = 3000
REGISTRY_URL = "http://registry:3000"
logger = logging.getLogger("service-event")
logging.basicConfig(level=logging.INFO)

# Store events and registrations
events = []
registrations = {} 

# Register our microservice; if it fails then our app will not start
async def lifespan(app: FastAPI):
    success = await register_with_registry("service-event", f"http://service-event:{PORT}")
    if not success:
        logger.error("Could not register with registry. Exiting.")
        os._exit(1)
    yield
app = FastAPI(lifespan=lifespan)

# Define structure of event and message objects
class Message(BaseModel):
    source: str
    message: str

class Event(BaseModel):
    id: str
    name: str
    host: str
    date: str
    location: str
    isReserved: bool = False
    capacity: int = None

# Gets all the events that have been created
@app.get("/events")
async def getEvents():
    return {"events": events}

# Creates a new event
@app.post("/events")
async def createEvent(event: Event):
    # Add event to our main events list
    events.append(event)
    logger.info(f"Created event: {event.name}")
    return {"event": event}

# Register a user for an event
@app.post("/register/{eventId}/{userId}")
async def registerEvent(eventId: str, userId: str):
    # Check if event exists, if not then raise error
    event = None
    for e in events:
        if e.id == eventId:
            event = e
            break
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Add the event to list of events that require registration
    if eventId not in registrations:
        registrations[eventId] = []
    
    # Add user to registered event
    if userId not in registrations[eventId]:
        registrations[eventId].append(userId)
        logger.info(f"User {userId} registered for {event.name}")
    return {"status": "success"}

# Unregister user from event
@app.post("/unregister/{eventId}/{userId}")
async def unregisterEvent(eventId: str, userId: str):
    # check if user is actually registered for event, if so then remove them
    if eventId in registrations and userId in registrations[eventId]:
        registrations[eventId].remove(userId)
        logger.info(f"User {userId} unregistered from event {eventId}")
    return {"status": "success"}

# Get events user has registered for
@app.get("/registered/{userId}")
async def getRegEvents(userId: str):
    userEvents = []
    for eventId, users in registrations.items():
        if userId in users:
            for event in events:
                if event.id == eventId:
                    userEvents.append(event)
    return {"events": userEvents}

# Log microservice communication
@app.post("/")
async def process_message(message: Message):
    logger.info(f"Received message from {message.source}")
    return {
        "from": "service-event",
        "originalMessage": message.message,
        "sourceService": message.source,
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }

# Add this micro service with our main microservice registry
# Will try to add the micro service 5 times if not then an exception will be thrown
async def register_with_registry(name: str, url: str, max_retries=5) -> bool:
    for attempt in range(max_retries):
        try:
            async with httpx.AsyncClient() as client:
                res = await client.post(
                    f"{REGISTRY_URL}/register",
                    json={"name": name, "url": url},
                    timeout=2.0,
                )
                if res.status_code == 200:
                    logger.info("Registered with registry.")
                    return True
                raise Exception(f"Status code: {res.status_code}")
        except Exception as e:
            logger.warning(f"Registry registration failed (attempt {attempt+1}): {e}")
            await asyncio.sleep((attempt + 1) * 1)
    return False