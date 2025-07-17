import { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const RecruiterForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { backendUrl, setShowRecruiterLogin } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/company/forgot-password`, { email });
      setSubmitted(true);
      toast.success(data.message || '✅ Reset link sent to your email!');
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Branding Panel */}
      <div
        className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 text-white relative"
        style={{ background: "linear-gradient(to bottom right, #fbc2eb, #a6c1ee, #c084fc)" }}
      >
        <h1 className="text-5xl font-extrabold mb-4">
          <span className="text-blue-500">Career</span>
          <span className="text-green-400">Connect</span>
        </h1>
        <p className="text-center max-w-xs text-white/90 text-md">
          Enter your email to receive a password reset link.
        </p>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-2xl animate-blob z-0"></div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full md:w-1/2 p-10 flex items-center justify-center bg-white">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800"> Recruiter Forgot Password</h2>
            <p className="text-sm text-gray-500 mt-1">We'll send a reset link to your email.</p>
          </div>

          {submitted ? (
            <div className="text-green-600 font-medium text-center">
              ✅ Check your email for reset instructions.
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-100 focus:outline-none"
                  placeholder="you@company.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </>
          )}

          <div className="text-sm text-center mt-2 text-gray-500">
            Remember your password?{" "}
            <button
              type="button"
              onClick={() => setShowRecruiterLogin(true)}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecruiterForgotPassword;
