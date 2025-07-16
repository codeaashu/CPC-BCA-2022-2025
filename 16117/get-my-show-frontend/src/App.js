import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import TheatrePage from './pages/TheatrePage';
import SeatBooking from './pages/SeatBooking';
import ConfirmBooking from './pages/ConfirmBooking';
import NotFound from './pages/NotFound';

import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/theatre" element={<TheatrePage />} /> {/* ✅ NEW */}
          <Route path="/theatre/:movieId" element={<TheatrePage />} />
          <Route path="/book/:showId" element={<SeatBooking />} />
          <Route path="/confirm" element={<ConfirmBooking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
