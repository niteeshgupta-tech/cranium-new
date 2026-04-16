const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Alert = require("../models/Alert");
const User = require("../models/User");
const { DEMO_EMAIL } = require("../utils/seedData");
const { successResponse, errorResponse } = require("../utils/responseFormatter");

const resolveUserId = async (req) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.id;
    } catch (error) {
      // fallback to seeded user
    }
  }
  const demoUser = await User.findOne({ email: DEMO_EMAIL }).lean();
  return demoUser?._id;
};

const getAlerts = async (req, res, next) => {
  try {
    const userId = await resolveUserId(req);
    const alerts = await Alert.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    const legacyShape = alerts.map((item) => ({
      id: item._id.toString(),
      severity: item.level,
      title: item.level === "high" ? "Potential Burnout Window" : "Wellness Risk Notice",
      message: item.message,
      resolved: item.resolved,
      createdAt: item.createdAt,
    }));

    return res.json(legacyShape);
  } catch (error) {
    return next(error);
  }
};

const createAlert = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResponse(errors.array()[0].msg));
    }

    const userId = await resolveUserId(req);
    const { level, message } = req.body;

    const alert = await Alert.create({
      userId,
      level,
      message,
      resolved: false,
    });

    return res.status(201).json(
      successResponse("Alert created successfully", {
        id: alert._id,
        level: alert.level,
        message: alert.message,
        resolved: alert.resolved,
        createdAt: alert.createdAt,
      })
    );
  } catch (error) {
    return next(error);
  }
};

const resolveAlert = async (req, res, next) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { resolved: true },
      { new: true, runValidators: true }
    ).lean();

    if (!alert) {
      return res.status(404).json(errorResponse("Alert not found"));
    }

    return res.json(successResponse("Alert resolved successfully", alert));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAlerts,
  createAlert,
  resolveAlert,
};
