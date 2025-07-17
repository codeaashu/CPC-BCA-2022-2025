import React from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { currency, router } = useAppContext();

  const productImage =
    product?.image?.[0] && typeof product.image[0] === "string"
      ? product.image[0]
      : assets.fallback_image || "https://via.placeholder.com/150";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 200 }}
      onClick={() => {
        router.push('/product/' + product._id);
        scrollTo(0, 0);
      }}
      className="bg-white shadow-md hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300 cursor-pointer max-w-[220px] w-full"
    >
      {/* Product Image */}
      <div className="relative bg-gray-100 h-52 flex items-center justify-center group overflow-hidden">
        <Image
          src={productImage}
          alt={product.name || "Product image"}
          width={800}
          height={800}
          className="object-contain w-4/5 h-4/5 group-hover:scale-105 transition-transform duration-300"
        />

        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:scale-110 transition"
        >
          <Image
            src={assets.heart_icon}
            alt="Wishlist"
            className="w-4 h-4"
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-3 space-y-1">
        <p className="text-base font-semibold text-gray-800 truncate">
          {product.name}
        </p>
        <p className="text-xs text-gray-500 truncate max-sm:hidden">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <p className="text-xs text-orange-600 font-medium">4.5</p>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                src={index < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="star"
                className="w-3 h-3"
              />
            ))}
          </div>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-semibold text-gray-900">
            {currency}{product.offerPrice}
          </p>
          <button
            onClick={(e) => e.stopPropagation()}
            className="hidden sm:inline-block px-4 py-1 text-xs rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
