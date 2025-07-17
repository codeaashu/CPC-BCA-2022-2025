import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [username, setUsername] = useState("");

  const menuItems = [
    { label: "Dashboard", path: "/" },
    { label: "Orders", path: "/orders" },
    { label: "Holdings", path: "/holdings" },
    { label: "Positions", path: "/positions" },
    { label: "Funds", path: "/funds" },
    { label: "Apps", path: "/apps" },
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userFromUrl = params.get("username");

    if (userFromUrl) {
      localStorage.setItem("username", userFromUrl);
      setUsername(userFromUrl);
      window.history.replaceState({}, document.title, "/");
    } else {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername && storedUsername !== "null") {
        setUsername(storedUsername);
      }
    }

    const active = menuItems.findIndex(item => item.path === location.pathname);
    setSelectedMenu(active !== -1 ? active : 0);
  }, [location.pathname]);

  const handleClick = (index, path) => {
    setSelectedMenu(index);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="menu-container">
      <div className="logo-area">
        <img src="logo.png" alt="logo" className="logo-img" />
      </div>

      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li
            key={item.path}
            onClick={() => handleClick(index, item.path)}
            className={selectedMenu === index ? "menu selected" : "menu"}
          >
            {item.label}
          </li>
        ))}
      </ul>

      <div className="user-profile">
        <div className="avatar">{username ? username[0].toUpperCase() : "U"}</div>
        <p className="username">{username || "User"}</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Menu;
