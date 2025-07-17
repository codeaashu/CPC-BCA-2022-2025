import React from "react";
import "./ProductCard.css";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="product-card">
      {product.discount && (
        <span className="badge discount">{product.discount}</span>
      )}
      {product.tag && <span className="badge tag">{product.tag}</span>}

      <img
        src={`http://localhost:8000${product.image}`}
        alt={product.name}
        className="product-image"
      />

      <h4 className="product-category">{product.category}</h4>

      {product.emoji && <div className="emoji">{product.emoji}</div>}

      <h3 className="product-name">{product.name}</h3>

      <p className="description">{product.description}</p>

      <p className="rating">⭐ {product.rating || 0}</p>

      <p className="price">
        ₹{product.price}
        {product.originalPrice && (
          <span className="original-price">₹{product.originalPrice}</span>
        )}
      </p>

      <div className="btn-group" style={{ display: "flex" }}>
        <button className="btn add-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="btn buy-now" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
