import { useState } from 'react'
import './Weather.css'

function HistoricalWeather({ apiKey, location }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [date, setDate] = useState('')

  const fetchHistoricalWeather = async () => {
    if (!location || !date) {
      setError('Please enter both location and date')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://api.weatherstack.com/historical?access_key=${apiKey}&query=${encodeURIComponent(location)}&historical_date=${date}&hourly=1`
      )
      const data = await response.json()
      
      if (data.error) {
        setError(data.error.info)
      } else {
        setWeather(data)
      }
    } catch (err) {
      setError('Failed to fetch historical weather data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="weather-container glass">
      <div className="historical-controls">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
        />
        <button onClick={fetchHistoricalWeather}>Get Historical Weather</button>
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {weather && weather.historical && (
        <>
          <div className="weather-header">
            <h2>{weather.location.name}, {weather.location.country}</h2>
            <p>Historical data for {date}</p>
          </div>

          {Object.entries(weather.historical).map(([dateKey, dayData]) => (
            <div key={dateKey} className="historical-day">
              <div className="weather-details">
                <div className="detail-item">
                  <span className="label">🌡️ Min Temp</span>
                  <span className="value">{dayData.mintemp}°C</span>
                </div>
                <div className="detail-item">
                  <span className="label">🌡️ Max Temp</span>
                  <span className="value">{dayData.maxtemp}°C</span>
                </div>
                <div className="detail-item">
                  <span className="label">🌡️ Avg Temp</span>
                  <span className="value">{dayData.avgtemp}°C</span>
                </div>
                <div className="detail-item">
                  <span className="label">☀️ Sun Hours</span>
                  <span className="value">{dayData.sunhour}h</span>
                </div>
                <div className="detail-item">
                  <span className="label">☀️ UV Index</span>
                  <span className="value">{dayData.uv_index}</span>
                </div>
              </div>

              {dayData.hourly && (
                <div className="hourly-data">
                  <h3>Hourly Data</h3>
                  <div className="hourly-grid">
                    {dayData.hourly.slice(0, 8).map((hour, idx) => (
                      <div key={idx} className="hourly-item glass">
                        <p className="hour-time">{hour.time}</p>
                        <img src={hour.weather_icons[0]} alt="weather" width="40" />
                        <p className="hour-temp">{hour.temperature}°C</p>
                        <p className="hour-desc">{hour.weather_descriptions[0]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default HistoricalWeather
