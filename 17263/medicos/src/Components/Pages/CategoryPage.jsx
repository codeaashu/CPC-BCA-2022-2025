import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import ProductCard from "../ProductCard";
import "./CategoryPage.css";
import "./themes.css";

const CategoryPage = ({ categoryName, theme }) => {
  const [products, setProducts] = useState([]);

  const title = categoryName.replace(/([A-Z])/g, " $1").trim();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/?category=${categoryName}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [categoryName]);

  return (
    <>
      <Header />
      <div className={`category-page ${theme}`}>
        <h2>{title.toUpperCase()}</h2>
        <p className="category-desc">
          Explore our best {title.toUpperCase()} products.
        </p>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
