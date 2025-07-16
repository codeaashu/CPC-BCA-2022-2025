import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmBooking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <div className="text-center text-white mt-10">Invalid booking data</div>;

  const { bookingId, razorpayPaymentId, show, user, selectedSeats, totalAmount } = state;

  return (
    <div className="min-h-screen bg-primary text-white flex items-center justify-center p-6">
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold text-accent mb-4">🎉 Booking Confirmed!</h2>
        <p className="mb-2">🧾 Booking ID: <span className="text-gray-300">{bookingId}</span></p>
        <p className="mb-2">💳 Payment ID: <span className="text-gray-300">{razorpayPaymentId}</span></p>
        <p className="mb-2">🎬 Movie: {show.movie.title}</p>
        <p className="mb-2">🏢 Theatre: {show.theatre.name}</p>
        <p className="mb-2">📅 {new Date(show.date).toDateString()} | 🕒 {show.time}</p>
        <p className="mb-2">💺 Seats: {selectedSeats.join(', ')}</p>
        <p className="mb-4 font-semibold text-green-400">💰 Total Paid: ₹{totalAmount}</p>

        <button
          onClick={() => navigate('/')}
          className="bg-accent hover:bg-pink-600 w-full py-3 rounded-lg font-bold mt-4"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmBooking;
