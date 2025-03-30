import { useContext } from 'react';
import { EventContext } from '../context/eventContext';

export default function DisplayEventsPage() {
  const { allEvents, registeredEvents, registerForEvent, unregisterFromEvent } = useContext(EventContext)!;

  return (
    <div className="display-events-page">
      <h1>Upcoming Events</h1>
      <div className="events-row">
        {allEvents.length === 0 ? (
          <p>No events available</p>
        ) : (
          allEvents.map(event => (
            <div key={event.id} className="event-container">
              {/* Event Image */}
              <img src={event.image || '/default-event.jpg'} alt={event.name} className="event-image" />

              {/* Event Details */}
              <div className="event-details">
                <h3>{event.name || "Unnamed Event"}</h3>
                <p><strong>Host:</strong> {event.host}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Time:</strong> {event.date}</p>
                <p><strong>Spots:</strong> {event.attendees}</p>
              </div>

              {/* Register/Unregister Button */}
              {registeredEvents.some(e => e.id === event.id) ? (
                <button onClick={() => unregisterFromEvent(event.id)} className="unregister-btn">
                  Unregister
                </button>
              ) : (
                <button onClick={() => registerForEvent(event.id)} className="register-btn">
                  Register
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
