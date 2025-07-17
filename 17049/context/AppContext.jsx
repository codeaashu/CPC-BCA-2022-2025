"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const router = useRouter();
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "₹";
  const { token, isLoggedIn } = useAuth();

  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]); // Store orders for demo

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  const fetchProductData = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) setProducts(data.products);
      else toast.error(data.message || "Could not load products.");
    } catch (err) {
      console.error("Product fetch error:", err);
      toast.error("Error fetching products");
    }
  }, []);

  const fetchUserData = useCallback(async () => {
    if (!token) return;

    try {
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
        setIsSeller(data.user.role === "seller");
        setCartItems(data.user.cartItems || {});
      } else {
        toast.error(data.message || "User fetch failed");
      }
    } catch (err) {
      console.error("User fetch error:", err);
      toast.error("Invalid or expired token");
    }
  }, [token]);

  // For demo: add to cart locally
  const addToCart = async (itemId) => {
    if (!isLoggedIn) {
      toast("Please login first", { icon: "⚠️" });
      return;
    }
    const updatedCart = {
      ...cartItems,
      [itemId]: (cartItems[itemId] || 0) + 1,
    };
    setCartItems(updatedCart);
    toast.success("Added to cart");
  };

  const updateCartQuantity = async (itemId, quantity) => {
    const updated = { ...cartItems };
    if (quantity <= 0) delete updated[itemId];
    else updated[itemId] = quantity;

    setCartItems(updated);

    try {
      await axios.post(
        "/api/cart/update",
        { cartData: updated },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Cart updated");
    } catch (err) {
      toast.error("Error updating cart");
    }
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

  const getCartAmount = () =>
    Math.floor(
      Object.entries(cartItems).reduce((total, [id, qty]) => {
        const product = products.find((p) => p._id === id);
        return total + (product?.offerPrice || 0) * qty;
      }, 0) * 100
    ) / 100;

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  useEffect(() => {
    if (token && isLoggedIn) fetchUserData();
  }, [token, isLoggedIn, fetchUserData]);

  // For demo: place order locally
  const placeOrderDemo = (order) => {
    setOrders((prev) => [...prev, order]);
    setCartItems({});
  };

  // For demo: get orders for current user
  const getOrdersDemo = () => orders;

  return (
    <AppContext.Provider
      value={{
        currency,
        router,
        token,
        isLoggedIn,
        user: userData,
        userData,
        isSeller,
        setIsSeller,
        products,
        fetchProductData,
        fetchUserData,
        cartItems,
        setCartItems,
        addToCart,
        updateCartQuantity,
        getCartCount,
        getCartAmount,
        getToken,
        placeOrderDemo,
        getOrdersDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
