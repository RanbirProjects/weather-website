import React, { useState } from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weather }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!weather) return null;

  const getWeatherIcon = (description) => {
    // You can add more weather icons based on conditions
    const icons = {
      'clear sky': '☀️',
      'few clouds': '⛅',
      'scattered clouds': '☁️',
      'broken clouds': '☁️',
      'shower rain': '🌧️',
      'rain': '🌧️',
      'thunderstorm': '⛈️',
      'snow': '❄️',
      'mist': '🌫️'
    };
    return icons[description.toLowerCase()] || '🌡️';
  };

  const getWeatherBackground = (description) => {
    const backgrounds = {
      'clear': 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'clouds': 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'rain': 'https://images.unsplash.com/photo-1501691223387-dd05029fecdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'snow': 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'thunderstorm': 'https://images.unsplash.com/photo-1501691223387-dd05029fecdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'drizzle': 'https://images.unsplash.com/photo-1501691223387-dd05029fecdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'mist': 'https://images.unsplash.com/photo-1501691223387-dd05029fecdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'smoke': 'https://images.unsplash.com/photo-1501691223387-dd05029fecdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'haze': 'https://images.unsplash.com/photo-1501691223387-dd05029fecdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'dust': 'https://images.unsplash.com/photo-1501691223387-dd05029fecdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'fog': 'https://images.unsplash.com/photo-1501691223387-dd05029fecdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'sand': 'https://images.unsplash.com/photo-1501691223387-dd05029fecdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'ash': 'https://images.unsplash.com/photo-1501691223387-dd05029fecdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'squall': 'https://images.unsplash.com/photo-1501691223387-dd05029fecdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'tornado': 'https://images.unsplash.com/photo-1501691223387-dd05029fecdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'default': 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    };

    const weatherType = Object.keys(backgrounds).find(key => 
      description.toLowerCase().includes(key)
    );

    return backgrounds[weatherType] || backgrounds.default;
  };

  const getWeatherColor = (description) => {
    const colors = {
      'clear sky': '#FFD700',
      'few clouds': '#87CEEB',
      'scattered clouds': '#B0C4DE',
      'broken clouds': '#A9A9A9',
      'shower rain': '#4682B4',
      'rain': '#4169E1',
      'thunderstorm': '#483D8B',
      'snow': '#F0F8FF',
      'mist': '#E6E6FA'
    };
    return colors[description.toLowerCase()] || '#FFFFFF';
  };

  const getTemperatureClass = (temp) => {
    if (temp <= 10) return 'cold';
    if (temp <= 20) return 'cool';
    if (temp <= 30) return 'warm';
    return 'hot';
  };

  return (
    <div 
      className={`weather-card ${isExpanded ? 'expanded' : ''}`}
      style={{ 
        borderColor: getWeatherColor(weather.weather[0].description),
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${getWeatherBackground(weather.weather[0].description)})`
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="weather-header">
        <h2>{weather.name}, {weather.sys.country}</h2>
        <span className="weather-icon">
          {getWeatherIcon(weather.weather[0].description)}
        </span>
      </div>
      
      <div className="weather-details">
        <div className="weather-main">
          <div className="temperature">
            <span className={getTemperatureClass(weather.main.temp)}>
              {Math.round(weather.main.temp)}°C
            </span>
          </div>
          <div className="description">
            {weather.weather[0].description.charAt(0).toUpperCase() + 
             weather.weather[0].description.slice(1)}
          </div>
        </div>
        
        <div className="weather-info">
          <div className="info-item">
            <span className="info-label">Humidity</span>
            <span className="info-value">{weather.main.humidity}%</span>
            <div className="humidity-bar">
              <div 
                className="humidity-fill"
                style={{ width: `${weather.main.humidity}%` }}
              ></div>
            </div>
          </div>
          <div className="info-item">
            <span className="info-label">Wind Speed</span>
            <span className="info-value">{weather.wind.speed} m/s</span>
            <div className="wind-indicator">
              <span className="wind-arrow">→</span>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="additional-info">
            <div className="info-item">
              <span className="info-label">Feels Like</span>
              <span className="info-value">{Math.round(weather.main.feels_like)}°C</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Updated</span>
              <span className="info-value">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard; 