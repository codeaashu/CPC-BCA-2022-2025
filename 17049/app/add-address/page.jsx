"use client";

import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { assets } from "@/assets/assets";

const AddAddress = () => {
  const { getToken, router } = useAppContext();

  const [address, setAddress] = useState({
    fullName: '',
    phoneNumber: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const token = await getToken();
      if (!token) return toast.error("User not logged in.");

      // ✅ Decode JWT to get userId
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.userId;

      const { data } = await axios.post(
        "/api/user/add-address",
        { ...address, user: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        router.push("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Add address error:", error);
      toast.error(error?.response?.data?.message || "Failed to save address");
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
        <form onSubmit={onSubmitHandler} className="w-full">
          <p className="text-2xl md:text-3xl text-gray-500">
            Add Shipping <span className="font-semibold text-orange-600">Address</span>
          </p>
          <div className="space-y-3 max-w-sm mt-10">
            <input
              className="input"
              type="text"
              placeholder="Full name"
              value={address.fullName}
              onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
              required
            />
            <input
              className="input"
              type="text"
              placeholder="Phone number"
              value={address.phoneNumber}
              onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
              required
            />
            <input
              className="input"
              type="text"
              placeholder="Pin code"
              value={address.zipCode}
              onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
              required
            />
            <textarea
              className="input resize-none"
              rows={4}
              placeholder="Street (Area, Locality, etc.)"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              required
            ></textarea>
            <div className="flex space-x-3">
              <input
                className="input"
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                required
              />
              <input
                className="input"
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                required
              />
            </div>
            <input
              className="input"
              type="text"
              placeholder="Country"
              value={address.country}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="max-w-sm w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase"
          >
            Save address
          </button>
        </form>

        <Image
          className="md:mr-16 mt-16 md:mt-0"
          src={assets.my_location_image}
          alt="location"
        />
      </div>
      <Footer />

      <style jsx>{`
        .input {
          padding: 0.65rem 0.75rem;
          border: 1px solid #ccc;
          border-radius: 0.375rem;
          width: 100%;
          color: #4b5563;
          outline: none;
          transition: border 0.2s;
        }
        .input:focus {
          border-color: #fb923c;
        }
      `}</style>
    </>
  );
};

export default AddAddress;
