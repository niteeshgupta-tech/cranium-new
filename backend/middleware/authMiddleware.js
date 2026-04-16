const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { errorResponse } = require("../utils/responseFormatter");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
      return res.status(401).json(errorResponse("Unauthorized"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password").lean();
    if (!user) {
      return res.status(401).json(errorResponse("Unauthorized"));
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json(errorResponse("Unauthorized"));
  }
};

module.exports = { protect };
