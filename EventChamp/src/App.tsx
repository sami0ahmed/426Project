import './styles/App.css'
import './styles/index.css'
import Navbar from './Components/Navbar'
import {EventProvider} from './context/eventContext'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Correct imports
import EventPage from './pages/eventPage'



function App() {
  return (
    <Router>
    <EventProvider>
      <div className="app">
        <Navbar>
        </Navbar>
        <Routes> 
              <Route path="/EventChamp/src/pages/eventPage.tsx" element={<EventPage/>} /> 
            </Routes>
        <div className="container mx-auto py-8">
        </div>
      </div>
    </EventProvider>
    </Router>
  )
}

export default App