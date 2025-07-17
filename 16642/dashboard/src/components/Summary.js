import React, { useEffect, useState } from "react";
import "./Summary.css";

const Summary = () => {
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

  return (
    <div className="summary-container">
      {/* Welcome */}
      <div className="greeting">
        <h2>Hi, {username} 👋</h2>
        <p>Here’s your account summary</p>
      </div>

      {/* Equity Section */}
      <div className="card equity-card">
        <h4>💼 Equity</h4>
        <div className="equity-content">
          <div className="column">
            <h3>₹3,740</h3>
            <p>Margin available</p>
          </div>
          <div className="divider-v" />
          <div className="column">
            <p>
              Margins used: <strong>₹0</strong>
            </p>
            <p>
              Opening balance: <strong>₹3,740</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Holdings Section */}
      <div className="card holdings-card">
        <h4>📈 Holdings (13)</h4>
        <div className="holdings-content">
          <div className="column">
            <h3 className="profit">
              ₹1,553 <small>(+5.20%)</small>
            </h3>
            <p>Total P&L</p>
          </div>
          <div className="divider-v" />
          <div className="column">
            <p>
              Current Value: <strong>₹31,429</strong>
            </p>
            <p>
              Investment: <strong>₹29,875</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
