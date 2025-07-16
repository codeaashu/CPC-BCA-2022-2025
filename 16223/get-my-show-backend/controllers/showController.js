const Show = require('../models/Show');
const Theatre = require('../models/Theatre');

// @desc   Create a new show
// @route  POST /api/shows
exports.createShow = async (req, res) => {
  try {
    const { movie, theatre, date, time, seats, pricePerSeat } = req.body;

    if (!movie || !theatre || !date || !time || !seats || !pricePerSeat) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newShow = await Show.create({
      movie,
      theatre,
      date,
      time,
      seats,
      pricePerSeat,
    });

    // ✅ Add the show to the related theatre's `shows` array
    await Theatre.findByIdAndUpdate(theatre, {
      $push: { shows: newShow._id },
    });

    res.status(201).json({ message: 'Show created successfully', show: newShow });
  } catch (err) {
    res.status(500).json({
      message: 'Error creating show',
      error: err.message,
    });
  }
};

// @desc   Get all shows for a specific movie
// @route  GET /api/shows/movie/:movieId
exports.getShowsByMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const shows = await Show.find({ movie: movieId }).populate('theatre');
    res.json(shows);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching shows for this movie',
      error: err.message,
    });
  }
};

// @desc   Get a specific show by ID
// @route  GET /api/shows/:id
exports.getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate('movie')
      .populate('theatre');

    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    res.json(show);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching show', error: err.message });
  }
};
