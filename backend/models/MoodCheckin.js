const mongoose = require("mongoose");

const moodCheckinSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    mood: {
      type: String,
      required: true,
      trim: true,
      maxlength: 40,
    },
    note: {
      type: String,
      trim: true,
      maxlength: 400,
      default: "",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

module.exports = mongoose.model("MoodCheckin", moodCheckinSchema);
