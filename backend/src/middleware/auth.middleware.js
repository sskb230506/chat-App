import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const ProtectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protected middleware:", error.message);
    return res.status(401).json({ message: "Unauthorized - Token verification failed" });
  }
};
