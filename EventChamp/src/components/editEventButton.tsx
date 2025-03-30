import {useContext, useState} from 'react'
import {EventContext} from '../context/eventContext'

export const EditEventButton = () => {
  const {createdEvents, updateEvent, deleteEvent} = useContext(EventContext)!
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [host, setHost] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [capacity, setCapacity] = useState<number | undefined>(undefined)
  const [error, setError] = useState('')

  const handleSelectEvent = (id: number) => {
    const editedEvent = createdEvents.find(event => event.id === id)
    if (editedEvent) {
      setSelectedEventId(id)
      setName(editedEvent.name)
      setHost(editedEvent.host)
      setDate(editedEvent.date)
      setLocation(editedEvent.location)
      setCapacity(editedEvent.capacity)
      setError('')
    }
  }

  const handleUpdateEvent = () => {
    if (!selectedEventId) {
      setError('Select event')
      return
    }
    if (!name || !host || !date || !location) {
      setError('Fill all fields')
      return
    }

    const updatedEvent = {
      id: selectedEventId,
      name,
      host,
      date,
      location,
      isReserved: false, 
      capacity, 
    }
    updateEvent(selectedEventId, updatedEvent)
    resetForm()
  }

  const handleDeleteEvent = () => {
    if (!selectedEventId) {
      setError('Select event to delete')
      return
    }
    deleteEvent(selectedEventId)
    resetForm()
  }

  const resetForm = () => {
    setSelectedEventId(null)
    setName('')
    setHost('')
    setDate('')
    setLocation('')
    setCapacity(undefined)
    setError('')
  }

  return (
    <div>
      <select
        value={selectedEventId || ''}
        onChange={(e) => handleSelectEvent(Number(e.target.value))}>
        <option value="">Select event to edit</option>
        {createdEvents.map(event => (
          <option key={event.id} value={event.id}>
            {event.name} - {event.date}
          </option>
        ))}
      </select>

      {error && (
        <div className="errorMessage">
          {error}
        </div>
      )}

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={host}
        onChange={(e) => setHost(e.target.value)}
        placeholder="Host"
      />
      <input
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Date"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <input
        type="number"
        value={capacity || ''}
        onChange={(e) => setCapacity(Number(e.target.value))}
        placeholder="Capacity"
      />
      <div>
        <button onClick={handleUpdateEvent}>Update Event</button>
        <button onClick={handleDeleteEvent}>Delete Event</button>
      </div>
    </div>
  )
}