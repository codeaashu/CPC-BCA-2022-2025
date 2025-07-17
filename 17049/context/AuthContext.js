"use client";

import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Load token from localStorage on mount
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      if (savedToken) setToken(savedToken);
    }
  }, []);

  const login = (jwt) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", jwt);
      setToken(jwt);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  // ✅ Utility: safely get token
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  // ✅ Optional: decode token to extract user info
  const getUserInfoFromToken = () => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload; // { userId, email, role, ... }
    } catch (e) {
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        getToken,
        getUserInfoFromToken,
        isLoggedIn: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
