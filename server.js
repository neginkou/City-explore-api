'use strict';

let weatherData = require('./Data/weather.json');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
  throw new Error('Something is totally broken');
});


app.get('/weather', (request, response) => {
  let type = request.query.type;
  if (weatherData[type]) {
    response.json(weatherData[type]);
  } else {
    throw new Error('No Such Weather');
  }
});


app.get('*', (request, response) => {
  response.status(404).send('Page Not Avaiable');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
