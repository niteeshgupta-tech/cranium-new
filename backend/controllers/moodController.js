const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const MoodCheckin = require("../models/MoodCheckin");
const User = require("../models/User");
const WellnessLog = require("../models/WellnessLog");
const Alert = require("../models/Alert");
const { DEMO_EMAIL } = require("../utils/seedData");
const { calculateStressScore } = require("../utils/riskCalculator");
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

const moodFromScore = (moodScore) => {
  if (moodScore >= 75) return "happy";
  if (moodScore >= 55) return "neutral";
  if (moodScore >= 35) return "stressed";
  return "sad";
};

const createMoodCheckin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResponse(errors.array()[0].msg));
    }

    const userId = await resolveUserId(req);
    const moodScore = Number(req.body.moodScore ?? 50);
    const mood = req.body.mood || moodFromScore(moodScore);
    const note = req.body.note || req.body.notes || "";

    await MoodCheckin.create({
      userId,
      mood,
      note,
    });

    const syntheticMetrics = {
      sleepHours: Number(req.body.sleepHours ?? 6.2),
      screenTime: Number(req.body.screenTime ?? 5.8),
      typingSpeed: Number(req.body.typingSpeed ?? 48),
      socialInteraction: Number(req.body.socialInteraction ?? 4),
      mood,
    };

    const risk = calculateStressScore(syntheticMetrics);
    const wellnessLog = await WellnessLog.create({
      userId,
      ...syntheticMetrics,
      stressScore: risk.stressScore,
    });

    if (risk.alertLevel === "high") {
      await Alert.create({
        userId,
        level: "high",
        message: "Stress risk increasing rapidly. Suggest immediate break.",
        resolved: false,
      });
    }

    return res.status(201).json(
      successResponse("Mood check-in saved successfully", {
        mood,
        note,
        stressScore: wellnessLog.stressScore,
        status: risk.status,
      })
    );
  } catch (error) {
    return next(error);
  }
};

const getMoodHistory = async (req, res, next) => {
  try {
    const userId = await resolveUserId(req);
    const history = await MoodCheckin.find({ userId })
      .sort({ createdAt: -1 })
      .limit(30)
      .lean();

    return res.json(successResponse("Mood history fetched successfully", history));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createMoodCheckin,
  getMoodHistory,
};
