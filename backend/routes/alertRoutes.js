const express = require("express");
const { body, param } = require("express-validator");
const { getAlerts, createAlert, resolveAlert } = require("../controllers/alertController");

const router = express.Router();

router.get("/", getAlerts);

router.post(
  "/create",
  [
    body("level").isIn(["low", "moderate", "high"]).withMessage("Invalid alert level"),
    body("message").trim().notEmpty().withMessage("Alert message is required"),
  ],
  createAlert
);

router.patch(
  "/:id/resolve",
  [param("id").isMongoId().withMessage("Invalid alert id")],
  resolveAlert
);

module.exports = router;
