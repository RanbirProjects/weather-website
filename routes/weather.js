const express = require('express');
const router = express.Router();
const axios = require('axios');
const Weather = require('../models/Weather');

// Get weather for a specific city
router.get('/:city', async (req, res) => {
    try {
        const { city } = req.params;
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        const weatherData = {
            city: response.data.name,
            country: response.data.sys.country,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed
        };

        // Save to database
        const weather = new Weather(weatherData);
        await weather.save();

        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather:', error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});

// Get weather history
router.get('/history/:city', async (req, res) => {
    try {
        const { city } = req.params;
        const history = await Weather.find({ city })
            .sort({ timestamp: -1 })
            .limit(10);
        res.json(history);
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ message: 'Error fetching weather history' });
    }
});

module.exports = router; 