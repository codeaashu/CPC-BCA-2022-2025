import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import { watchlist as initialWatchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";
import "./WatchList.css";



const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);

  const fetchPrices = async () => {
    try {
      const updated = await Promise.all(
        initialWatchlist.map(async (stock) => {
          try {
            const res = await axios.get(
              `https://api.twelvedata.com/price?symbol=${stock.symbol}&apikey=${API_KEY}`
            );

            const rawPrice = res.data.price;
            const price = parseFloat(rawPrice);

            // If API gives "None" or invalid price, use a fallback value
            const finalPrice = isNaN(price) || !isFinite(price) ? (Math.random() * 1000 + 100).toFixed(2) : price;

            // Dummy % change (since real isn't available from /price endpoint)
            const percent = (Math.random() * 4 - 2).toFixed(2);
            const isDown = parseFloat(percent) < 0;

            return {
              ...stock,
              price: parseFloat(finalPrice),
              percent: `${percent}%`,
              isDown,
            };
          } catch (err) {
            console.error(`❌ Price fetch error for ${stock.name}:`, err.message);
            // fallback stock with random price
            return {
              ...stock,
              price: parseFloat((Math.random() * 1000 + 100).toFixed(2)),
              percent: "0.00%",
              isDown: false,
            };
          }
        })
      );

      setWatchlist(updated);
    } catch (err) {
      console.error("❌ Error fetching prices:", err);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const validStocks = watchlist.filter((stock) => stock.price > 0);

  const chartData = {
    labels: validStocks.map((stock) => stock.name),
    datasets: [
      {
        label: "Price",
        data: validStocks.map((stock) => stock.price),
        backgroundColor: [
          "#00c9a7",
          "#e74c3c",
          "#9b59b6",
          "#3498db",
          "#f1c40f",
          "#2ecc71",
          "#fd79a8",
          "#e67e22",
          "#2c3e50",
          "#16a085",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search" />
        <span className="counts">{watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => (
          <WatchListItem stock={stock} key={index} />
        ))}
      </ul>

      {validStocks.length > 0 ? (
        <div className="chart-container">
          <h4 className="chart-title">📊 Stock Distribution</h4>
          <DoughnutChart data={chartData} />
        </div>
      ) : (
        <p className="no-data">No valid stock data to display.</p>
      )}
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <li
      className="stock-item"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">₹{stock.price}</span>
        </div>
      </div>
      {showActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);
  return (
    <span className="actions">
      <Tooltip title="Buy" placement="top" arrow TransitionComponent={Grow}>
        <button className="btn buy" onClick={() => generalContext.openBuyWindow(uid)}>
          Buy
        </button>
      </Tooltip>
      <Tooltip title="Sell" placement="top" arrow TransitionComponent={Grow}>
        <button className="btn sell">Sell</button>
      </Tooltip>
      <Tooltip title="Analytics" placement="top" arrow TransitionComponent={Grow}>
        <button className="btn analytics">
          <BarChartOutlined />
        </button>
      </Tooltip>
      <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
        <button className="btn more">
          <MoreHoriz />
        </button>
      </Tooltip>
    </span>
  );
};
