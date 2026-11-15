
const mongoose = require("mongoose");

// 1. Define Charging Station Schema
const stationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      required: true,
      trim: true
    },

    city: {
      type: String,
      required: true,
      trim: true
    },

    chargerType: {
      type: String,
      required: true,
      enum: [
        "AC Charger",
        "DC Fast Charger",
        "DC Ultra Fast Charger"
      ]
    },

    powerOutput: {
      type: Number,
      required: true,
      min: 1
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    available: {
      type: Boolean,
      default: true
    },

    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90
    },

    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180
    }
  },
  {
    timestamps: true
  }
);

// 2. Create Charging Station Model
const Station = mongoose.model("Station", stationSchema);

// 3. Export Model
module.exports = Station;
