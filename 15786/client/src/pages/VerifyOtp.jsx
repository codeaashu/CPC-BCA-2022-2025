import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/verify-otp", { email, otp });
      if (data.success) {
        toast.success("OTP Verified!");
        navigate(`/reset-password/${data.resetToken}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleVerify}
        className="flex flex-col gap-4 p-8 w-96 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <h2 className="text-2xl font-medium mb-4">Verify OTP</h2>

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 rounded"
          required
        />

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border border-gray-300 p-3 rounded"
          required
        />

        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
