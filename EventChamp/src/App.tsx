import {EventProvider} from './context/eventContext'
import EventPage from './pages/eventPage'

function App() {
  return (
    <EventProvider>
      <div className="app">
        <EventPage />
      </div>
    </EventProvider>
  )
}

export default App