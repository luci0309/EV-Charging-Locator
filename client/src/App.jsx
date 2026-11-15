
import { useState, useEffect } from "react";

import "./App.css";
import "./index.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureCard from "./components/FeatureCard";
import StationCard from "./components/StationCard";
import AddStation from "./components/AddStation";
import StationMap from "./components/StationMap";
import FilterBar from "./components/FilterBar";

// Backend API URL
const API_URL = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"
).replace(/\/$/, "");

// Calculate distance between two geographical coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function App() {
  // Charging station data
  const [stations, setStations] = useState([]);

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // User location states
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState("");

  // Filter states
  const [selectedCharger, setSelectedCharger] = useState("All");
  const [availability, setAvailability] = useState("All");

  // Fetch stations from MongoDB
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(`${API_URL}/api/stations`);

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch stations"
          );
        }

        setStations(result.data || []);
        setError("");
      } catch (error) {
        console.error("Fetch stations error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  // Handle search
  const handleSearch = () => {
    setSubmittedQuery(searchQuery.trim());
  };

  // Add a new station
  const handleStationAdded = (newStation) => {
    setStations((previousStations) => [
      ...previousStations,
      newStation,
    ]);
  };

  // Delete a station
  const handleDeleteStation = async (stationId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this station?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/api/stations/${stationId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to delete station"
        );
      }

      setStations((previousStations) =>
        previousStations.filter(
          (station) => station._id !== stationId
        )
      );

      alert("Charging station deleted successfully!");
    } catch (error) {
      console.error("Delete station error:", error);
      alert(error.message);
    }
  };

  // Update a station
  const handleUpdateStation = async (stationId, updatedData) => {
    try {
      const response = await fetch(
        `${API_URL}/api/stations/${stationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to update station"
        );
      }

      setStations((previousStations) =>
        previousStations.map((station) =>
          station._id === stationId ? result.data : station
        )
      );

      alert("Charging station updated successfully!");
    } catch (error) {
      console.error("Update station error:", error);
      alert(error.message);
      throw error;
    }
  };

  // Get user's current location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        "Geolocation is not supported by your browser."
      );
      return;
    }

    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLocationError("");
      },
      (error) => {
        setLocationError(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Calculate distance for every station
  const stationsWithDistance = stations.map((station) => {
    const latitude = Number(station.latitude);
    const longitude = Number(station.longitude);

    const validCoordinates =
      Number.isFinite(latitude) &&
      Number.isFinite(longitude) &&
      latitude >= -90 &&
      latitude <= 90 &&
      longitude >= -180 &&
      longitude <= 180;

    if (!userLocation || !validCoordinates) {
      return {
        ...station,
        distance: null,
      };
    }

    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      latitude,
      longitude
    );

    return {
      ...station,
      distance,
    };
  });

  // Sort stations by distance when location is available
  const sortedStations = userLocation
    ? [...stationsWithDistance].sort((a, b) => {
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      })
    : stationsWithDistance;

  // Filter stations
  const filteredStations = sortedStations.filter((station) => {
    const query = submittedQuery.toLowerCase();

    const matchesSearch =
      (station.name || "").toLowerCase().includes(query) ||
      (station.address || "").toLowerCase().includes(query) ||
      (station.city || "").toLowerCase().includes(query) ||
      (station.chargerType || "").toLowerCase().includes(query);

    const matchesCharger =
      selectedCharger === "All" ||
      station.chargerType === selectedCharger;

    const matchesAvailability =
      availability === "All" ||
      (availability === "Available" && station.available === true) ||
      (availability === "Unavailable" && station.available === false);

    return (
      matchesSearch &&
      matchesCharger &&
      matchesAvailability
    );
  });

  return (
    <div className="app">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
        onGetLocation={handleGetLocation}
        locationError={locationError}
      />

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Our EV Locator?</h2>

        <p className="stations-subtitle">
          Everything you need to find convenient EV charging.
        </p>

        <div className="features-container">
          <FeatureCard
            title="Find Nearby Stations"
            description="Discover EV charging stations around your location."
          />

          <FeatureCard
            title="Real-Time Availability"
            description="Check charging station availability before visiting."
          />

          <FeatureCard
            title="Easy to Use"
            description="Find charging stations quickly and conveniently."
          />
        </div>
      </section>

      {/* Add Station Section */}
      <AddStation onStationAdded={handleStationAdded} />

      {/* Charging Stations Map */}
      <StationMap
        stations={filteredStations}
        userLocation={userLocation}
      />

      {/* Charging Stations Section */}
      <section className="stations-section">
        <h2>Available Charging Stations</h2>

        <p className="stations-subtitle">
          Explore and manage EV charging stations.
        </p>

        <FilterBar
          selectedCharger={selectedCharger}
          onChargerChange={setSelectedCharger}
          availability={availability}
          onAvailabilityChange={setAvailability}
        />

        {userLocation && (
          <p className="location-status">
            Showing stations ordered by distance from your location.
          </p>
        )}

        {loading && (
          <p className="loading-message">
            Loading charging stations...
          </p>
        )}

        {error && (
          <p className="error-message">{error}</p>
        )}

        {!loading && !error && (
          <>
            <div className="stations-container">
              {filteredStations.map((station) => (
                <StationCard
                  key={station._id}
                  station={station}
                  onDelete={handleDeleteStation}
                  onUpdate={handleUpdateStation}
                />
              ))}
            </div>

            {filteredStations.length === 0 && (
              <p className="no-results">
                {stations.length === 0
                  ? "No charging stations have been added yet."
                  : "No matching charging stations found."}
              </p>
            )}
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} EV Charging Locator.
          Powering a cleaner journey.
        </p>
      </footer>
    </div>
  );
}

export default App;
