import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/assets/no-poster.jpg'; // fallback image in /public/assets
  };

  return (
    <div className="bg-secondary rounded-xl shadow-md p-3 w-60">
      <img
        src={movie?.poster || '/assets/no-poster.jpg'}
        onError={handleImageError}
        alt={movie?.title || 'No Title'}
        className="rounded-md w-full h-72 object-cover"
      />
      <h3 className="text-white font-semibold mt-2">{movie?.title || 'Untitled'}</h3>
      <p className="text-sm text-gray-400">
        {new Date(movie?.releaseDate).getFullYear() || 'Unknown'} • {movie?.genre || 'Genre'}
      </p>
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={() => navigate(`/movie/${movie?._id}`)}
          className="bg-accent px-3 py-1 rounded-full text-sm font-medium"
        >
          Buy Tickets
        </button>
        <span className="text-pink-400 font-bold">⭐ {movie?.rating || 'N/A'}</span>
      </div>
    </div>
  );
};

export default MovieCard;
