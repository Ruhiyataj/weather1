import { useState } from 'react'
import CurrentWeather from './components/CurrentWeather'
import HistoricalWeather from './components/HistoricalWeather'
import MarineWeather from './components/MarineWeather'
import './App.css'

const API_KEY = '34c10eeb7fc50290092e38fdcb6a3e72'

function App() {
  const [activeTab, setActiveTab] = useState('current')
  const [location, setLocation] = useState('New York')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  return (
    <div className="app">
      <header className="header glass">
        <h1>🌤️ Weather Dashboard</h1>
      </header>

      <nav className="tabs glass">
        <button 
          className={activeTab === 'current' ? 'active' : ''} 
          onClick={() => setActiveTab('current')}
        >
          Current Weather
        </button>
        <button 
          className={activeTab === 'historical' ? 'active' : ''} 
          onClick={() => setActiveTab('historical')}
        >
          Historical Weather
        </button>
        <button 
          className={activeTab === 'marine' ? 'active' : ''} 
          onClick={() => setActiveTab('marine')}
        >
          Marine Weather
        </button>
      </nav>

      <div className="filters glass">
        {activeTab !== 'marine' ? (
          <div className="filter-group">
            <input
              type="text"
              placeholder="Enter location (e.g., London)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        ) : (
          <div className="filter-group">
            <input
              type="text"
              placeholder="Latitude (e.g., 45.00)"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <input
              type="text"
              placeholder="Longitude (e.g., -2.00)"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
        )}
      </div>

      <main className="content">
        {activeTab === 'current' && <CurrentWeather apiKey={API_KEY} location={location} />}
        {activeTab === 'historical' && <HistoricalWeather apiKey={API_KEY} location={location} />}
        {activeTab === 'marine' && <MarineWeather apiKey={API_KEY} latitude={latitude} longitude={longitude} />}
      </main>
    </div>
  )
}

export default App
