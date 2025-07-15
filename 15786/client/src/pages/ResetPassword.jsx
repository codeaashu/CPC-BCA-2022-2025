import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const upperCheck = /[A-Z]/.test(password);
    const lowerCheck = /[a-z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const symbolCheck = /[^A-Za-z0-9]/.test(password);
    const exactLengthCheck = password.length === 8;
    return {
      upperCheck,
      lowerCheck,
      numberCheck,
      symbolCheck,
      exactLengthCheck,
    };
  };

  const passwordChecks = validatePassword(newPassword);

  const handleReset = async (e) => {
    e.preventDefault();

    if (
      !passwordChecks.upperCheck ||
      !passwordChecks.lowerCheck ||
      !passwordChecks.numberCheck ||
      !passwordChecks.symbolCheck ||
      !passwordChecks.exactLengthCheck
    ) {
      toast.error("Password does not meet requirements!");
      return;
    }

    try {
      const { data } = await axios.post(`/api/users/reset-password/${token}`, {
        newPassword,
      });
      if (data.success) {
        toast.success("Password reset successful!");
        navigate("/");
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
        onSubmit={handleReset}
        className="flex flex-col gap-4 p-8 w-96 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <h2 className="text-2xl font-medium mb-4">Reset Your Password</h2>

        <div className="w-full relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded w-full"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-lg cursor-pointer"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {newPassword && (
          <div className="text-xs text-red-500 space-y-1">
            {!passwordChecks.upperCheck && (
              <p>• Must contain at least one uppercase letter</p>
            )}
            {!passwordChecks.lowerCheck && (
              <p>• Must contain at least one lowercase letter</p>
            )}
            {!passwordChecks.numberCheck && (
              <p>• Must contain at least one number</p>
            )}
            {!passwordChecks.symbolCheck && (
              <p>• Must contain at least one symbol (e.g. @ # $)</p>
            )}
            {!passwordChecks.exactLengthCheck && (
              <p>• Must be exactly 8 characters long</p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
