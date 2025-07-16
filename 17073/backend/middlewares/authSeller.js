import jwt from "jsonwebtoken";
export const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;
  if (!sellerToken) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  try {
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if (decoded.email === process.env.SELLER_EMAIL) {
      return next();
    } else {
      return res.status(403).json({ message: "Forbidden", success: false });
    }
  } catch (error) {
    console.error("Error in authSeller middleware:", error);
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};
