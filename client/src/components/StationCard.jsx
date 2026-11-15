
import { useState } from "react";
import "./StationCard.css";

function StationCard({ station, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: station.name,
    address: station.address,
    city: station.city,
    chargerType: station.chargerType,
    powerOutput: station.powerOutput,
    price: station.price,
    available: station.available
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await onUpdate(station._id, {
        ...formData,
        powerOutput: Number(formData.powerOutput),
        price: Number(formData.price)
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDirections = () => {
    const latitude = Number(station.latitude);
    const longitude = Number(station.longitude);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      alert("Valid location coordinates are not available.");
      return;
    }

    const destination = `${latitude},${longitude}`;

    const mapsUrl =
      `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  const distance = Number(station.distance);

  return (
    <div className="station-card">

      {isEditing ? (

        <form onSubmit={handleUpdate} className="edit-form">

          <div className="edit-form-heading">
            <h3>Edit Charging Station</h3>
            <p>Update the station information below.</p>
          </div>

          <label>Station Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Station Name"
            required
          />

          <label>Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />

          <label>City</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
          />

          <label>Charger Type</label>
          <select
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

          <label>Power Output (kW)</label>
          <input
            type="number"
            name="powerOutput"
            value={formData.powerOutput}
            onChange={handleChange}
            min="1"
            required
          />

          <label>Price per kWh (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
          />

          <label>Availability</label>
          <select
            name="available"
            value={String(formData.available)}
            onChange={(e) =>
              setFormData((previousData) => ({
                ...previousData,
                available: e.target.value === "true"
              }))
            }
          >
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>

          <div className="station-actions">
            <button type="submit" className="save-button">
              Save Changes
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>

        </form>

      ) : (

        <>

          <div className="station-card-header">

            <div className="station-title-group">
              <div className="station-icon">⚡</div>

              <div>
                <h3>{station.name}</h3>

                <p className="station-location">
                  <span>📍</span> {station.address}, {station.city}
                </p>
              </div>
            </div>

            <span
              className={
                station.available
                  ? "status available"
                  : "status unavailable"
              }
            >
              <span className="status-dot"></span>
              {station.available ? "Available" : "Unavailable"}
            </span>

          </div>

          <div className="station-specifications">

            <div className="specification">
              <span className="spec-icon">🔌</span>
              <div>
                <span className="spec-label">Charger Type</span>
                <strong>{station.chargerType}</strong>
              </div>
            </div>

            <div className="specification">
              <span className="spec-icon">⚡</span>
              <div>
                <span className="spec-label">Power Output</span>
                <strong>{station.powerOutput} kW</strong>
              </div>
            </div>

            <div className="specification">
              <span className="spec-icon">₹</span>
              <div>
                <span className="spec-label">Price per kWh</span>
                <strong className="station-price">
                  ₹{station.price}
                </strong>
              </div>
            </div>

            {station.distance !== null &&
              station.distance !== undefined &&
              Number.isFinite(distance) && (
                <div className="specification">
                  <span className="spec-icon">📍</span>
                  <div>
                    <span className="spec-label">Distance</span>
                    <strong>{distance.toFixed(2)} km</strong>
                  </div>
                </div>
              )}

          </div>

          <div className="station-card-footer">

            <button
              type="button"
              className="directions-button"
              onClick={handleDirections}
            >
              ↗ Get Directions
            </button>

            <div className="secondary-actions">

              <button
                type="button"
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>

              <button
                type="button"
                className="delete-button"
                onClick={() => onDelete(station._id)}
              >
                Delete
              </button>

            </div>

          </div>

        </>

      )}

    </div>
  );
}

export default StationCard;
