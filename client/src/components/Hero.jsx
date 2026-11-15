
import "./Hero.css";
import { PlugZap, Zap, Leaf } from "lucide-react";

function Hero({
  searchQuery,
  onSearchChange,
  onSearch,
  onGetLocation,
  locationError
}) {
  return (
    <section className="hero" id="home">
      <div className="hero-container">

        <div className="hero-content">

          <span className="hero-tag">
            ⚡ POWER YOUR JOURNEY
          </span>

          <h1>
            Find EV Charging
            <br />
            Stations <span>Near You.</span>
          </h1>

          <p className="hero-description">
            Discover, locate and manage electric vehicle
            charging stations across your city. Fast,
            reliable and eco-friendly.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search by station name, city or location..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearch();
              }}
            />

            <div className="search-buttons">
              <button
                className="search-button"
                onClick={onSearch}
              >
                Search
              </button>

              <button
                className="location-button"
                onClick={onGetLocation}
              >
                📍 Use My Location
              </button>
            </div>
          </div>

          {locationError && (
            <p className="error-message">
              {locationError}
            </p>
          )}

          <div className="hero-stats">

  <div className="hero-stat">
    <div className="stat-icon">
      <PlugZap size={26} strokeWidth={2} />
    </div>
    <div>
      <strong>50+</strong>
      <small>Charging Stations</small>
    </div>
  </div>

  <div className="hero-stat">
    <div className="stat-icon">
      <Zap size={26} strokeWidth={2} />
    </div>
    <div>
      <strong>AC & DC</strong>
      <small>Chargers</small>
    </div>
  </div>

  <div className="hero-stat">
    <div className="stat-icon">
      <Leaf size={26} strokeWidth={2} />
    </div>
    <div>
      <strong>Eco-Friendly</strong>
      <small>Travel</small>
    </div>
  </div>

</div>
        </div>

        <div className="hero-visual">
  <img
    src="/ev-hero-visual.png"
    alt="Electric car connected to an EV charging station"
    className="hero-image"
  />
</div>

      </div>
    </section>
  );
}

export default Hero;
