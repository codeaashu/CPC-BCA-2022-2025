import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { getAllMovies } from '../services/movieService';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader'; // optional

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const showFour = movies.slice(0, 4);

  return (
    <div className="bg-primary text-white">
      {/* 🔝 Fixed Navbar */}
      <Navbar />

      {/* 🎞️ Hero Section */}
      <section
        className="h-[85vh] bg-cover bg-center flex flex-col justify-center items-start px-8 md:px-20"
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/background/20230618/original/pngtree-blank-movie-ticket-with-popcorn-bucket-filmstrip-clapperboard-and-camera-in-picture-image_3709549.jpg')",
        }}
      >
        <p className="text-red-500 font-semibold text-sm mb-2"></p>
        {/* <h1 className="text-5xl font-bold mb-4 leading-tight max-w-2xl">
          Sitaare Zameen Par
        </h1>
        <p className="text-sm text-gray-200 max-w-xl mb-4">
          Action | Adventure | Sci-Fi <span className="mx-2">•</span> 2018 <span className="mx-2">•</span> 2h 8m
        </p>
        <p className="text-gray-300 max-w-xl mb-6">
          In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.
        </p>
        <button
          onClick={() => navigate('/movies')}
          className="bg-accent hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold transition"
        >
          Explore Movies →
        </button> */}
      </section>

      {/* 🎬 Now Showing */}
      <section className="px-6 md:px-20 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Now Showing</h2>
          <button
            onClick={() => navigate('/movies')}
            className="text-accent text-sm hover:underline"
          >
            View All →
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {showFour.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/movies')}
            className="bg-accent hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold"
          >
            Show more
          </button>
        </div>
      </section>

      {/* 🎥 Trailer */}
      <section className="px-6 md:px-20 mb-16">
        <h2 className="text-2xl font-semibold mb-6">Featured Trailer</h2>
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
         <iframe
  className="w-full h-full"
  src="https://www.youtube.com/embed/YH6k5weqwy8"  // ✅ Correct embed URL
  title="Guardians of the Galaxy Trailer"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
        </div>
      </section>

      {/* 🧱 Footer */}
      <Footer />
    </div>
  );
};

export default Home;
