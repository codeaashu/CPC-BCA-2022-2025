import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import "./Topbar.css";

const TopBar = () => {
  const [nifty, setNifty] = useState(100.2);
  const [sensex, setSensex] = useState(100.2);

  // Optionally: Fetch live NIFTY/SENSEX data from an API here

  return (
    <div className="topbar">
      <div className="indices">
        <IndexCard name="NIFTY 50" value={nifty} />
        <IndexCard name="SENSEX" value={sensex} />
      </div>
      <Menu />
    </div>
  );
};

const IndexCard = ({ name, value }) => {
  const isDown = value < 0;

  return (
    <div className={`index-card ${isDown ? "down" : "up"}`}>
      <p className="index-name">{name}</p>
      <p className="index-value">{Math.abs(value).toFixed(2)}</p>
      <p className="index-status">{isDown ? "▼" : "▲"}</p>
    </div>
  );
};

export default TopBar;
