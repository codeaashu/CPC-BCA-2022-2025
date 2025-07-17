require("dotenv").config();
const jwt = require("jsonwebtoken");

// Create a secret token (for login/signup)
const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60, // 3 days
  });
};

// Middleware to verify token (for protected routes)
const userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ status: false });

  jwt.verify(token, process.env.TOKEN_KEY, (err, data) => {
    if (err) return res.json({ status: false });
    return res.json({ status: true, user: data.id });
  });
};

module.exports = { createSecretToken, userVerification };
