import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-dot"><Link to="/"></Link></span>
        <span className="logo-text"><Link to="/">RAKSHA</Link></span>
      </div>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/maps" onClick={closeMenu}>Maps</Link></li>
        <li><Link to="/services" onClick={closeMenu}>Services</Link></li>
        <li><Link to="/live-tracking" onClick={closeMenu}>Live Tracking</Link></li>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
      </ul>

      <div className="navbar-actions">
        <Link to="/login" className="btn-login" onClick={closeMenu}>
          Login
        </Link>

        <Link to="/register" className="btn-register" onClick={closeMenu}>
          Register
        </Link>
      </div>

      <button className="navbar-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}

export default Navbar;