import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row justify-between px-6 md:px-16 lg:px-32 py-16 border-b border-gray-700 gap-12"
      >
        {/* Brand & Description */}
        <div className="w-full md:w-1/3">
          <Image className="w-28 md:w-32" src={assets.logo} alt="E-Shop Logo" />
          <p className="mt-6 text-sm leading-relaxed text-gray-400">
            E-Shop is your trusted online marketplace for everything from gadgets to fashion. Enjoy fast delivery, safe payments, and round-the-clock support.
          </p>
        </div>

        {/* Company Links */}
        <div className="w-full md:w-1/3">
          <h2 className="text-lg font-semibold text-white mb-5">Company</h2>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a className="hover:text-white transition" href="#">Home</a></li>
            <li><a className="hover:text-white transition" href="#">About Us</a></li>
            <li><a className="hover:text-white transition" href="#">Contact Us</a></li>
            <li><a className="hover:text-white transition" href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-1/3">
          <h2 className="text-lg font-semibold text-white mb-5">Get in Touch</h2>
          <div className="space-y-3 text-sm text-gray-400">
            <p>📞 +91-98765-43210</p>
            <p>📧 contact@eshop.dev</p>
          </div>
        </div>
      </motion.div>

      {/* Copyright */}
      <div className="text-center py-6 text-sm text-gray-500">
        © 2025 anuj@dev. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
