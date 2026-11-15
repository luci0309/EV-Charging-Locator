
const Station = require("../models/Station");

// ======================================
// 1. CREATE A NEW CHARGING STATION
// ======================================

const createStation = async (req, res) => {
  try {

    const station = await Station.create(req.body);

    res.status(201).json({
      success: true,
      message: "Charging station created successfully",
      data: station
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};


// ======================================
// 2. GET ALL CHARGING STATIONS
// ======================================

const getAllStations = async (req, res) => {
  try {

    const stations = await Station.find();

    res.status(200).json({
      success: true,
      count: stations.length,
      data: stations
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// ======================================
// 3. GET A SINGLE CHARGING STATION
// ======================================

const getStationById = async (req, res) => {
  try {

    const station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({
        success: false,
        message: "Charging station not found"
      });
    }

    res.status(200).json({
      success: true,
      data: station
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};


// ======================================
// 4. UPDATE A CHARGING STATION
// ======================================

const updateStation = async (req, res) => {
  try {

    const station = await Station.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!station) {
      return res.status(404).json({
        success: false,
        message: "Charging station not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Charging station updated successfully",
      data: station
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};


// ======================================
// 5. DELETE A CHARGING STATION
// ======================================

const deleteStation = async (req, res) => {
  try {

    const station = await Station.findByIdAndDelete(req.params.id);

    if (!station) {
      return res.status(404).json({
        success: false,
        message: "Charging station not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Charging station deleted successfully"
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};


// ======================================
// EXPORT ALL CONTROLLER FUNCTIONS
// ======================================

module.exports = {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation
};
