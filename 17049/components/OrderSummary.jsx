"use client";

import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrderSummary = () => {
  const {
    currency,
    router,
    getCartCount,
    getCartAmount,
    getToken,
    user,
    cartItems,
    setCartItems,
    placeOrderDemo,
  } = useAppContext();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setUserAddresses([]);
        setSelectedAddress(null);
        return;
      }

      const { data } = await axios.get("/api/user/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success && data.addresses.length > 0) {
        setUserAddresses(data.addresses);
        setSelectedAddress(data.addresses[0]); // default to first address
      } else {
        setUserAddresses([]);
        setSelectedAddress(null);
      }
    } catch (error) {
      console.error("Failed to fetch addresses", error);
      toast.error("Could not fetch addresses");
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  // ...existing code...

  // For demo: create order locally
  const createOrder = () => {
    if (!selectedAddress) return toast.error("Please select an address");
    const cartItemsArray = Object.entries(cartItems)
      .map(([productId, quantity]) => ({ product: productId, quantity }))
      .filter((item) => item.quantity > 0);
    if (cartItemsArray.length === 0) return toast.error("Cart is empty");
    const order = {
      products: cartItemsArray.map(item => ({ product: { id: item.product }, quantity: item.quantity })),
      address: selectedAddress,
      totalAmount: getCartAmount() + Math.floor(getCartAmount() * 0.02),
      date: Date.now(),
      status: "Pending",
    };
    placeOrderDemo(order);
    toast.success("Order Placed Successfully");
    router.push("/order-placed");
  };
  useEffect(() => {
  if (user) {
    fetchUserAddresses();
  }
}, [user, router.asPath]);


  return (
    <div className="w-full md:w-96 bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>

      {/* Address Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Select Address
        </label>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md text-left bg-gray-50 text-sm text-gray-700 hover:border-gray-400 transition"
          >
            {selectedAddress
              ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
              : "Select Address"}
            <svg
              className={`w-5 h-5 float-right transform transition-transform ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <ul className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-200 shadow-lg rounded-md max-h-60 overflow-y-auto text-sm">
              {userAddresses.length > 0 ? (
                userAddresses.map((address, index) => (
                  <li
                    key={index}
                    onClick={() => handleAddressSelect(address)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {address.fullName}, {address.area}, {address.city}, {address.state}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No addresses found</li>
              )}
              <li
                onClick={() => router.push("/add-address")}
                className="text-center text-blue-600 hover:text-blue-800 px-4 py-2 cursor-pointer border-t"
              >
                + Add New Address
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-1">Promo Code</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-grow border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-orange-500 focus:border-orange-500"
          />
          <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition">
            Apply
          </button>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Order Totals */}
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Items ({getCartCount()})</span>
          <span className="text-gray-800 font-medium">{currency}{getCartAmount()}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (2%)</span>
          <span className="font-medium text-gray-800">{currency}{Math.floor(getCartAmount() * 0.02)}</span>
        </div>
        <div className="flex justify-between font-semibold text-base border-t pt-3">
          <span>Total</span>
          <span>{currency}{getCartAmount() + Math.floor(getCartAmount() * 0.02)}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={createOrder}
        className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-3 rounded-md transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
