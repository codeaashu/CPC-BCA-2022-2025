import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Funds.css';


const Funds = () => {
  const [payments, setPayments] = useState([]);

  // 🔄 Fetch all payment history
  const fetchPayments = () => {
    axios
      .get("http://localhost:3002/all-payments")
      .then((res) => setPayments(res.data))
      .catch((err) => console.error("Error fetching payments:", err));
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // 🪙 Add Funds - Razorpay logic
  const handleAddFunds = async () => {
    try {
      const amountInRupees = 100; // ✅ You can replace this with dynamic input
      const amount = amountInRupees * 100;

      // Create Razorpay order
      const res = await axios.post("http://localhost:3002/create-order", {
        amount,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`
      });

      const { id: order_id, currency } = res.data;

      // Open Razorpay
      const options = {
        key: "rzp_test_XpbaG8PQRI9OmX", // ✅ Use env var in production
        amount,
        currency,
        name: "NIVESHPRO",
        description: "Add Funds to Account",
        order_id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post("http://localhost:3002/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: amountInRupees
            });

            if (verifyRes.data.verified) {
              alert("✅ Payment Successful!");
              fetchPayments(); // Refresh list
            } else {
              alert("❌ Payment Failed!");
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("❌ Payment verification error!");
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
          contact: "9000000000"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error initiating payment:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <button className="btn btn-green" onClick={handleAddFunds}>
          Add Funds
        </button>
        <Link className="btn btn-blue">Withdraw</Link>
      </div>

      {/* 💳 Payment History */}
      {payments.length > 0 && (
        <div className="payment-history" style={{ margin: "20px" }}>
          <h4>📋 Payment History</h4>
          {payments.map((payment, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px"
              }}
            >
              <p>
                <strong>Amount:</strong> ₹{payment.amount}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {payment.verified ? "✅ Verified" : "❌ Unverified"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(payment.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Payment ID:</strong> {payment.razorpay_payment_id}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Funds;
