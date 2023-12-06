'use strict';

let weatherData = require('./Data/weather.json');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

const createForecastArray = (cityData) => {
  const forecastArray = [];

  for (const dayData of cityData.data) {
    const date = dayData.valid_date;
    const description = dayData.weather.description;

    const forecast = { date, description };

    forecastArray.push(forecast);
  }

  return forecastArray;
};

for (const city of weatherData) {
  city.forecast = createForecastArray(city);
}

app.get('/weather', (request, response) => {
  const { lat, lon, searchQuery } = request.query;

  if (!lat || !lon || !searchQuery) {
    return response.status(400).json({ error: 'Latitude, longitude, and searchQuery are required.' });
  }

  const cityWeather = weatherData.find(city => {
    return (
      city.lat === lat.toString() &&
      city.lon === lon.toString() &&
      city.city_name.toLowerCase() === searchQuery.toLowerCase()
    );
  });

  if (!cityWeather) {
    return response.status(404).json({ error: 'City not found in weather data.' });
  }

  response.json(cityWeather);
});

app.get('*', (request, response) => {
  response.status(404).send('Page Not Available');
});

app.use((error, request, response) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
