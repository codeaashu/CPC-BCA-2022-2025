import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

const TheatrePage = () => {
  const { movieId } = useParams();
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'}/theatres/movie/${movieId}`
        );
        setTheatres(res.data);
      } catch (err) {
        console.error('Error loading theatres', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTheatres();
  }, [movieId]);

  return (
    <div className="bg-primary text-white pt-20 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-10 text-center">🎬 Available Theatres & Showtimes</h2>

        {loading ? (
          <Loader />
        ) : theatres.length === 0 ? (
          <p className="text-center text-gray-400">No theatres found for this movie.</p>
        ) : (
          <div className="space-y-10">
            {theatres.map((theatre) => (
              <div key={theatre._id} className="bg-secondary rounded-xl shadow-md flex flex-col md:flex-row gap-6 p-6">
                {/* 🎬 Theatre Image */}
                <img
                  src={theatre.image || 'https://via.placeholder.com/300x180?text=No+Image'}
                  alt={theatre.name}
                  className="w-full md:w-60 h-36 object-cover rounded-lg shadow-lg"
                />

                {/* 📍 Theatre Info */}
<div className="flex-1">
  <h3 className="text-2xl font-semibold">{theatre.name}</h3>
  <p className="text-gray-400 text-sm mb-4">
    {theatre.location || 'Location not specified'}
  </p>

  {/* 🎟️ Show Timing Buttons */}
  <div className="flex flex-wrap gap-4">
    {theatre.shows.map((show) =>
      show.time.split(',').map((timeStr, idx) => (
        <button
          key={`${show._id}-${idx}`}
          onClick={() => navigate(`/book/${show._id}?time=${timeStr.trim()}`)}
          className="bg-accent hover:bg-pink-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow"
        >
          {timeStr.trim()}
        </button>
      ))
    )}
  </div>
</div>

              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default TheatrePage;
