import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError = (err) =>
    toast.error(err, { position: "bottom-left" });

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-right" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3002/login",
        { email, password },
        { withCredentials: true }
      );

      const { success, message, user } = data;

      if (success) {
        const username =
          typeof user === "string"
            ? user
            : user?.username || user?.name || "User";

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);

        handleSuccess(`Welcome back, ${username}`);

        setTimeout(() => {
          const referrer = document.referrer;

          if (referrer.includes("3001")) {
            // 👇 Redirect with username as query param
            window.location.href = `http://localhost:3001?username=${encodeURIComponent(
              username
            )}`;
          } else {
            navigate("/");
          }
        }, 1500);
      } else {
        handleError(message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      handleError("Something went wrong. Try again.");
    }

    setInputValue({ email: "", password: "" });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email address"
            onChange={handleOnChange}
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleOnChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
