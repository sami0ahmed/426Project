import { EventContext } from '../context/eventContext'
import { useContext } from 'react'
import LogoutButton from '../Components/logoutButton'

export default function AccountInfoPage() {
  const {createdEvents, registeredEvents} = useContext(EventContext)!

  return (
    <div className="account-page">
      <h1>My Account</h1>
      <div className="button-group">
        <LogoutButton />
      </div>
      <div className="accountContainer">
        <div className="accountInfo">
          <h2 id="accountNAMEHERE">My Name</h2>
          {createdEvents.length === 0 ? ( <a>Created Events: 0</a> ) : (
            <a href="/events">View Created Events</a>
          )}
        </div>
        <div className="registeredEvents">
          <h2>Registered Events</h2>
          {registeredEvents.length === 0 ? ( <p>Registered for events: 0</p> ) : (
            <a href="/events">View Registered for Events</a>
          )}
        </div>
      </div>
    </div>
  );
}
