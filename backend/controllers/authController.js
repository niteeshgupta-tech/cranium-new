const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const { successResponse, errorResponse } = require("../utils/responseFormatter");

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResponse(errors.array()[0].msg));
    }

    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const exists = await User.findOne({ email: normalizedEmail }).lean();
    if (exists) {
      return res.status(409).json(errorResponse("Email already registered"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = createToken(user._id.toString());
    return res
      .status(201)
      .json(successResponse("Registration successful", { token, user: { id: user._id, name, email: normalizedEmail, role: user.role } }));
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResponse(errors.array()[0].msg));
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      return res.status(401).json(errorResponse("Invalid credentials"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json(errorResponse("Invalid credentials"));
    }

    const token = createToken(user._id.toString());
    return res.json(
      successResponse("Login successful", {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      })
    );
  } catch (error) {
    return next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password").lean();
    return res.json(successResponse("Profile fetched successfully", user));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
  profile,
};
