import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import "./header.css";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setShowSearch(false);
    }
  };

  const handleUserClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile"); // If logged in
    } else {
      navigate("/auth"); // If not logged in
    }
  };

  return (
    <header>
      <Link to="/" className="logo">
        Σ𝗘𝗗𝗜𝗖𝗢𝗦|<sub className="logo-sub">your online medical store</sub>
      </Link>

      <ul className="navbar">
        <li>
          <Link to="/medicine">MEDICINE</Link>
        </li>
        <li>
          <Link to="/babycare">BABYCARE</Link>
        </li>
        <li>
          <Link to="/skincare">SKINCARE</Link>
        </li>
        <li>
          <Link to="/haircare">HAIRCARE</Link>
        </li>
        <li>
          <Link to="/ayurveda">AYURVEDA</Link>
        </li>
        <li>
          <Link to="/vitamins">VITAMINS</Link>
        </li>
      </ul>

      <div className="icons">
        {/*  Search Icon */}
        <a href="#" onClick={toggleSearch}>
          <i className="bx bx-search"></i>
        </a>

        {/*  Cart */}
        <Link to="/cart" id="cart-icon">
          <i className="bx bxs-cart"></i>
          <span id="cart-count">{cartItems.length}</span>
        </Link>

        {/*  User */}
        <a href="#" id="user-icon" onClick={handleUserClick}>
          <i className="bx bxs-user-circle"></i>
        </a>
      </div>

      {/*  Search Form */}
      {showSearch && (
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
        </form>
      )}
    </header>
  );
};

export default Header;
