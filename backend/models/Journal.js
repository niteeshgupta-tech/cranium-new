const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 6000,
    },
    mood: { type: String, default: "reflective", trim: true, maxlength: 40 },
    stressLevel: {
      type: String,
      enum: ["low", "moderate", "high"],
      default: "moderate",
    },
    burnoutRisk: {
      type: String,
      enum: ["low", "moderate", "high"],
      default: "moderate",
    },
    emotionalTone: { type: String, default: "balanced", trim: true, maxlength: 60 },
    summary: { type: String, default: "", trim: true, maxlength: 1000 },
    suggestions: [{ type: String, trim: true, maxlength: 300 }],
    confidence: { type: Number, default: 68, min: 0, max: 100 },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

module.exports = mongoose.model("Journal", journalSchema);
