const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createProvider,
} = require("../controllers/providerController");

router.post("/", protect, createProvider);

module.exports = router;