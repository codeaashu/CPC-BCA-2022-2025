import React, { useEffect, useState } from "react";
import "./profile.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8000/api/profile/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile.");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setFormData({
          username: data.username || "",
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        setProfile(null);
      });
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/profile/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      if (res.ok) {
        alert("✅ Profile updated!");
        setEditMode(false);
      } else {
        const err = await res.json();
        alert("❌ Failed to update: " + JSON.stringify(err));
      }
    } catch (err) {
      alert("❌ Update request failed.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <h2>👤 Welcome, {formData.username}</h2>

      <div className="profile-form">
        <label>Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={!editMode}
        />

        <label>Email:</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!editMode}
        />

        <label>Phone:</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!editMode}
        />

        {editMode ? (
          <button className="update-btn" onClick={handleUpdate}>
            ✅ Save Changes
          </button>
        ) : (
          <button className="update-btn" onClick={() => setEditMode(true)}>
            ✏️ Edit Profile
          </button>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          🔒 Logout
        </button>
      </div>

      <div className="orders-section">
        <h3>📦 Past Orders</h3>
        {!profile.orders || profile.orders.length === 0 ? (
          <p>No past orders.</p>
        ) : (
          <div className="order-list">
            {profile.orders.map((order, index) => (
              <div key={index} className="order-card">
                {order.items.map((item, i) => (
                  <div key={i} className="order-item-row">
                    <div className="order-image-left">
                      <img
                        src={`http://localhost:8000${item.product.image}`}
                        alt={item.product.name}
                        className="order-image"
                      />
                    </div>
                    <div className="order-details-right">
                      <span className="product-name">{item.product.name}</span>
                      <span>Qty: {item.quantity}</span>
                      <span>Price: ₹{item.product.price}</span>
                      <span>📅 {order.created_at}</span>
                      <span>💳 {order.payment_method}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
