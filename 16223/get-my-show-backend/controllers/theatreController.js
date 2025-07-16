const Theatre = require('../models/Theatre');
const Show = require('../models/Show');

// ➕ Add a new theatre (updated)
exports.addTheatre = async (req, res) => {
  try {
    const { name, location, image, shows } = req.body;

    const theatre = new Theatre({
      name,
      location,
      image,
      shows: shows || [],
    });

    await theatre.save();

    res.status(201).json({
      message: 'Theatre created successfully',
      theatre,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add theatre', error: err.message });
  }
};


// 📥 Get all theatres with shows
exports.getAllTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find().populate('shows');
    res.json(theatres);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch theatres', error: err.message });
  }
};

// 🎬 Get all theatres that have shows for a specific movie
exports.getTheatresByMovie = async (req, res) => {
  const { movieId } = req.params;
  try {
    // Step 1: Fetch all shows for this movie and populate theatre
    const shows = await Show.find({ movie: movieId }).populate('theatre');

    // Step 2: Group shows by theatre
    const theatreMap = new Map();

    for (const show of shows) {
      const theatreId = show.theatre._id.toString();
      if (!theatreMap.has(theatreId)) {
        theatreMap.set(theatreId, {
          _id: show.theatre._id,
          name: show.theatre.name,
          location: show.theatre.location,
          image: show.theatre.image,
          shows: [],
        });
      }

      theatreMap.get(theatreId).shows.push({
        _id: show._id,
        time: show.time,
        date: show.date,
        price: show.pricePerSeat,
      });
    }

    // Step 3: Return grouped result
    const result = Array.from(theatreMap.values());
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch theatres by movie', error: err.message });
  }
};
