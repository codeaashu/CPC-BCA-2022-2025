import React, { useState } from "react";
import { useCart } from "../../Context/CartContext";
import Header from "../Header";
import Footer from "../Footer";
import "./checkout.css";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showCardPopup, setShowCardPopup] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    cvv: "",
    expiry: "",
  });

  const total = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price);
    return acc + (isNaN(price) ? 0 : price);
  }, 0);

  const saveOrderToBackend = async () => {
    if (!fullName || !email || !phone || !address) {
      alert("Please fill all details (name, email, phone, address).");
      return;
    }

    const orderData = {
      full_name: fullName,
      email,
      phone,
      address,
      payment_method: paymentMethod,
      total_price: total.toFixed(2),
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity || 1,
      })),
    };

    try {
      const res = await fetch("http://localhost:8000/api/order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        alert("✅ Order placed successfully!");
        setShowCardPopup(false);
        setCardDetails({ number: "", cvv: "", expiry: "" });
        clearCart();
        setFullName("");
        setEmail("");
        setPhone("");
        setAddress("");
      } else {
        const error = await res.json();
        alert("❌ Error saving order: " + JSON.stringify(error));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to connect to server.");
    }
  };

  const handleConfirmOrder = () => {
    if (!address || !fullName || !email || !phone) {
      alert("Please fill all required fields.");
      return;
    }

    if (paymentMethod === "card") {
      setShowCardPopup(true);
    } else if (paymentMethod === "upi") {
      const confirmed = window.confirm(
        "🧾 Please scan the QR and click OK after payment."
      );
      if (confirmed) {
        saveOrderToBackend();
      }
    } else {
      saveOrderToBackend();
    }
  };

  const handleCardSubmit = () => {
    const { number, cvv, expiry } = cardDetails;

    if (
      number.length !== 16 ||
      !/^\d+$/.test(number) ||
      cvv.length !== 3 ||
      !/^\d+$/.test(cvv) ||
      !/^\d{2}\/\d{2}$/.test(expiry)
    ) {
      alert("Please enter valid card details.");
      return;
    }

    saveOrderToBackend();
  };

  return (
    <>
      <Header />
      <div className="checkout-page">
        <h2>Checkout</h2>

        <div className="checkout-container">
          <div className="left">
            <h3>Full Name</h3>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <h3>Email</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h3>Phone Number</h3>
            <input
              type="tel"
              placeholder="Enter your 10-digit mobile number"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <h3>Billing Address</h3>
            <textarea
              rows="4"
              placeholder="Enter your full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>

            <h3>Payment Method</h3>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery (COD)
              </label>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                UPI / QR Code
              </label>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit / Debit Card
              </label>
            </div>
          </div>

          <div className="right">
            <h3>Order Summary</h3>
            {cartItems.map((item, index) => (
              <div key={index} className="summary-item">
                <span>{item.name}</span>
                <span>₹{parseFloat(item.price).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div className="summary-total">
              <strong>Total:</strong>
              <strong>₹{total.toFixed(2)}</strong>
            </div>
            <div className="button-container">
              <button className="confirm-btn" onClick={handleConfirmOrder}>
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCardPopup && paymentMethod === "card" && (
        <div className="modal-overlay">
          <div className="card-popup">
            <h3>Enter Card Details</h3>
            <input
              type="text"
              placeholder="Card Number (16 digits)"
              maxLength="16"
              value={cardDetails.number}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, number: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="CVV (3 digits)"
              maxLength="3"
              value={cardDetails.cvv}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cvv: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="MM/YY"
              maxLength="5"
              value={cardDetails.expiry}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, expiry: e.target.value })
              }
            />
            <div className="card-popup-buttons">
              <button onClick={handleCardSubmit}>
                Pay ₹{total.toFixed(2)}
              </button>
              <button onClick={() => setShowCardPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CheckoutPage;
