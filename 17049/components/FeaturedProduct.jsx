import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

const FeaturedProduct = () => {
  return (
    <section className="mt-20 px-4 md:px-14">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
          Featured Products
        </h2>
        <div className="w-28 h-1 bg-orange-600 mx-auto mt-2 rounded-full" />
      </div>

      {/* Product Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14"
      >
        {products.map(({ id, image, title, description }) => (
          <div
            key={id}
            className="relative overflow-hidden rounded-xl shadow-md group"
          >
            <Image
              src={image}
              alt={title}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300" />

            {/* Product Text */}
            <div className="absolute bottom-8 left-8 z-10 text-white space-y-3 transition-all group-hover:-translate-y-2 duration-300">
              <p className="font-semibold text-xl md:text-2xl">{title}</p>
              <p className="text-sm md:text-base max-w-xs leading-snug text-gray-200">
                {description}
              </p>
              <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 transition px-4 py-2 rounded-full text-sm font-medium">
                Buy Now
                <Image
                  src={assets.redirect_icon}
                  alt="Buy Now"
                  className="w-3 h-3"
                />
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedProduct;

