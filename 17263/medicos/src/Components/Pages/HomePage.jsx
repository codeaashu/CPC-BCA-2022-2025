import React from "react";
import AIBox from "../AIBOX";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Footer from "../Footer";

const categories = [
  {
    name: "Medicines",
    description: "Prescription & OTC drugs",
    products: "5,000+ products",
    color: "rgba(206, 229, 30, 0.62)",
    emoji: "💊",
    route: "/products/medicines",
  },
  {
    name: "Baby Care",
    description: "Products for little ones",
    products: "1,500+ products",
    color: "#26c6da",
    emoji: "👶",
    route: "/products/babycare",
  },
  {
    name: "Skin Care",
    description: "Beauty & dermatology",
    products: "2,000+ products",
    color: "rgb(231, 220, 148)",
    emoji: "🧴",
    route: "/products/skincare",
  },
  {
    name: "Hair Care",
    description: "Shampoos & treatments",
    products: "800+ products",
    color: "rgba(54, 41, 4, 0.52)",
    emoji: "💇‍♀️",
    route: "/products/haircare",
  },
  {
    name: "Ayurveda",
    description: "Herbal & natural remedies",
    products: "1,000+ products",
    color: "rgba(102, 187, 106, 0.78)",
    emoji: "🌿",
    route: "/products/ayurveda",
  },
  {
    name: "Vitamins",
    description: "Vitamins, minerals & more",
    products: "12,000+ products",
    color: "rgba(181, 33, 25, 0.6)",
    emoji: "🟡",
    route: "/products/vitamins",
  },
];

const featured = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    emoji: "💊",
    rating: "4.8 (234)",
    discount: "25% OFF",
    price: "18.74",
    originalPrice: "Rs.24.99",
  },
  {
    id: 2,
    name: "Vitamin D3 Supplement",
    category: "Vitamins",
    emoji: "🟡",
    rating: "4.9 (156)",
    discount: "",
    price: "11.99",
  },
  {
    id: 3,
    name: "Cetaphil Gentle Cleanser",
    category: "Skin Care",
    emoji: "🧴",
    rating: "4.7 (89)",
    discount: "24% OFF",
    price: "7.99",
  },
  {
    id: 4,
    name: "Baby Moisturizing Lotion",
    category: "Baby Care",
    emoji: "🍼",
    rating: "4.9 (67)",
    discount: "",
    price: "22.99",
    originalPrice: "28.99",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <Header />
      <AIBox />

      <h2 className="section-title">🛒 Shop by Category</h2>
      <p className="section-subtitle">
        Find the right products for your health and wellness needs
      </p>

      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="category-card"
            style={{ backgroundColor: cat.color }}
            onClick={() => navigate(cat.route)}
          >
            <h3>
              {cat.emoji} {cat.name}
            </h3>
            <p>{cat.description}</p>
            <div className="card-footer">
              <span>{cat.products}</span>
              <button>Shop Now</button>
            </div>
          </div>
        ))}
      </div>

      <section className="featured-section">
        <h2 className="section-title">🌟 Featured Products</h2>
        <p className="section-subtitle">
          Top-rated medicines and health products recommended by our AI
          assistant
        </p>

        <div className="featured-grid">
          {featured.map((item) => (
            <div key={item.id} className="featured-card">
              {item.discount && (
                <span className="discount">{item.discount}</span>
              )}
              <p className="category-label">{item.category}</p>
              <h3>{item.name}</h3>
              <p>⭐ {item.rating}</p>
              <p className="price">
                <span className="current-price">Rs.{item.price}</span>
                {item.originalPrice && (
                  <span className="original-price">
                    Rs.{item.originalPrice}
                  </span>
                )}
              </p>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          ))}
        </div>

        <div className="view-all-wrapper">
          <button
            className="view-all-btn"
            onClick={() => navigate("/products")}
          >
            View All Products
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
