// src/components/Layout.jsx
import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Navbar />
      <Outlet />
      {isHome && <Footer />}
    </>
  );
};

export default Layout;
