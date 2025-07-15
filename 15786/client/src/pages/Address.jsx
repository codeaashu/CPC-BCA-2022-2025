import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Address = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const { axios, user, navigate } = useContext(AppContext);

  const validateFields = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case "firstName":
      case "lastName":
        if (/\d/.test(value)) {
          newErrors[field] = "Names should not contain numbers.";
        } else {
          delete newErrors[field];
        }
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Enter a valid email address (must include @ and .)";
        } else {
          delete newErrors.email;
        }
        break;

      case "phone":
        if (!/^[0-9]*$/.test(value)) {
          newErrors.phone = "Phone must be numbers only.";
        } else if (value.length !== 10) {
          newErrors.phone = "Phone must be exactly 10 digits.";
        } else {
          delete newErrors.phone;
        }
        break;

      case "zipCode":
        if (!/^[0-9]*$/.test(value)) {
          newErrors.zipCode = "Zip code must be numbers only.";
        } else if (value.length !== 6) {
          newErrors.zipCode = "Zip code must be exactly 6 digits.";
        } else {
          delete newErrors.zipCode;
        }
        break;

      case "city":
      case "state":
      case "country":
        if (/\d/.test(value)) {
          newErrors[field] = "Only alphabets are allowed.";
        } else {
          delete newErrors[field];
        }
        break;

      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "zipCode" && value.length > 6) return;
    if (name === "phone" && value.length > 10) return;
    setAddress((prev) => ({ ...prev, [name]: value }));
    validateFields(name, value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
  toast.error("Please log in to save your address.");
  setShowUserLogin(true);
  return;
}


    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      const payload = { ...address, userId: user._id };
      const { data } = await axios.post("/api/address/add", payload);

      if (data.success) {
        toast.success("Address saved successfully!");
        navigate("/cart");
      } else {
        toast.error(data.message || "Failed to save address.");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="mt-12 flex flex-col md:flex-row gap-6 p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex-1 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Address Details</h2>
        <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              value={address.firstName}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.firstName ? "border-red-500" : ""}`}
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={address.lastName}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.lastName ? "border-red-500" : ""}`}
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={address.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.email ? "border-red-500" : ""}`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600">Street</label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.city ? "border-red-500" : ""}`}
              required
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-gray-600">State</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.state ? "border-red-500" : ""}`}
              required
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>

          <div>
            <label className="block text-gray-600">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={address.zipCode}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.zipCode ? "border-red-500" : ""}`}
              required
            />
            {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
          </div>

          <div>
            <label className="block text-gray-600">Country</label>
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.country ? "border-red-500" : ""}`}
              required
            />
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-gray-600">Phone</label>
            <input
              type="text"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.phone ? "border-red-500" : ""}`}
              required
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <img
          src={assets.add_address_iamge}
          alt="Address Illustration"
          className="w-full max-w-xs rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default Address;
