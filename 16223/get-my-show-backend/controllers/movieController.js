// controllers/movieController.js
const Movie = require('../models/Movie');

// ✅ Get All Movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movies' });
  }
};

// ✅ Get Movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movie', error: err.message });
  }
};
