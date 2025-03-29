import './styles/App.css'
import Navbar from './components/Navbar'
import {EventProvider} from './context/eventContext'
import EventPage from './pages/eventPage'

function App() {
  return (
    <EventProvider>
      <div className="app">
        <Navbar />
        <div className="container mx-auto py-8">
        </div>
      </div>
    </EventProvider>
  )
}

export default App