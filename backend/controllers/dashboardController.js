const jwt = require("jsonwebtoken");
const User = require("../models/User");
const WellnessLog = require("../models/WellnessLog");
const MoodCheckin = require("../models/MoodCheckin");
const { DEMO_EMAIL } = require("../utils/seedData");
const { calculateStressScore } = require("../utils/riskCalculator");
const { successResponse, successWithCompatibility } = require("../utils/responseFormatter");

const resolveUserId = async (req) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.id;
    } catch (error) {
      // fallback to demo user
    }
  }

  const demoUser = await User.findOne({ email: DEMO_EMAIL }).lean();
  return demoUser?._id;
};

const buildInsights = (status, latest) => {
  if (status === "high") {
    return {
      aiSummary:
        "Behavioral signals indicate elevated stress load and cognitive fatigue.",
      trendExplanation:
        "Reduced rest combined with high screen exposure can intensify emotional exhaustion.",
      recommendation:
        "Take a short guided break, reduce late-night screen usage, and log a mood check-in.",
    };
  }
  if (status === "moderate") {
    return {
      aiSummary: "Wellness trend is stable but showing mild stress accumulation.",
      trendExplanation:
        "Sleep and attention pattern suggest pressure is manageable but rising.",
      recommendation:
        "Protect focus windows, add one social interaction block, and improve sleep consistency.",
    };
  }
  return {
    aiSummary: "Wellness signals look healthy and resilient.",
    trendExplanation: "Current balance between activity, rest, and mood is supportive.",
    recommendation: "Maintain this routine and continue periodic mood check-ins.",
  };
};

const getStats = async (req, res, next) => {
  try {
    const userId = await resolveUserId(req);
    const latest = await WellnessLog.findOne({ userId }).sort({ createdAt: -1 }).lean();
    const latestMood = await MoodCheckin.findOne({ userId }).sort({ createdAt: -1 }).lean();

    const fallbackRisk = calculateStressScore({});
    const stressScore = latest?.stressScore ?? fallbackRisk.stressScore;
    const status = fallbackRisk.status === "healthy" ? "healthy" : fallbackRisk.status;
    const currentStatus = latest ? (stressScore <= 30 ? "healthy" : stressScore <= 60 ? "moderate" : "high") : status;

    const payload = {
      wellnessScore: 100 - stressScore,
      status: currentStatus,
      lastUpdated: latest?.createdAt || new Date().toISOString(),
      stats: {
        typingSpeed: {
          label: "Typing Speed",
          value: `${latest?.typingSpeed ?? 54} wpm`,
        },
        sleepHours: {
          label: "Sleep Hours",
          value: `${latest?.sleepHours ?? 7} hrs`,
        },
        mood: {
          label: "Mood",
          value: latestMood?.mood || latest?.mood || "Steady",
          score: 100 - stressScore,
        },
        screenTime: {
          label: "Screen Time",
          value: `${latest?.screenTime ?? 4.5} hrs`,
        },
      },
      insights: buildInsights(currentStatus, latest),
      raw: {
        latestTypingSpeed: latest?.typingSpeed ?? null,
        latestSleepHours: latest?.sleepHours ?? null,
        latestMood: latestMood?.mood || latest?.mood || null,
        latestScreenTime: latest?.screenTime ?? null,
        latestStressScore: stressScore,
        statusLevel: currentStatus,
      },
    };

    return res.json(successWithCompatibility("Data fetched successfully", payload));
  } catch (error) {
    return next(error);
  }
};

const getTrends = async (req, res, next) => {
  try {
    const userId = await resolveUserId(req);
    const logs = await WellnessLog.find({ userId })
      .sort({ createdAt: 1 })
      .limit(12)
      .select("stressScore createdAt")
      .lean();

    const stressTrend = logs.map((item) => ({
      name: new Date(item.createdAt).toLocaleDateString("en-US", { weekday: "short" }),
      value: item.stressScore,
    }));

    const wellnessScoreHistory = logs.map((item) => ({
      name: new Date(item.createdAt).toLocaleDateString("en-US", { weekday: "short" }),
      value: 100 - item.stressScore,
    }));

    const chartData = logs.map((item) => ({
      time: new Date(item.createdAt).toLocaleTimeString("en-US", { hour: "numeric" }),
      score: item.stressScore,
    }));

    return res.json(
      successWithCompatibility("Trends fetched successfully", {
        stressTrend,
        wellnessScoreHistory,
        chartData,
      })
    );
  } catch (error) {
    return next(error);
  }
};

const getInsights = async (req, res, next) => {
  try {
    const userId = await resolveUserId(req);
    const latest = await WellnessLog.findOne({ userId }).sort({ createdAt: -1 }).lean();
    const stressScore = latest?.stressScore ?? 40;
    const status = stressScore <= 30 ? "healthy" : stressScore <= 60 ? "moderate" : "high";
    const insights = buildInsights(status, latest);

    return res.json(successResponse("Insights fetched successfully", insights));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getStats,
  getTrends,
  getInsights,
};
