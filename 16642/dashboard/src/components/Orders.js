import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Orders.css"; // ✅ Use improved CSS here

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/orders")
      .then((res) => setOrders(res.data))
      .catch((err) =>
        console.error("Failed to fetch orders:", err)
      );
  }, []);

  return (
    <div className="orders-page">
      <h3 className="title">Orders ({orders.length})</h3>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today.</p>
          <Link to="/" className="btn btn-primary">Get Started</Link>
        </div>
      ) : (
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td data-label="Stock">{order.name}</td>
                  <td data-label="Qty">{order.qty}</td>
                  <td data-label="Price">₹{order.price.toFixed(2)}</td>
                  <td data-label="Mode" className={order.mode === "BUY" ? "buy" : "sell"}>
                    {order.mode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
