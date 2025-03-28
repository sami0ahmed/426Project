import {useContext, useState } from 'react'
import { EventContext } from '../context/eventContext'

const CreateEventButton = () => {
  const {createEvent} = useContext(EventContext)!;
  const [name, setName] = useState('')
  const [host, setHost] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [capacity, setCapacity] = useState<number | undefined>(undefined)

  const handleCreateEvent = () => {
    if (name && host && date && location) {
      // Prepare event object
      const newEvent = {
        name,
        host,
        date,
        location,
        isReserved: false, 
        capacity, 
      }

      // Call the `createEvent` function from context
      createEvent(newEvent)

      // Clear form inputs (optional)
      setName('')
      setHost('')
      setDate('')
      setLocation('')
      setCapacity(undefined)
    } else {
      alert('Please fill in all the fields')
    }
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Event Name"
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
        placeholder="Event Date"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Event Location"
      />
      <input
        type="number"
        value={capacity || ''}
        onChange={(e) => setCapacity(Number(e.target.value))}
        placeholder="Event Capacity (Optional)"
      />
      <button onClick={handleCreateEvent}>Create Event</button>
    </div>
  )
}
