
import { useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./StationMap.css";

// Fix default Leaflet marker icons in Vite
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

// Update map when user location changes
function MapUpdater({ userLocation }) {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView(
        [userLocation.latitude, userLocation.longitude],
        13,
        { animate: true }
      );
    }
  }, [userLocation, map]);

  return null;
}

function StationMap({ stations, userLocation }) {
  const defaultPosition = [30.7333, 76.7794];

  const mapCenter = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : defaultPosition;

  // Only display stations with valid coordinates
  const validStations = stations.filter((station) => {
    const latitude = Number(station.latitude);
    const longitude = Number(station.longitude);

    return (
      Number.isFinite(latitude) &&
      Number.isFinite(longitude) &&
      latitude >= -90 &&
      latitude <= 90 &&
      longitude >= -180 &&
      longitude <= 180
    );
  });

  return (
    <section className="map-section">

      <div className="map-heading">
        <div>
          <span className="map-tag">EXPLORE LOCATIONS</span>

          <h2>Find Charging Stations Near You</h2>

          <p>
            Explore EV charging locations on the interactive map
            and discover stations around your area.
          </p>
        </div>

        <div className="map-station-count">
          <span className="map-count-number">
            {validStations.length}
          </span>
          <span className="map-count-label">
            Mapped Stations
          </span>
        </div>
      </div>

      <div className="map-container">

        <MapContainer
          center={mapCenter}
          zoom={12}
          className="station-map"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapUpdater userLocation={userLocation} />

          {validStations.map((station) => (
            <Marker
              key={station._id}
              position={[
                Number(station.latitude),
                Number(station.longitude)
              ]}
            >
              <Popup>
                <div className="map-popup">
                  <strong>{station.name}</strong>

                  <p>{station.address}, {station.city}</p>

                  <p>Charger: {station.chargerType}</p>

                  <p>Power: {station.powerOutput} kW</p>

                  <p>Price: ₹{station.price}/kWh</p>

                  <span>
                    {station.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}

          {userLocation && (
            <Marker
              position={[
                userLocation.latitude,
                userLocation.longitude
              ]}
            >
              <Popup>
                Your Current Location
              </Popup>
            </Marker>
          )}

        </MapContainer>

      </div>

      <p className="map-footer">
        <span>●</span> Select a marker to view charging station details.
      </p>

    </section>
  );
}

export default StationMap;
