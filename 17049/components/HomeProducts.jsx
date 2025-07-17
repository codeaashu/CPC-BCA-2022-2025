import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const { products, router } = useAppContext();

  return (
    <section className="flex flex-col items-center px-4 md:px-10 lg:px-20 pt-16">
      <div className="flex justify-between items-end w-full max-w-7xl">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Popular Products</h2>
          <p className="text-sm text-gray-500 mt-1">Handpicked just for you</p>
        </div>
        <button
          onClick={() => router.push("/all-products")}
          className="hidden md:inline-block px-6 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-full hover:bg-gray-50 transition"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 mt-10 w-full max-w-7xl">
        {products.slice(0, 10).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      <button
        onClick={() => router.push("/all-products")}
        className="md:hidden mt-10 px-8 py-3 text-sm font-medium text-gray-600 border border-gray-300 rounded-full hover:bg-gray-50 transition"
      >
        See More Products
      </button>
    </section>
  );
};

export default HomeProducts;
