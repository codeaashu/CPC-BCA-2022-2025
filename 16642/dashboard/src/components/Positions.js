import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Positions.css"; // ⬅️ Make sure this file includes the new CSS

const Positions = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allPositions")
      .then((response) => setPositions(response.data))
      .catch((error) =>
        console.error("Error fetching positions:", error)
      );
  }, []);

  return (
    <div className="positions-page">
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="table-container">
        <table className="positions-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td data-label="Product">{stock.product}</td>
                  <td data-label="Instrument">{stock.name}</td>
                  <td data-label="Qty">{stock.qty}</td>
                  <td data-label="Avg">{stock.avg.toFixed(2)}</td>
                  <td data-label="LTP">{stock.price.toFixed(2)}</td>
                  <td data-label="P&L" className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td data-label="Chg." className={dayClass}>
                    {stock.day}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Positions;
