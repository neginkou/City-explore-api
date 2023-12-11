const axios = require('axios');
const { errorHandler } = require('./error.js');

async function getWeather(req, res) {
  const { lat, lon } = req.query;
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

  try {
    const response = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`);
    const weatherData = response.data.data.map(day => ({
      date: day.datetime,
      highTemp: day.high_temp,
      lowTemp: day.low_temp
    }));
    res.json(weatherData);
  } catch (error) {
    errorHandler(error, req, res);
  }
}

module.exports = getWeather;
