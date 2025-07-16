import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import SignUp from './components/SignUp/SignUp';
import ContactPage from './pages/ContactPage/ContactPage';
import CheckoutPage from './pages/Checkout/Checkout';
import AboutPage from './pages/AboutPage/AboutPage';
import Menu from './pages/Menu/Menu';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import MyOrders from './pages/MyOredrs/MyOrders';
import VerifyPaymentPage from './pages/VerifyPaymentPage/VerifyPaymentPage';

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Home />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/menu" element={<Menu />} />

      {/* Payment verification */}
      <Route path="/myorder/verify" element={<VerifyPaymentPage />} />

      {/* Protected */}
      <Route
        path="/cart"
        element={<PrivateRoute><Cart /></PrivateRoute>}
      />
      <Route
        path="/checkout"
        element={<PrivateRoute><CheckoutPage /></PrivateRoute>}
      />

      {/* The actual orders list */}
      <Route
        path="/myorder"
        element={<PrivateRoute><MyOrders /></PrivateRoute>}
      />
    </Routes>
  );
}

export default App;
