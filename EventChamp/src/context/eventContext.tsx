import {createContext, ReactNode, useState, useEffect} from 'react'

// define our event type 
// our events will have these data fields
type Event = {
  id: number
  name: string
  host: string
  date: string
  location: string
  isReserved: boolean
  capacity?: number
  attendees?: string[]
}

// define our event context including functions and arrays used in our context
type EventContextType = {
  allEvents: Event[]
  createdEvents: Event[] 
  registeredEvents: Event[] 
  createEvent: (event: Omit<Event, 'id'>) => void
  updateEvent: (id: number, updates: Partial<Event>) => void
  deleteEvent: (id: number) => void
  registerForEvent: (id: number) => void
  unregisterFromEvent: (eventId: number) => void
}

// define context
export const EventContext = createContext<EventContextType | undefined>(undefined)

// context wrapper (provider)
export function EventProvider({children}: {children: ReactNode }) {
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [createdEvents, setCreatedEvents] = useState<Event[]>([])
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([])

  // load events from localStorage
  useEffect(() => {
    const savedAllEvents = localStorage.getItem('allEvents')
    const savedCreatedEvents = localStorage.getItem('createdEvents')
    const savedRegistered = localStorage.getItem('registeredEvents')
    
    if (savedAllEvents) setAllEvents(JSON.parse(savedAllEvents))
    if (savedCreatedEvents) setCreatedEvents(JSON.parse(savedCreatedEvents))
    if (savedRegistered) setRegisteredEvents(JSON.parse(savedRegistered))
  }, [])

  // save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('allEvents', JSON.stringify(allEvents))
    localStorage.setItem('createdEvents', JSON.stringify(createdEvents))
    localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents))
  }, [allEvents, createdEvents, registeredEvents])

  // create a new event
  // load with our event info
  // give it an id number and attach an attendees list to the event
  const createEvent = (event: Omit<Event, 'id'>) => {
    let eventNum = Number(localStorage.getItem('eventNum')) || 1
   
    const newEvent = {
      ...event,
      id: eventNum,
      attendees: []
    }

    setAllEvents([...allEvents, newEvent])
    setCreatedEvents([...createdEvents, newEvent])
    localStorage.setItem('eventNum', (eventNum++).toString())
  }

  // update event (use id field to select which event we are updating)
  const updateEvent = (id: number, updates: Partial<Event>) => {
    setAllEvents(allEvents.map(e => e.id === id ? {...e, ...updates} : e))
    setCreatedEvents(createdEvents.map(e => e.id === id ? {...e, ...updates} : e))
  }

  // delete event (use id field to select which event we are deleting)
  const deleteEvent = (id: number) => {
    setAllEvents(allEvents.filter(e => e.id !== id))
    setCreatedEvents(createdEvents.filter(e => e.id !== id))
  }

  // register for event
  // if event is not in our registeredEvents list then add it
  const registerForEvent = (id: number) => {
    const event = allEvents.find(e => e.id === id)
    if (event && !registeredEvents.some(e => e.id === id)) {
      setRegisteredEvents([...registeredEvents, event])
    }
  }

  // unregister for event
  // remove it from our register list 
  const unregisterFromEvent = (id: number) => {
    setRegisteredEvents(registeredEvents.filter(e => e.id !== id))
  }

  return (
    <EventContext.Provider value={{
      allEvents,
      createdEvents,
      registeredEvents,
      createEvent,
      updateEvent,
      deleteEvent,
      registerForEvent,
      unregisterFromEvent
    }}>
      {children}
    </EventContext.Provider>
  )
}
