
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="site-navbar">
      <div className="navbar-container">

        {/* Website Logo */}
        <a href="#home" className="brand">
          <span className="brand-icon">⚡</span>
          <span>EV Locator</span>
        </a>

        {/* Navigation Links */}
        <div className="navbar-links">
          <a href="#home" className="active">Home</a>
          <a href="#stations">Find Stations</a>
          <a href="#add-station">Add Station</a>
          <a href="#features">About</a>
        </div>

        {/* Get Started Button */}
        <a href="#stations" className="navbar-cta">
          Get Started
        </a>

      </div>
    </nav>
  );
}

export default Navbar;
