
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const stationRoutes = require("./routes/stationRoutes");

// Create Express application FIRST
const app = express();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

// Station routes
app.use("/api/stations", stationRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("EV Charging Locator API is running!");
});

// Health check
app.get("/api/health", (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(databaseConnected ? 200 : 503).json({
    success: databaseConnected,
    server: "running",
    database: databaseConnected ? "connected" : "disconnected",
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
