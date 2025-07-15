// src/components/AuthModal.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

const AuthModal = () => {
  const isOpen = useAuthStore((state) => state.isAuthModalOpen);
  const toggleModal = useAuthStore((state) => state.toggleModal);
  const loginWithEmail = useAuthStore((state) => state.loginWithEmail);
  const signupWithEmail = useAuthStore((state) => state.signupWithEmail);
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
  const loginWithFacebook = useAuthStore((state) => state.loginWithFacebook);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || isLoading) return;

    if (isLogin) {
      await loginWithEmail(email, password);
    } else {
      await signupWithEmail(email, password);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            className="bg-[#1a182d] text-white p-6 rounded-xl w-full max-w-md relative"
          >
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-4 text-purple-400 text-center">
              {isLogin ? 'Login' : 'Create Account'}
            </h2>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded bg-[#2a2740] border border-purple-500"
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-[#2a2740] border border-purple-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold"
              >
                {isLoading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-400">or continue with</p>

              <div className="flex gap-3 justify-center mt-2">
                <button
                  onClick={loginWithGoogle}
                  className="bg-white text-black px-5 py-2 rounded hover:scale-105 transition text-sm font-semibold"
                >
                  🔍 Google
                </button>
                <button
                  onClick={loginWithFacebook}
                  className="bg-blue-600 text-white px-5 py-2 rounded hover:scale-105 transition text-sm font-semibold"
                >
                  📘 Facebook
                </button>
              </div>
            </div>

            {/* Toggle Login/Signup */}
            <p className="mt-6 text-sm text-center text-gray-400">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-400 underline"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
