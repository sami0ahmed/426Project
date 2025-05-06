import logging
import os
from fastapi import FastAPI, Request
from pydantic import BaseModel
import httpx
import time
import asyncio
from contextlib import asynccontextmanager

PORT = 3000
REGISTRY_URL = "http://registry:3000"

logger = logging.getLogger("service-location")
logging.basicConfig(level=logging.INFO)

# Define lifespan context manager


@asynccontextmanager
async def lifespan(app: FastAPI):
    success = await register_with_registry("service-location", f"http://service-location:{PORT}")
    if not success:
        logger.error("Could not register with registry after retries. Exiting.")
        os._exit(1)
    yield  # App starts only if registration succeeded


app = FastAPI(lifespan=lifespan)


class Message(BaseModel):
    source: str
    message: str
    
async def get_location_from_ip():

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get('https://api.ipify.org?format=json')
            response.raise_for_status()  # Raise an exception for bad status codes
            ip_address = response.json()['ip']

        geolocator = Nominatim(user_agent="eventBrite")  # Replace with your app name
        location = geolocator.geocode(ip_address, addressdetails=True)
        if location:
            return {
                "latitude": location.latitude,
                "longitude": location.longitude,
                "city": location.raw.get('address', {}).get('city'),
                "country": location.raw.get('address', {}).get('country')
            }
        else:
            return {"error": "Could not determine location from IP."}
    except httpx.HTTPError as e:
        return {"error": f"HTTP error occurred: {e}"}
    except Exception as e:
        return {"error": f"An unexpected error occurred: {e}"}

@app.post("/")
async def enrich(message: Message, request: Request):
    logger.info(f"Received message from {message.source}")
    location_data = await get_location_from_ip() 
    return {
        "from": "service-location",
        "originalMessage": location_data,
        "sourceService": message.source,
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }


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

    return False  # Graceful exit will happen in lifespan
