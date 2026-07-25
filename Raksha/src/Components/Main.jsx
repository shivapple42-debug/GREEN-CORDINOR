import React from "react";
import '../App.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow"></div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Raksha Safety Network v2.0 — Live
        </div>

        <h1 className="hero-title">
          Your Safety
          <br />
          Command Center
        </h1>

        <p className="hero-description">
          A complete personal safety network with real-time SOS alerts, live
          location sharing, and instant emergency response — built to keep
          your circle connected when it matters most.
        </p>

        <div className="hero-buttons">
          <a href="/login" className="btn-primary">
            Get Started <span className="arrow">&rarr;</span>
          </a>
          <a href="/about" className="btn-secondary">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;