"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value.trimStart() });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(form.email)) {
      return setError("Please enter a valid email address.");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (!data.success) {
        return setError(data.message || "Invalid email or password.");
      }

      const token = data.token;
      login(token); // save to AuthContext

      // ✅ Decode token to get role
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload?.role || "buyer";

      // ✅ Redirect based on role
      router.push(role === "seller" ? "/seller" : "/");
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        {/* LEFT PANEL */}
        <div className="md:w-1/2 bg-green-600 text-white p-10 flex flex-col justify-center items-center text-center">
          <motion.h2
            className="text-4xl font-bold mb-4 tracking-widest"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            E-SHOP
          </motion.h2>
          <motion.p
            className="text-lg leading-relaxed max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Your trusted online store for electronics, fashion, and more.
          </motion.p>
        
        </div>

        {/* RIGHT PANEL - LOGIN FORM */}
        <div className="md:w-1/2 p-8 md:p-12">
          <motion.h1
            className="text-2xl font-semibold mb-6 text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Login to Your Account
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </motion.div>

            {/* PASSWORD */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {/* ERROR */}
            {error && (
              <motion.p
                className="text-red-500 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}

            {/* SUBMIT */}
            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-green-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
              } text-white font-semibold py-2 rounded-lg transition`}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          {/* SIGNUP LINK */}
          <motion.div
            className="text-sm text-center text-gray-600 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Don&apos;t have an user account?{" "}
            <Link
              href="/signup"
              className="text-green-600 hover:underline font-medium"
            >
              Sign Up as User
            </Link>
            <br/>
            <Link
              href="/seller-signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Register here as Seller
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
