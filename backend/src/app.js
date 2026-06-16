const express = require("express");
const pool = require("./config/db");

const app = express();
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const providerRoutes = require("./routes/providerRoutes");
const tiffinRoutes = require("./routes/tiffinRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tiffin-hub-omega.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/api/providers", providerRoutes);
app.use("/api/tiffins", tiffinRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Tiffin Hub API Running",
  });
});
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      time: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = app;