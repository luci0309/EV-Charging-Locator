import "./FilterBar.css";


function FilterBar({
  selectedCharger,
  onChargerChange,
  availability,
  onAvailabilityChange
}) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Charger Type</label>
        <select
          value={selectedCharger}
          onChange={(e) => onChargerChange(e.target.value)}
        >
          <option value="All">All Chargers</option>
          <option value="AC Charger">AC Charger</option>
          <option value="DC Fast Charger">DC Fast Charger</option>
          <option value="DC Ultra Fast Charger">
            DC Ultra Fast Charger
          </option>
        </select>
      </div>

      <div className="filter-group">
        <label>Availability</label>
        <select
          value={availability}
          onChange={(e) => onAvailabilityChange(e.target.value)}
        >
          <option value="All">All Stations</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
