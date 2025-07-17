import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const {
    backendUrl,
    setUserToken,
    setUserData,
  } = useContext(AppContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${backendUrl}/api/users/login`, form);
      const { token, user } = res.data;

      localStorage.setItem("careerconnect-user-token", token);
      setUserToken(token);         // ✅ set token in context
      setUserData(user);           // ✅ set user data in context

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Panel */}
      <div
        className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 text-white relative"
        style={{ background: "linear-gradient(to bottom right, #fbc2eb, #a6c1ee, #c084fc)" }}
      >
        <h1 className="text-5xl font-extrabold mb-4 transition-transform duration-300 hover:scale-105">
          <span className="text-blue-500 hover:text-blue-600">Career</span>
          <span className="text-green-400 hover:text-green-500">Connect</span>
        </h1>
        <p className="text-center text-md max-w-sm text-white/90">
          Welcome back to your career journey. Sign in and explore top job opportunities tailored for you.
        </p>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-2xl animate-blob z-0"></div>
      </div>

      {/* Login Form */}
      <div className="w-full md:w-1/2 p-10 bg-white flex justify-center items-center">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-5">
          <div className="text-center mb-2">
            <h2 className="text-3xl font-bold text-gray-800">Login to CareerConnect</h2>
            <p className="text-blue-600 text-sm mt-1">Continue your job search journey</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@example.com"
              required
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="input pr-10"
              />
              <span
                className="absolute top-2 right-3 text-gray-600 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded text-white mt-2 transition ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="flex justify-between text-sm mt-2 text-gray-600">
            <Link to="/register" className="hover:text-blue-600 underline">
              Don't have an account? Sign Up
            </Link>
            <Link to="/forgot-password" className="hover:text-blue-600 underline">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
