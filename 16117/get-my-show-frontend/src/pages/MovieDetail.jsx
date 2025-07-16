import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'}/movies/${id}`
        );
        setMovie(res.data);
      } catch (err) {
        console.error('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBook = () => {
    navigate(`/theatre/${id}`);
  };

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (!movie) return <div className="text-red-500 text-center mt-10">Movie not found.</div>;

  return (
    <div className="bg-primary text-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 mt-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* 🎞️ Movie Poster */}
        <div>
          <img
            src={movie.poster}
            alt={movie.title}
            className="rounded-lg shadow-xl w-full object-cover"
          />
        </div>

        {/* 🎬 Movie Info */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 text-sm mb-4">
            {movie.genre} • {new Date(movie.releaseDate).getFullYear()} • {movie.duration || '2h'}
          </p>
          <p className="text-gray-300 mb-6">
            {movie.description || 'No description available.'}
          </p>
          <span className="inline-block bg-accent px-4 py-1 rounded-full text-sm font-semibold">
            ⭐ {movie.rating || 'N/A'}
          </span>

          {/* 🎫 Book CTA */}
          <div className="mt-10">
            <button
              onClick={handleBook}
              className="bg-accent hover:bg-pink-600 px-6 py-3 rounded-full font-semibold transition"
            >
              Book Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
