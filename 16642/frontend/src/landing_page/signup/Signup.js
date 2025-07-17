import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css"; // 👈 Custom styles here

axios.defaults.withCredentials = true;

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;

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
        "http://localhost:3002/signup",
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message, user } = data;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", user.username);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("Signup failed. Check server or input.");
      console.error(error);
    }

    setInputValue({ email: "", password: "", username: "" });
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Create your account</h2>
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
            type="text"
            name="username"
            value={username}
            placeholder="Username"
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
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
