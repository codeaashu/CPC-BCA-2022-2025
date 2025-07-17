"use client";

import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

const Product = () => {
  const { id } = useParams();
  const { products, router, addToCart, userData } = useAppContext();

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    if (!id || products.length === 0) return;

    const product = products.find((p) => p._id.toString() === id.toString());
    if (product) {
      setProductData(product);
      setMainImage(product.image?.[0] || null);
    }
  }, [id, products]);

  if (!productData) return <Loading />;

  const featured = products
    .filter((p) => p._id.toString() !== id.toString())
    .slice(0, 5);

  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={productData.name}
                  className="w-full h-auto object-cover mix-blend-multiply"
                  width={1280}
                  height={720}
                />
              ) : (
                <div className="w-full h-64 bg-gray-100" />
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {(productData.image || []).map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i}`}
                    className="w-full h-auto object-cover mix-blend-multiply"
                    width={1280}
                    height={720}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
              {productData.name}
            </h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <Image key={i} className="h-4 w-4" src={assets.star_icon} alt="star" />
                ))}
                <Image className="h-4 w-4" src={assets.star_dull_icon} alt="star-dull" />
              </div>
              <p>(4.5)</p>
            </div>

            <p className="text-gray-600 mt-3">{productData.description}</p>

            <p className="text-3xl font-medium mt-6">
              ${productData.offerPrice}
              <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                ${productData.price}
              </span>
            </p>

            <hr className="bg-gray-600 my-6" />

            <table className="table-auto border-collapse w-full max-w-72">
              <tbody>
                <tr>
                  <td className="text-gray-600 font-medium">Brand</td>
                  <td className="text-gray-800/50">Generic</td>
                </tr>
                <tr>
                  <td className="text-gray-600 font-medium">Color</td>
                  <td className="text-gray-800/50">Multi</td>
                </tr>
                <tr>
                  <td className="text-gray-600 font-medium">Category</td>
                  <td className="text-gray-800/50">{productData.category}</td>
                </tr>
              </tbody>
            </table>

            {/* Cart Buttons */}
            <div className="flex items-center mt-10 gap-4">
              <button
                onClick={() => addToCart(productData._id)}
                className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  addToCart(productData._id);
                  router.push(userData ? "/cart" : "/login");
                }}
                className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Featured <span className="text-orange-600">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {featured.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
            See more
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Product;
