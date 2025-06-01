import React, { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Popular cities for suggestions
  const popularCities = [
    'London', 'New York', 'Tokyo', 'Paris', 'Sydney',
    'Dubai', 'Singapore', 'Hong Kong', 'Rome', 'Berlin'
  ];

  useEffect(() => {
    if (city.trim()) {
      const filtered = popularCities.filter(c => 
        c.toLowerCase().includes(city.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [city]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city.trim()) {
      setIsLoading(true);
      setError('');
      try {
        await onSearch(city);
      } catch (err) {
        setError('City not found. Please try another city.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSuggestionClick = (suggestedCity) => {
    setCity(suggestedCity);
    setSuggestions([]);
    onSearch(suggestedCity);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-bar">
        <div className="search-input-container">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="search-input"
            disabled={isLoading}
          />
          {isLoading && <div className="search-spinner"></div>}
        </div>
        <button 
          type="submit" 
          className="search-button"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="search-error">{error}</div>}

      {suggestions.length > 0 && (
        <div className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar; 