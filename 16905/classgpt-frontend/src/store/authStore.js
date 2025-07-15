import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import {
  auth,
  googleProvider,
  facebookProvider,
  signUp,
  logIn,
  logOut,
} from '../utils/firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';

// ✅ CRA-compatible backend env variable
const API = process.env.REACT_APP_BACKEND_URL;

// ✅ Save Firebase user to MongoDB
const saveUserToMongo = async (user, provider) => {
  try {
    await fetch(`${API}/api/user/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        firebaseUID: user.uid,
        provider,
      }),
    });
  } catch (err) {
    console.error('❌ Mongo save failed:', err);
  }
};

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthModalOpen: false,
  isLoading: false,

  // Toggle modal
  toggleModal: () => set((s) => ({ isAuthModalOpen: !s.isAuthModalOpen })),

  // Firebase login
  loginWithEmail: async (email, password) => {
    try {
      set({ isLoading: true });
      const result = await logIn(email, password);
      await saveUserToMongo(result.user, 'email');
      set({ user: result.user, isAuthModalOpen: false });
      toast.success('✅ Logged in!');
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      set({ isLoading: false });
    }
  },

  // Firebase signup
  signupWithEmail: async (email, password) => {
    try {
      set({ isLoading: true });
      const result = await signUp(email, password);
      await saveUserToMongo(result.user, 'email');
      set({ user: result.user, isAuthModalOpen: false });
      toast.success('✅ Account created!');
    } catch (err) {
      toast.error(err.message || 'Signup failed');
    } finally {
      set({ isLoading: false });
    }
  },

  // Google login
  loginWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserToMongo(result.user, 'google');
      set({ user: result.user, isAuthModalOpen: false });
      toast.success('✅ Google login successful!');
    } catch (err) {
      toast.error(err.message || 'Google login failed');
    }
  },

  // Facebook login
  loginWithFacebook: async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      await saveUserToMongo(result.user, 'facebook');
      set({ user: result.user, isAuthModalOpen: false });
      toast.success('✅ Facebook login successful!');
    } catch (err) {
      toast.error(err.message || 'Facebook login failed');
    }
  },

  // JWT signup
  jwtSignup: async (email, password, confirmPassword) => {
    try {
      set({ isLoading: true });
      const res = await fetch(`${API}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'JWT Signup failed');

      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, isAuthModalOpen: false });
      toast.success('✅ JWT Signup successful!');
    } catch (err) {
      toast.error(err.message || 'Signup failed');
    } finally {
      set({ isLoading: false });
    }
  },

  // JWT login
  jwtLogin: async (email, password) => {
    try {
      set({ isLoading: true });
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'JWT Login failed');

      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, isAuthModalOpen: false });
      toast.success('✅ JWT Login successful!');
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      set({ isLoading: false });
    }
  },

  // Logout (Firebase + JWT)
  logout: async () => {
    try {
      await logOut();
    } catch (_) {}
    localStorage.removeItem('token');
    set({ user: null, token: null });
    toast.success('👋 Logged out!');
  },

  // On app start: check Firebase user
  initAuth: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user });
      }
    });
  },
}));
