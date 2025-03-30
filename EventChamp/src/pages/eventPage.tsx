import { EventContext } from '../context/eventContext'
import { useContext } from 'react'
import { CreateEventButton } from '../Components/createEventButton'
import { EditEventButton } from '../Components/editEventButton'

export default function EventPage() {
  const {createdEvents, registeredEvents, registerForEvent, unregisterFromEvent} = useContext(EventContext)!

  return (
    <div className="event-page">
      <h1>My Events</h1>
      <div className="button-group">
        <CreateEventButton />
        <EditEventButton />
      </div>
      <div className="eventContainer">
        <div className="createdEvents">
          <h2>Created Events</h2>
          {createdEvents.length === 0 ? ( <p>No events created</p>) : (
            <ul className="eventsList">
              {createdEvents.map(event => (
                <li key={event.id} className="events">
                  <h3>{event.name}</h3>
                  <p>Host: {event.host}</p>
                  <p>When: {new Date(event.date).toLocaleString()}</p>
                  <p>Where: {event.location}</p>
                  {event.isReserved && <p>Capacity: {event.capacity}</p>}
                  <button onClick={() => registerForEvent(event.id)} disabled={registeredEvents.some(e => e.id === event.id)}>
                    {registeredEvents.some(e => e.id === event.id) ? 'Registered' : 'Register'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="registeredEvents">
          <h2>Registered Events</h2>
          {registeredEvents.length === 0 ? ( <p>No registered events</p> ) : (
            <ul className="eventsList">
              {registeredEvents.map(event => (
                <li key={event.id} className="events">
                  <h3>{event.name}</h3>
                  <p>Host: {event.host}</p>
                  <p>When: {new Date(event.date).toLocaleString()}</p>
                  <p>Where: {event.location}</p>
                  <button onClick={() => unregisterFromEvent(event.id)}>Unregister</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
