
const express = require("express");

const router = express.Router();

// Import controller functions
const {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation
} = require("../controllers/stationController");

// CREATE - Add a new station
router.post("/", createStation);

// READ - Get all stations
router.get("/", getAllStations);

// READ - Get a single station
router.get("/:id", getStationById);

// UPDATE - Update a station
router.put("/:id", updateStation);

// DELETE - Delete a station
router.delete("/:id", deleteStation);

module.exports = router;
