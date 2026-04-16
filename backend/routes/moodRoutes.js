const express = require("express");
const { body } = require("express-validator");
const { createMoodCheckin, getMoodHistory } = require("../controllers/moodController");

const router = express.Router();

router.post(
  "/",
  [
    body("mood")
      .optional()
      .isString()
      .trim()
      .isLength({ min: 2, max: 40 })
      .withMessage("Mood must be 2-40 characters"),
    body("note")
      .optional()
      .isString()
      .isLength({ max: 400 })
      .withMessage("Note cannot exceed 400 characters"),
    body("moodScore").optional().isNumeric().withMessage("Mood score must be numeric"),
  ],
  createMoodCheckin
);

router.post("/checkin", createMoodCheckin);
router.get("/history", getMoodHistory);

module.exports = router;
