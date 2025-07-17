"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Reset link sent! Check your inbox.");
      setSubmitted(true);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Send Reset Link
          </button>
        </form>
      ) : (
        <p className="text-green-600">Reset link sent to your email.</p>
      )}
    </div>
  );
}
