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

async function handlemovies(request, response) {
  const { city } = request.query;

  let movieURL = "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

  if (city) {
    try {
      let movieResponse = await axios.get(movieURL, {
        params: { query: `${city}` },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${MOVIE_READ_ACCESS}`,
        },
      });

      if (movieResponse) {
        const movieArray = movieResponse.data.results.sort((a, b) => b.vote_average - a.vote_average);

        const sortedMovies = movieArray.map((value) => {
          const name = value.original_title;
          const description = value.overview;
          const voteAvg = value.vote_average;
          return new Movie(name, description, voteAvg);
        });

        response.json(sortedMovies);
      } else {
        console.log("No movies found");
      }
    } catch (error) {
      console.error("Error making TMDb API request:", error.message);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = handlemovies;