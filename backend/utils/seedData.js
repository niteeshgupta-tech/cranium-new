const bcrypt = require("bcryptjs");
const User = require("../models/User");
const WellnessLog = require("../models/WellnessLog");
const Alert = require("../models/Alert");
const MoodCheckin = require("../models/MoodCheckin");
const { calculateStressScore } = require("./riskCalculator");

const DEMO_EMAIL = "demo@silentsuffering.ai";

const ensureSeedData = async () => {
  const userCount = await User.countDocuments();
  if (userCount > 0) return;

  const hashedPassword = await bcrypt.hash("demopassword", 10);
  const demoUser = await User.create({
    name: "Demo User",
    email: DEMO_EMAIL,
    password: hashedPassword,
    role: "user",
  });

  const entries = [
    { typingSpeed: 58, sleepHours: 7.2, mood: "calm", screenTime: 4.1, socialInteraction: 6 },
    { typingSpeed: 52, sleepHours: 6.3, mood: "neutral", screenTime: 5.2, socialInteraction: 4 },
    { typingSpeed: 44, sleepHours: 5.4, mood: "stressed", screenTime: 7.4, socialInteraction: 2 },
  ];

  const wellnessDocs = entries.map((entry) => {
    const risk = calculateStressScore(entry);
    return {
      userId: demoUser._id,
      ...entry,
      stressScore: risk.stressScore,
    };
  });

  await WellnessLog.insertMany(wellnessDocs);

  const lastEntry = wellnessDocs[wellnessDocs.length - 1];
  if (lastEntry.stressScore >= 61) {
    await Alert.create({
      userId: demoUser._id,
      level: "high",
      message: "Stress risk increasing rapidly. Suggest immediate break.",
      resolved: false,
    });
  }

  await MoodCheckin.create({
    userId: demoUser._id,
    mood: "stressed",
    note: "Feeling overloaded and mentally drained this week.",
  });
};

module.exports = {
  ensureSeedData,
  DEMO_EMAIL,
};
