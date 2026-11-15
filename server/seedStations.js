require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Station = require("./models/Station");

// 12 demo charging stations
const demoStations = [
  {
    name: "Sector 17 EV Hub",
    address: "Sector 17",
    city: "Chandigarh",
    chargerType: "DC Fast Charger",
    powerOutput: 50,
    price: 18,
    available: true,
    latitude: 30.7415,
    longitude: 76.7680,
  },
  {
    name: "Sector 22 EV Point",
    address: "Sector 22",
    city: "Chandigarh",
    chargerType: "AC Charger",
    powerOutput: 22,
    price: 15,
    available: true,
    latitude: 30.7338,
    longitude: 76.7725,
  },
  {
    name: "Sector 35 Charging Hub",
    address: "Sector 35",
    city: "Chandigarh",
    chargerType: "DC Fast Charger",
    powerOutput: 60,
    price: 20,
    available: false,
    latitude: 30.7185,
    longitude: 76.7507,
  },
  {
    name: "Industrial EV Station",
    address: "Industrial Area Phase I",
    city: "Chandigarh",
    chargerType: "DC Ultra Fast Charger",
    powerOutput: 120,
    price: 24,
    available: true,
    latitude: 30.7055,
    longitude: 76.8013,
  },
  {
    name: "Sector 43 EV Point",
    address: "Sector 43",
    city: "Chandigarh",
    chargerType: "AC Charger",
    powerOutput: 22,
    price: 16,
    available: true,
    latitude: 30.7095,
    longitude: 76.7484,
  },
  {
    name: "Sector 26 Charging Hub",
    address: "Sector 26",
    city: "Chandigarh",
    chargerType: "DC Fast Charger",
    powerOutput: 50,
    price: 19,
    available: false,
    latitude: 30.7295,
    longitude: 76.8018,
  },
  {
    name: "Mohali Phase 7 EV Hub",
    address: "Phase 7",
    city: "Mohali",
    chargerType: "DC Fast Charger",
    powerOutput: 60,
    price: 20,
    available: true,
    latitude: 30.7045,
    longitude: 76.7175,
  },
  {
    name: "Mohali Sector 62 Point",
    address: "Sector 62",
    city: "Mohali",
    chargerType: "AC Charger",
    powerOutput: 22,
    price: 15,
    available: true,
    latitude: 30.6867,
    longitude: 76.7350,
  },
  {
    name: "Airport Road EV Hub",
    address: "Airport Road",
    city: "Mohali",
    chargerType: "DC Ultra Fast Charger",
    powerOutput: 150,
    price: 25,
    available: false,
    latitude: 30.6502,
    longitude: 76.8022,
  },
  {
    name: "Panchkula Sector 5 Hub",
    address: "Sector 5",
    city: "Panchkula",
    chargerType: "DC Fast Charger",
    powerOutput: 50,
    price: 18,
    available: true,
    latitude: 30.6941,
    longitude: 76.8530,
  },
  {
    name: "Panchkula Sector 20 Point",
    address: "Sector 20",
    city: "Panchkula",
    chargerType: "AC Charger",
    powerOutput: 22,
    price: 16,
    available: false,
    latitude: 30.6812,
    longitude: 76.8603,
  },
  {
    name: "Zirakpur EV Hub",
    address: "VIP Road",
    city: "Zirakpur",
    chargerType: "DC Fast Charger",
    powerOutput: 60,
    price: 21,
    available: true,
    latitude: 30.6426,
    longitude: 76.8178,
  },
];

// Insert stations into MongoDB
const seedStations = async () => {
  try {
    await connectDB();

    const operations = demoStations.map((station) => ({
      updateOne: {
        filter: {
          name: station.name,
          address: station.address,
          city: station.city,
        },
        update: {
          $setOnInsert: station,
        },
        upsert: true,
      },
    }));

    const result = await Station.bulkWrite(operations);

    console.log("\n========== SEEDING COMPLETED ==========");
    console.log(`New stations inserted: ${result.upsertedCount}`);
    console.log(`Existing stations matched: ${result.matchedCount}`);
    console.log("=======================================\n");

  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;

  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
};

seedStations();