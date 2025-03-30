import { useContext, useState } from 'react';
import { EventContext } from '../context/eventContext';

export const CreateEventButton = () => {
  const { createEvent } = useContext(EventContext)!;
  const [name, setName] = useState('');
  const [host, setHost] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState<number | undefined>(undefined);
  const [error, setError] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Convert the file to a base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateEvent = () => {
    if (!name || !host || !date || !location) {
      setError('Fill all fields');
      return;
    }
    const newEvent = {
      name,
      host,
      date,
      location,
      isReserved: false,
      capacity,
      image: image || '/default-event.jpg', // Use uploaded image or default
    };
    createEvent(newEvent);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setHost('');
    setDate('');
    setLocation('');
    setCapacity(undefined);
    setError('');
    setImage(null);
  };

  return (
    <div className="createEvent">
      {error && <div className="errorMessage">{error}</div>}
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError('');
        }}
        placeholder="Event name"
        className="formInput"
      />
      <input
        type="text"
        value={host}
        onChange={(e) => {
          setHost(e.target.value);
          setError('');
        }}
        placeholder="Host Name"
        className="formInput"
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          setError('');
        }}
        className="formInput"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
          setError('');
        }}
        placeholder="Location"
        className="formInput"
      />
      <input
        type="number"
        value={capacity || ''}
        onChange={(e) => {
          setCapacity(Number(e.target.value));
          setError('');
        }}
        placeholder="Capacity"
        className="formInput"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="formInput"
      />
      {image && <img src={image} alt="Preview" className="imagePreview" />}
      <button onClick={handleCreateEvent} className="createButton">
        Create Event
      </button>
    </div>
  );
};