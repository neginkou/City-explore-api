'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
let weatherData = require('./Data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;
console.log(weatherData);

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;

  }
}

app.get('/weather', (request, response) => {
  const { lat, lon, searchQuery } = request.query;
  console.log(lat, lon, searchQuery);

  if (lat && lon) {

    const cityWeather = weatherData.find((city) =>
      city.lat === lat &&
      city.lon === lon
    );
    console.log('cityweather', cityWeather.data);
    if (cityWeather) {
      response.json(cityWeather.data.map(day => new Forecast(day.valid_date, day.weather.description)));
    }
    else {
      response.status(404).json({ error: 'City not found in weather data.' });

    }
  }
  else if (searchQuery) {
    const cityname = searchQuery.toLowerCase();
    const cityWeather = weatherData.find(city =>
      city.city_name.toLowerCase() === cityname
    );
    if (cityWeather) {
      response.json(cityWeather.data.map(day => new Forecast(day.valid_date, day.weather.description)));

    }
  }


});

app.get('*', (request, response) => {
  response.status(404).send('Page Not Available');
});

app.use((error, request, response) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
