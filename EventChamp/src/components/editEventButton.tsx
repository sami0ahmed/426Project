import { useState } from 'react'

type Event = {
  id: string
  name: string
  host: string
  date: string
  location: string
  isReserved: boolean
  capacity?: number
}

type EditEventButtonProps = {
  events: Event[]
  onEventUpdated: (updatedEvent: Event) => void
  onEventDeleted: (id: string) => void
}

export default function EditEventButton({ events, onEventUpdated, onEventDeleted }: EditEventButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
  const [eventName, setEventName] = useState('')
  const [hostName, setHostName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [isReserved, setIsReserved] = useState(false)
  const [capacity, setCapacity] = useState(0)

  const handleUpdateEvent = () => {
    if (!currentEvent) return
    
    const updatedEvent = {
      ...currentEvent,
      name: eventName,
      host: hostName,
      date: eventDate,
      location: eventLocation,
      isReserved,
      capacity: isReserved ? capacity : undefined
    }
    
    onEventUpdated(updatedEvent)
    resetForm()
    setShowModal(false)
  }

  const resetForm = () => {
    setEventName('')
    setHostName('')
    setEventDate('')
    setEventLocation('')
    setIsReserved(false)
    setCapacity(0)
    setCurrentEvent(null)
  }

  const loadEventIntoForm = (event: Event) => {
    setEventName(event.name)
    setHostName(event.host)
    setEventDate(event.date)
    setEventLocation(event.location)
    setIsReserved(event.isReserved)
    setCapacity(event.capacity || 0)
    setCurrentEvent(event)
  }

  return (
    <>
      <button 
        className="manage-btn"
        onClick={() => setShowModal(true)}
      >
        Manage Event
      </button>
      
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Manage Event</h2>
            <div className="event-selector">
              <label>Select Event to Manage:</label>
              <select 
                onChange={(e) => {
                  const selectedEvent = events.find(event => event.id === e.target.value)
                  if (selectedEvent) loadEventIntoForm(selectedEvent)
                }}
                value={currentEvent?.id || ''}
              >
                <option value="">-- Select an event --</option>
                {events.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.name} ({event.date})
                  </option>
                ))}
              </select>
            </div>
            
            {currentEvent && (
              <form onSubmit={(e) => {
                e.preventDefault()
                handleUpdateEvent()
              }}>
                <label>
                  Event Name:
                  <input 
                    type="text" 
                    value={eventName} 
                    onChange={(e) => setEventName(e.target.value)} 
                    required 
                  />
                </label>
                
                <label>
                  Host Name:
                  <input 
                    type="text" 
                    value={hostName} 
                    onChange={(e) => setHostName(e.target.value)} 
                    required 
                  />
                </label>
                
                <label>
                  Date & Time:
                  <input 
                    type="datetime-local" 
                    value={eventDate} 
                    onChange={(e) => setEventDate(e.target.value)} 
                    required 
                  />
                </label>
                
                <label>
                  Location:
                  <input 
                    type="text" 
                    value={eventLocation} 
                    onChange={(e) => setEventLocation(e.target.value)} 
                    required 
                  />
                </label>
                
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={isReserved} 
                    onChange={(e) => setIsReserved(e.target.checked)} 
                  />
                  Requires Reservation
                </label>
                
                {isReserved && (
                  <label>
                    Capacity:
                    <input 
                      type="number" 
                      min="1" 
                      value={capacity} 
                      onChange={(e) => setCapacity(parseInt(e.target.value))} 
                      required 
                    />
                  </label>
                )}
                
                <div className="modal-buttons">
                  <button type="submit">Update</button>
                  <button 
                    type="button" 
                    onClick={() => {
                      if (currentEvent) {
                        onEventDeleted(currentEvent.id)
                        setShowModal(false)
                      }
                    }}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <button type="button" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}