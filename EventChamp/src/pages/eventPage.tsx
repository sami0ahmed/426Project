import { useState, useEffect } from 'react'
import CreateEventButton from '../components/createEventButton'
import EditEventButton from '../components/editEventButton'

type Event = {
  id: string
  name: string
  host: string
  date: string
  location: string
  isReserved: boolean
  capacity?: number
}

export default function EventPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([])

  // Load data from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('userEvents')
    const savedRegistered = localStorage.getItem('registeredEvents')
    
    if (savedEvents) setEvents(JSON.parse(savedEvents))
    if (savedRegistered) setRegisteredEvents(JSON.parse(savedRegistered))
  }, [])

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('userEvents', JSON.stringify(events))
  }, [events])

  useEffect(() => {
    localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents))
  }, [registeredEvents])

  const handleEventCreated = (newEvent: Event) => {
    setEvents([...events, newEvent])
  }

  const handleEventUpdated = (updatedEvent: Event) => {
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e))
  }

  const handleEventDeleted = (id: string) => {
    setEvents(events.filter(e => e.id !== id))
  }

  const handleRegisterForEvent = (event: Event) => {
    if (!registeredEvents.some(e => e.id === event.id)) {
      setRegisteredEvents([...registeredEvents, event])
    }
  }

  const handleUnregisterFromEvent = (id: string) => {
    setRegisteredEvents(registeredEvents.filter(e => e.id !== id))
  }

  return (
    <div className="event-page">
      <h1>My Events</h1>
      
      <div className="button-group">
        <CreateEventButton onEventCreated={handleEventCreated} />
        <EditEventButton 
          events={events} 
          onEventUpdated={handleEventUpdated} 
          onEventDeleted={handleEventDeleted} 
        />
      </div>
      
      <div className="events-container">
        <div className="events-column">
          <h2>Created Events</h2>
          {events.length === 0 ? (
            <p>No events created yet.</p>
          ) : (
            <ul className="events-list">
              {events.map(event => (
                <li key={event.id} className="event-item">
                  <h3>{event.name}</h3>
                  <p>Host: {event.host}</p>
                  <p>When: {event.date}</p>
                  <p>Where: {event.location}</p>
                  {event.isReserved && <p>Capacity: {event.capacity}</p>}
                  <button 
                    onClick={() => handleRegisterForEvent(event)}
                    disabled={registeredEvents.some(e => e.id === event.id)}
                  >
                    {registeredEvents.some(e => e.id === event.id) ? 'Registered' : 'Register'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="events-column">
          <h2>Registered Events</h2>
          {registeredEvents.length === 0 ? (
            <p>No registered events yet.</p>
          ) : (
            <ul className="events-list">
              {registeredEvents.map(event => (
                <li key={event.id} className="event-item">
                  <h3>{event.name}</h3>
                  <p>Host: {event.host}</p>
                  <p>When: {event.date}</p>
                  <p>Where: {event.location}</p>
                  <button onClick={() => handleUnregisterFromEvent(event.id)}>
                    Unregister
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}