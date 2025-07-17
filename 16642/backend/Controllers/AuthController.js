const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // 2. Create new user
    const user = await User.create({ email, password, username });

    // 3. Create token and set cookie
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    // 4. Send response
    return res.status(201).json({
      success: true,
      message: "User signed up successfully",
      user: user.username, // ✅ return username only
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Signup failed, try again later" });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Incorrect email or password" });
    }

    // 3. Compare password
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ success: false, message: "Incorrect email or password" });
    }

    // 4. Create token and set cookie
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    // 5. Send response with username
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: user.username, // ✅ Send just the username
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Login failed, try again later" });
  }
};
