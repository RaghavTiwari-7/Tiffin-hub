const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createTiffin,
  getAllTiffins,
} = require("../controllers/tiffinController");

router.post("/", protect, createTiffin);

router.get("/", getAllTiffins);

module.exports = router;