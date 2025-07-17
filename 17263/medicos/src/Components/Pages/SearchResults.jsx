import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import ProductCard from "../ProductCard";
import "../ProductCard.css";

const SearchResults = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:8000/api/products/?search=${query}`)
        .then((res) => {
          console.log("🔍 Search Results:", res.data);
          setProducts(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [query]);

  return (
    <>
      <Header />
      <div className="category-page">
        <h2>Search Results for: “{query}”</h2>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
              No products found.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
