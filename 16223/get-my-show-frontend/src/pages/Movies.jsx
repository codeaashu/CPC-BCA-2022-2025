// pages/Movies.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import { getAllMovies } from '../services/movieService';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAllMovies();
        setMovies(data);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-primary text-white pt-20 min-h-screen">
      <Navbar />
      <div className="px-10 py-12">
        <h2 className="text-3xl font-bold mb-6">All Movies</h2>
        {loading ? (
          <div className="text-center py-16">
            <Loader />
          </div>
        ) : (
          <div className="flex gap-6 flex-wrap">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Movies;
