import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-[#1e1e2f] to-[#2a2a3d] text-white rounded-2xl overflow-hidden my-16 px-6 md:px-16 py-10 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10"
    >
      {/* Left Image */}
      <Image
        className="w-40 md:w-56"
        src={assets.jbl_soundbox_image}
        alt="JBL Soundbox"
      />

      {/* Center Content */}
      <div className="flex-1 text-center md:text-left space-y-5">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Level Up Your Gaming Experience
        </h2>
        <p className="text-gray-300 max-w-md mx-auto md:mx-0 text-base">
          From immersive sound to precise controls—everything you need to dominate your game.
        </p>
        <button className="group inline-flex items-center gap-2 px-8 py-3 bg-orange-600 hover:bg-orange-700 transition-all rounded-full font-medium">
          Buy Now
          <Image
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            src={assets.arrow_icon_white}
            alt="Arrow Icon"
          />
        </button>
      </div>

      {/* Right Image */}
      <div className="hidden md:block">
        <Image
          className="w-64"
          src={assets.md_controller_image}
          alt="Controller"
        />
      </div>
      <div className="md:hidden">
        <Image
          className="w-48"
          src={assets.sm_controller_image}
          alt="Controller"
        />
      </div>
    </motion.section>
  );
};

export default Banner;
