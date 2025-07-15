import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        ✅ Payment Successful!
      </h1>
      <p className="text-lg">
        Thank you for your payment. Redirecting you back home...
      </p>
    </div>
  );
};

export default PaymentSuccess;
