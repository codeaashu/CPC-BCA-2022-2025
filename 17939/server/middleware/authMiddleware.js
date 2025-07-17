import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';
import User from '../models/User.js';

// 🔒 Protect Company Routes
export const protectCompany = async (req, res, next) => {
  let token =
    req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : req.headers.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Company not authorized. Login again.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const company = await Company.findById(decoded.id).select('-password');

    if (!company) {
      return res.status(401).json({ success: false, message: 'Company not found.' });
    }

    req.company = company;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token: ' + error.message });
  }
};

// 🔒 Protect User Routes
export const protectUser = async (req, res, next) => {
  let token =
    req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : req.headers.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'User not authorized. Login again.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found.' });
    }

    req.user = user;
    req.auth = { userId: user._id }; // convenient for controllers
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token: ' + error.message });
  }
};
