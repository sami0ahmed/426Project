import {useContext, useState} from 'react'
import {EventContext} from '../context/eventContext'

export const CreateEventButton = () => {
  const {createEvent} = useContext(EventContext)!
  const [name, setName] = useState('')
  const [host, setHost] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [capacity, setCapacity] = useState<number | undefined>(undefined)
  const [error, setError] = useState('')

  const handleCreateEvent = () => {
    if (!name || !host || !date || !location) {
      setError('Fill all fields')
      return
    }
    const newEvent = {
      name,
      host,
      date,
      location,
      isReserved: false, 
      capacity, 
    }
    createEvent(newEvent)
    resetForm()
  }
  const resetForm = () => {
    setName('')
    setHost('')
    setDate('')
    setLocation('')
    setCapacity(undefined)
    setError('')
  }

  return (
    <div className="createEvent">
      {error && (
        <div className="errorMessage">
          {error}
        </div>
      )}
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          setError('') 
        }}
        placeholder="Event name"
        className="formInput"
      />
      <input
        type="text"
        value={host}
        onChange={(e) => {
          setHost(e.target.value)
          setError('')
        }}
        placeholder="Host Name"
        className="formInput"
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => {
          setDate(e.target.value)
          setError('')
        }}
        className="formInput"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value)
          setError('')
        }}
        placeholder="Location"
        className="formInput"
      />
      <input
        type="number"
        value={capacity || ''}
        onChange={(e) => {
          setCapacity(Number(e.target.value))
          setError('')
        }}
        placeholder="Capacity"
        className="formInput"
      />
      
      <button onClick={handleCreateEvent} className="createButton"> Create Event </button>
    </div>
  )
}