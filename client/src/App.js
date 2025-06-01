import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import WeatherHistory from './components/WeatherHistory';
import Clouds from './components/Clouds';

function App() {
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');

  const searchWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5001/api/weather/${city}`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
      
      // Fetch history
      const historyResponse = await fetch(`http://localhost:5001/api/weather/history/${city}`);
      const historyData = await historyResponse.json();
      setHistory(historyData);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Clouds />
      <header className="App-header">
        <h1>Global Weather Tracker</h1>
        <form onSubmit={searchWeather} className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>
      </header>
      
      <main>
        {error && <div className="error">{error}</div>}
        {loading && <div className="loading">Loading...</div>}
        
        {weather && (
          <div className="weather-container">
            <WeatherCard weather={weather} />
            <WeatherHistory history={history} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
