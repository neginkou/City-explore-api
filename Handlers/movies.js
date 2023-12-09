'use strict';

const axios = require('axios');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const MOVIE_READ_ACCESS = process.env.MOVIE_READ_ACCESS;

class Movie {
  constructor(name, description, voteAvg) {
    this.name = name;
    this.description = description;
    this.voteAvg = voteAvg;
  }
}

let movieCache = {};

async function handlemovies(request, response) {
  const city = request.query.city;

  let movieURL = "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

  if (!movieCache[city] || (Date.new() - movieCache[city].timestamp > 50000)) {
    try {
      let movieResponse = await axios.get(movieURL, {
        params: { query: `${city}` },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${MOVIE_READ_ACCESS}`,
        },
      });

      const movieArray = movieResponse.data.results.sort(
        (a, b) => b.vote_average - a.vote_average
      );

      if (movieResponse) {
        const sortedMovies = movieArray.map((value) => {
          const name = value.original_title;
          const description = value.overview;
          const voteAvg = value.vote_average;
          return new Movie(name, description, voteAvg);
        });
        movieCache[city] = {};
        movieCache[city] = sortedMovies;
        movieCache[city].timestamp = Date.now();
      }
    } catch (error) {
      let errorMessage = error.message;
      console.error(errorMessage);
    }
  } else {
    console.log(`We have ${city} at home`);
  }
  response.json(movieCache[city]);
}

module.exports = handlemovies;