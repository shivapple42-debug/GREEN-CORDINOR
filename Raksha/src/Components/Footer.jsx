import React from "react";
import '../App.css';


function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-dot"></span>
            <span className="logo-text">RAKSHA</span>
          </div>
          <p className="footer-tagline">
            Your safety circle, always connected.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4 className="footer-heading">Product</h4>
            <a href="#services">Services</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Company</h4>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#careers">Careers</a>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Legal</h4>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {currentYear} Raksha. All rights reserved.
        </p>
        <div className="footer-social">
          <a href="#twitter" aria-label="Twitter">Twitter</a>
          <a href="#instagram" aria-label="Instagram">Instagram</a>
          <a href="#linkedin" aria-label="LinkedIn">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;