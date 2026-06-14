const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { selectRole } = require("../controllers/userController");

router.patch("/select-role", protect, selectRole);
const {
    updateProfile,
  } = require("../controllers/userController");
  
  router.put(
    "/profile",
    protect,
    updateProfile
  );
module.exports = router;