"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SellerSignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.name.trim().length < 2) {
      return setError("Name must be at least 2 characters.");
    }

    if (!isValidEmail(form.email)) {
      return setError("Invalid email format.");
    }

    if (!isValidPassword(form.password)) {
      return setError(
        "Password must be 6+ characters with A-Z, a-z, digit, and special character."
      );
    }

    try {
      const res = await fetch("/api/auth/seller-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // ✅ no role needed, handled in API
      });

      const data = await res.json();
      if (data.success) {
        router.push("/seller"); // ✅ redirect to seller dashboard
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        {/* Left Side */}
        <div className="md:w-1/2 bg-blue-600 text-white p-10 flex flex-col justify-center items-center text-center">
          <motion.h2
            className="text-4xl font-bold mb-4 tracking-widest"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            New User Registration
          </motion.h2>
          <motion.p
            className="text-lg leading-relaxed max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Explore top products, track your orders, and enjoy a seamless shopping experience.
          </motion.p>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 p-8 md:p-12">
          <motion.h1
            className="text-2xl font-semibold mb-6 text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Create User Account
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your full name"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </motion.div>

            {/* Email */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </motion.div>

            {/* Password */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </motion.div>

            {/* Error */}
            {error && (
              <motion.p className="text-red-500 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up 
            </motion.button>
          </form>

          {/* Login link */}
          <motion.div
            className="text-sm text-center text-gray-600 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Already registered as user?{" "}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Login here
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
