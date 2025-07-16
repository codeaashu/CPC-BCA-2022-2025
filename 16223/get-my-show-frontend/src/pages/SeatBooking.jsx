import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

const SeatBooking = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/shows/${showId}`);
        setShow(res.data);
      } catch (err) {
        toast.error('Error loading show details');
      } finally {
        setLoading(false);
      }
    };
    fetchShow();
  }, [showId]);

  const toggleSeat = (index) => {
    if (show.seats.booked.includes(index)) return;
    setSelectedSeats((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getSeatLabel = (index) => {
    const rows = 5;
    const cols = show.seats.total / rows;
    const row = String.fromCharCode(65 + Math.floor(index / cols));
    const col = (index % cols) + 1;
    return `${row}${col}`;
  };

  const handleBooking = async () => {
    if (!user || !user._id) {
      toast.error('Please login again');
      navigate('/login');
      return;
    }

    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }

    try {
      const amount = selectedSeats.length * show.pricePerSeat;
      const fakePaymentId = `DEMO_PAY_${Date.now()}`;

      const bookingPayload = {
        showId,
        seatsBooked: selectedSeats,
        userId: user._id,             // ✅ now this will be defined
        amountPaid: amount,
        paymentId: fakePaymentId,
      };

      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/bookings`, bookingPayload);
      const bookingId = res.data?.booking?._id || 'TEMP_BOOKING_ID';

      toast.success('Booking confirmed (demo mode)!');

      navigate('/confirm', {
        state: {
          bookingId,
          razorpayPaymentId: fakePaymentId,
          show,
          user,
          selectedSeats: selectedSeats.map(getSeatLabel),
          totalAmount: amount,
        },
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Booking failed!');
    }
  };

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (!show) return <div className="text-red-500 text-center mt-10">Show not found.</div>;

  const totalSeats = show.seats.total;

  return (
    <div className="bg-primary text-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{show.theatre.name}</h2>
        <p className="text-gray-300 mb-2">🎬 {show.movie.title}</p>
        <p className="text-gray-400 mb-4">
          🕒 {show.time} | 📅 {new Date(show.date).toDateString()}
        </p>
        <p className="text-accent font-semibold mb-6">💰 ₹{show.pricePerSeat} per seat</p>

         <div className="w-full flex justify-center mt-10 mb-10">
  <div className="relative w-full max-w-3xl h-[12px] bg-pink-500 rounded-t-full border-t-[4px] border-pink-300 overflow-hidden">
    {/* Neon Pulse Line */}
    <div className="absolute inset-0 rounded-t-full border-t-2 border-pink-400 animate-neon-glow" />
  </div>
</div>
<div className="text-center text-sm text-pink-400 font-semibold tracking-widest mb-6 animate-text-pulse">
  SCREEN
</div>
        <div className="grid grid-cols-10 gap-2 mb-8">
          {Array.from({ length: totalSeats }).map((_, index) => {
            const isBooked = show.seats.booked.includes(index);
            const isSelected = selectedSeats.includes(index);
            const label = getSeatLabel(index);

            return (
              <button
                key={index}
                onClick={() => toggleSeat(index)}
                disabled={isBooked}
                className={`w-10 h-10 rounded text-xs font-bold transition ${
                  isBooked
                    ? 'bg-gray-500 cursor-not-allowed'
                    : isSelected
                    ? 'bg-green-500'
                    : 'bg-white text-black hover:bg-accent'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <p className="text-sm text-gray-400 mb-2">
          Selected Seats: {selectedSeats.map(getSeatLabel).join(', ') || 'None'}
        </p>
        <p className="text-lg font-semibold mb-6">
          Total: ₹{selectedSeats.length * show.pricePerSeat}
        </p>

        <button
          onClick={handleBooking}
          className="bg-accent hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold"
        >
          Book Now (Demo Mode)
        </button>
      </div>
    </div>
  );
};

export default SeatBooking;
