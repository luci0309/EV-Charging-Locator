
import { useState } from "react";
import "./AddStation.css";

function AddStation({ onStationAdded }) {
  const initialFormData = {
    name: "",
    address: "",
    city: "",
    chargerType: "AC Charger",
    powerOutput: "",
    price: "",
    available: true,
    latitude: "",
    longitude: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/stations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...formData,
            powerOutput: Number(formData.powerOutput),
            price: Number(formData.price),
            latitude: Number(formData.latitude),
            longitude: Number(formData.longitude)
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add station");
      }

      onStationAdded(result.data);

      setMessage("Charging station added successfully!");
      setMessageType("success");

      setFormData(initialFormData);

    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="add-station-section">

      <div className="add-station-heading">
        <span className="form-tag">STATION MANAGEMENT</span>
        <h2>Add a Charging Station</h2>
        <p>
          Register a new EV charging station and make it
          discoverable to users.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="add-station-form">

        <div className="form-section">
          <h3>Basic Information</h3>

          <div className="form-grid">

            <div className="form-field full-width">
              <label htmlFor="station-name">Station Name</label>
              <input
                id="station-name"
                type="text"
                name="name"
                placeholder="e.g. Tata Power Charging Station"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="station-address">Address</label>
              <input
                id="station-address"
                type="text"
                name="address"
                placeholder="Enter street or sector"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="station-city">City</label>
              <input
                id="station-city"
                type="text"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

          </div>
        </div>

        <div className="form-section">
          <h3>Charging Information</h3>

          <div className="form-grid">

            <div className="form-field full-width">
              <label htmlFor="charger-type">Charger Type</label>
              <select
                id="charger-type"
                name="chargerType"
                value={formData.chargerType}
                onChange={handleChange}
              >
                <option value="AC Charger">AC Charger</option>
                <option value="DC Fast Charger">DC Fast Charger</option>
                <option value="DC Ultra Fast Charger">
                  DC Ultra Fast Charger
                </option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="power-output">Power Output (kW)</label>
              <input
                id="power-output"
                type="number"
                name="powerOutput"
                placeholder="e.g. 50"
                value={formData.powerOutput}
                onChange={handleChange}
                min="1"
                step="any"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="station-price">Price per kWh (₹)</label>
              <input
                id="station-price"
                type="number"
                name="price"
                placeholder="e.g. 18"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="any"
                required
              />
            </div>

          </div>
        </div>

        <div className="form-section">
          <h3>Station Location</h3>
          <p className="section-description">
            Enter coordinates to display this station on the map.
          </p>

          <div className="form-grid">

            <div className="form-field">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                type="number"
                name="latitude"
                placeholder="e.g. 30.7333"
                value={formData.latitude}
                onChange={handleChange}
                min="-90"
                max="90"
                step="any"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                type="number"
                name="longitude"
                placeholder="e.g. 76.7794"
                value={formData.longitude}
                onChange={handleChange}
                min="-180"
                max="180"
                step="any"
                required
              />
            </div>

          </div>
        </div>

        <div className="availability-box">
          <div>
            <strong>Station Availability</strong>
            <p>Is this charging station currently operational?</p>
          </div>

          <label className="availability-toggle">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <button
          type="submit"
          className="add-station-button"
          disabled={loading}
        >
          {loading ? "Adding Station..." : "＋ Add Charging Station"}
        </button>

        {message && (
          <p className={`form-message ${messageType}`}>
            {message}
          </p>
        )}

      </form>
    </section>
  );
}

export default AddStation;
