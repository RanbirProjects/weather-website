const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for weather history
const weatherHistory = new Map();

// Routes
app.get('/api/weather/:city', async (req, res) => {
    try {
        const { city } = req.params;
        const apiKey = process.env.OPENWEATHER_API_KEY;
        
        if (!apiKey) {
            return res.status(500).json({ message: 'OpenWeather API key is not configured' });
        }

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        const weatherData = {
            city: response.data.name,
            country: response.data.sys.country,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            timestamp: new Date()
        };

        // Store in memory
        if (!weatherHistory.has(city)) {
            weatherHistory.set(city, []);
        }
        weatherHistory.get(city).push(weatherData);

        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather:', error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});

// Get weather history
app.get('/api/weather/history/:city', (req, res) => {
    try {
        const { city } = req.params;
        const history = weatherHistory.get(city) || [];
        res.json(history.slice(-10)); // Return last 10 entries
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ message: 'Error fetching weather history' });
    }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 