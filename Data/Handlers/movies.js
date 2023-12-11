const axios = require('axios');
const { errorHandler } = require('./error.js');



async function getMovies(req, res) {
  const { city } = req.query;
  const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city}`);
    const moviesData = response.data.results.map(movie => ({
      name: movie.title,
      description: movie.overview,
      voteAvg: movie.vote_average
    }));
    res.json(moviesData);
  } catch (error) {
    errorHandler(error, req, res);
  }
}

module.exports = getMovies;
