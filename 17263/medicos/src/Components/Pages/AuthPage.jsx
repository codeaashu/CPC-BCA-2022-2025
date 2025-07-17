import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      if (password.length < 8) {
        alert("Password must be at least 8 characters.");
        return;
      }

      const payload = { username, email, password };

      try {
        const res = await fetch("http://127.0.0.1:8000/api/register/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok) {
          alert("✅ Registration successful!");
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setIsLogin(true); // Switch to login after registration
        } else {
          alert("❌ " + JSON.stringify(data));
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      }
    } else {
      //  Login
      try {
        const res = await fetch("http://127.0.0.1:8000/api/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        const data = await res.json();

        if (res.ok && data.token) {
          localStorage.setItem("token", data.token);
          alert("✅ Login successful!");
          navigate("/profile");
        } else {
          alert("❌ Login failed: " + JSON.stringify(data));
        }
      } catch (err) {
        console.error(err);
        alert("❌ Login request failed.");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="login-container">
        <a href="#" className="logo">
          Σ𝗘𝗗𝗜𝗖𝗢𝗦 | <sub>Your online medical store</sub>
        </a>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {!isLogin && (
            <>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </>
          )}

          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {!isLogin && (
            <>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  className="toggle-eye"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </>
          )}

          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>

        <div className="register-link">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button type="button" onClick={toggleMode}>
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" onClick={toggleMode}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
