import React from "react";
import { useNavigate } from "react-router-dom";

function Awards() {
  const navigate = useNavigate();

  const handleLogoutAndSignup = () => {
    // Clear user session (adjust keys as needed)
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Redirect to /signup
    navigate("/signup");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5">
          <img src="media/images/largestBroker.svg" alt="Largest Broker" />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>Largest stock broker in India</h1>
          <p className="mb-5">
            2+ million Niveshpro clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>
          <div className="row">
            <div className="col-6">
              <ul>
                <li>
                  <p>Futures and Options</p>
                </li>
                <li>
                  <p>Commodity derivatives</p>
                </li>
                <li>
                  <p>Currency derivatives</p>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>
                  <p>Stocks & IPOs</p>
                </li>
                <li>
                  <p>Direct mutual funds</p>
                </li>
                <li>
                  <p>Bonds and Govt. Securities</p>
                </li>
              </ul>
            </div>
          </div>

          <img src="media/images/pressLogos.png" alt="Press Logos" style={{ width: "90%" }} />

          <button
            className="p-2 btn btn-primary fs-5 mt-4"
            style={{ width: "40%", display: "block" }}
            onClick={handleLogoutAndSignup}
          >
            Signup Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Awards;
