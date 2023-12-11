require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./Data/Handlers/weather.js');
const getMovies = require('./Data/Handlers/movies.js');
const { errorHandler } = require('./Data/Handlers/error.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/weather', getWeather);
app.get('/movies', getMovies);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
