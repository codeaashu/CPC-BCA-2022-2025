import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(password);
    if (!isValid) {
      return toast.error("Password must be 6+ characters, include a number and special character.");
    }

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/reset-password/${token}`, {
        password,
      });

      toast.success('✅ Password reset successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Reset failed. Try requesting a new link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Branding Section */}
      <div
        className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 text-white"
        style={{ background: "linear-gradient(to bottom right, #fbc2eb, #a6c1ee)" }}
      >
        <h1 className="text-5xl font-extrabold mb-4">
          <span className="text-blue-500">Career</span>
          <span className="text-green-400">Connect</span>
        </h1>
        <p className="text-white/90 max-w-xs text-center">
          Choose a new password and regain access to your account.
        </p>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 p-10 flex items-center justify-center bg-white">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Reset Password</h2>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter a strong password"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Must be at least 6 characters, include a number & special character.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
