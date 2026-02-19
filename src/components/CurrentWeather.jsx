import { useState, useEffect } from 'react'
import './Weather.css'

function CurrentWeather({ apiKey, location }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!location) return

    const fetchWeather = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(
          `https://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(location)}`
        )
        const data = await response.json()
        
        if (data.error) {
          setError(data.error.info)
        } else {
          setWeather(data)
        }
      } catch (err) {
        setError('Failed to fetch weather data')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [apiKey, location])

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">{error}</div>
  if (!weather) return <div className="loading">Enter a location to see weather</div>

  return (
    <div className="weather-container glass">
      <div className="weather-header">
        <h2>{weather.location.name}, {weather.location.country}</h2>
        <p>{weather.location.localtime}</p>
      </div>

      <div className="weather-main">
        <div className="weather-icon">
          <img src={weather.current.weather_icons[0]} alt="weather" />
          <p>{weather.current.weather_descriptions[0]}</p>
        </div>
        <div className="temperature">
          <h1>{weather.current.temperature}°C</h1>
          <p>Feels like {weather.current.feelslike}°C</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="label">💨 Wind</span>
          <span className="value">{weather.current.wind_speed} km/h {weather.current.wind_dir}</span>
        </div>
        <div className="detail-item">
          <span className="label">💧 Humidity</span>
          <span className="value">{weather.current.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="label">🌡️ Pressure</span>
          <span className="value">{weather.current.pressure} MB</span>
        </div>
        <div className="detail-item">
          <span className="label">👁️ Visibility</span>
          <span className="value">{weather.current.visibility} km</span>
        </div>
        <div className="detail-item">
          <span className="label">☁️ Cloud Cover</span>
          <span className="value">{weather.current.cloudcover}%</span>
        </div>
        <div className="detail-item">
          <span className="label">☀️ UV Index</span>
          <span className="value">{weather.current.uv_index}</span>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
