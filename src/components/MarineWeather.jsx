import { useState } from 'react'
import './Weather.css'

function MarineWeather({ apiKey, latitude, longitude }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMarineWeather = async () => {
    if (!latitude || !longitude) {
      setError('Please enter both latitude and longitude')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://api.weatherstack.com/marine?access_key=${apiKey}&latitude=${latitude}&longitude=${longitude}&hourly=1&tide=yes`
      )
      const data = await response.json()
      
      if (data.error) {
        setError(data.error.info)
      } else {
        setWeather(data)
      }
    } catch (err) {
      setError('Failed to fetch marine weather data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="weather-container glass">
      <div className="historical-controls">
        <button onClick={fetchMarineWeather}>Get Marine Weather</button>
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {weather && weather.forecast && (
        <>
          <div className="weather-header">
            <h2>Marine Weather Forecast</h2>
            <p>Lat: {latitude}, Lon: {longitude}</p>
          </div>

          <div className="marine-forecast">
            {weather.forecast.slice(0, 3).map((day, idx) => (
              <div key={idx} className="marine-day glass">
                <h3>{day.date}</h3>
                
                <div className="weather-details">
                  <div className="detail-item">
                    <span className="label">🌡️ Min/Max</span>
                    <span className="value">{day.mintemp}°C / {day.maxtemp}°C</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">☀️ UV Index</span>
                    <span className="value">{day.uv_index}</span>
                  </div>
                </div>

                {day.tides && day.tides.length > 0 && (
                  <div className="tides-section">
                    <h4>🌊 Tides</h4>
                    <div className="tides-grid">
                      {day.tides.map((tide, tideIdx) => (
                        <div key={tideIdx} className="tide-item">
                          <span className="tide-time">{tide.tideTime}</span>
                          <span className="tide-type">{tide.tide_type}</span>
                          <span className="tide-height">{tide.tideHeight_mt}m</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {day.hourly && day.hourly.length > 0 && (
                  <div className="marine-hourly">
                    <h4>Marine Conditions (First 3 hours)</h4>
                    {day.hourly.slice(0, 3).map((hour, hourIdx) => (
                      <div key={hourIdx} className="marine-hour-item">
                        <div className="weather-details">
                          <div className="detail-item">
                            <span className="label">🕐 Time</span>
                            <span className="value">{hour.time}</span>
                          </div>
                          <div className="detail-item">
                            <span className="label">🌊 Wave Height</span>
                            <span className="value">{hour.sig_height_m}m</span>
                          </div>
                          <div className="detail-item">
                            <span className="label">🌊 Swell</span>
                            <span className="value">{hour.swell_height}m {hour.swell_dir_16_point}</span>
                          </div>
                          <div className="detail-item">
                            <span className="label">🌡️ Water Temp</span>
                            <span className="value">{hour.water_temp}°C</span>
                          </div>
                          <div className="detail-item">
                            <span className="label">💨 Wind</span>
                            <span className="value">{hour.wind_speed} km/h {hour.wind_dir}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MarineWeather
