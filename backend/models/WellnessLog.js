const mongoose = require("mongoose");

const wellnessLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    typingSpeed: { type: Number, required: true, min: 0, max: 250 },
    sleepHours: { type: Number, required: true, min: 0, max: 24 },
    mood: { type: String, required: true, trim: true, maxlength: 40 },
    screenTime: { type: Number, required: true, min: 0, max: 24 },
    socialInteraction: { type: Number, default: 0, min: 0, max: 10 },
    stressScore: { type: Number, required: true, min: 0, max: 100 },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

module.exports = mongoose.model("WellnessLog", wellnessLogSchema);
