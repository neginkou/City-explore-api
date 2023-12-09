'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const getWeather = require('./Handlers/weather');
const handlemovies = require('./Handlers/movies'); 

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

function HandleHomePage(request, response) {
  response.status(200).send('Access Granted');
}
function HandleNotfound(request, response) {
  response.status(404).send('Denied');
}

app.get('/', HandleHomePage);

app.get("/weather", getWeather);

app.get("/movies", handlemovies); 

app.get('*', HandleNotfound);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));