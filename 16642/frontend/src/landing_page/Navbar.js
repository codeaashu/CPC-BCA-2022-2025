import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
      style={{
        backgroundColor: "#FFF",
        height: "100px",               // Set fixed navbar height
        alignItems: "center",         // Vertically center contents
      }}
    >
      <div className="container h-100 d-flex align-items-center justify-content-between">
        <Link className="navbar-brand" to="/">
          <img
            src="/media/images/logo.svg"
            alt="Logo"
            style={{
              maxHeight: "10rem",       // Make logo fill navbar height
              height: "100%",          // Responsive to nav height
              width: "auto",           // Maintain aspect ratio
              display: "block",
              objectFit: "contain",
            }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-lg-0 align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link active" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/product">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/support">
                Support
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link text-primary fw-semibold">
                    Welcome, {username}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
