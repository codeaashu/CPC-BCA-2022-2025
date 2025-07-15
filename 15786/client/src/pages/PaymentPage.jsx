import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    axios,
    user,
    cartItems,
    setCartItems,
  } = useAppContext();

  // ✅ Get the selected address passed from Cart
  const selectedAddress = location.state?.selectedAddress;

  const handleConfirmPayment = async () => {
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select delivery address first!");
      return;
    }

    setIsPaid(true);
    setIsProcessing(true);

    // Fake wait for 2 seconds to show processing message
    setTimeout(async () => {
      const orderPayload = {
        userId: user._id,
        items: Object.keys(cartItems).map((key) => ({
          product: key,
          quantity: cartItems[key].quantity,
          weight: cartItems[key].weight,
        })),
        address: selectedAddress._id,
      };

      try {
        const { data } = await axios.post("/api/order/online", orderPayload);

        if (data.success) {
          toast.success("Payment Successful! Order placed.");
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message || "Something went wrong.");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {!isPaid ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Scan to Pay</h1>
          <img
            src="/QR.jpg"
            alt="QR Code"
            className="w-64 h-64 border border-gray-300 mb-6"
          />
          <p className="mb-4 text-center">
            Scan this QR with Google Pay / PhonePe / Paytm (Demo Only)
          </p>
          <button
            onClick={handleConfirmPayment}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            I Have Paid
          </button>
        </>
      ) : (
        <h2 className="text-xl text-green-600 font-semibold">
          {isProcessing
            ? "Payment Confirmed! Processing... Please wait."
            : "Payment Confirmed! Redirecting to Orders..."}
        </h2>
      )}
    </div>
  );
};

export default PaymentPage;
