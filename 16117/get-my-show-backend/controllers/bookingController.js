const Booking = require('../models/Booking');
const Show = require('../models/Show');

// ✅ Book ticket
const bookTicket = async (req, res) => {
  const { userId, showId, seatsBooked, amountPaid, paymentId } = req.body;

  try {
    console.log('🔐 Booking request received:', req.body);

    const show = await Show.findById(showId);
    if (!show) return res.status(404).json({ message: 'Show not found' });

    // ✅ Ensure show.seats.booked is initialized
    if (!show.seats || !Array.isArray(show.seats.booked)) {
      show.seats = { total: show.seats?.total || 50, booked: [] };
    }

    // ✅ Check for already booked seats
    const conflict = seatsBooked.some(seat => show.seats.booked.includes(seat));
    if (conflict) {
      return res.status(400).json({ message: 'One or more seats already booked' });
    }

    // ✅ Proceed to book
    const booking = await Booking.create({
      user: userId,
      show: showId,
      seatsBooked,
      amountPaid,
      paymentStatus: 'completed',
      paymentId,
    });

    // ✅ Update booked seats in Show document
    show.seats.booked.push(...seatsBooked);
    await show.save();

    res.status(201).json({
      message: 'Booking successful',
      bookingId: booking._id,
      booking,
    });

  } catch (err) {
    console.error('Booking Error:', err);
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
};

// ✅ Get bookings by user
const getUserBookings = async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await Booking.find({ user: userId })
      .populate('show')
      .populate('user');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
};

// ✅ Export both functions
module.exports = {
  bookTicket,
  getUserBookings
};
