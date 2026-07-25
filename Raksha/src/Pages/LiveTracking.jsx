import React from "react";
import useScrollReveal from "../Hooks/Scroll";
import '../App.css';


const trackingFeatures = [
  {
    label: "Real-time updates",
    value: "Every 5 seconds",
  },
  {
    label: "Battery usage",
    value: "Optimized, under 3% per hour",
  },
  {
    label: "Accuracy",
    value: "Within 5 meters (GPS + network)",
  },
  {
    label: "Offline mode",
    value: "Last known location cached",
  },
];

function LiveTracking() {
  const [panelRef, panelVisible] = useScrollReveal();
  const [specsRef, specsVisible] = useScrollReveal();

  return (
    <section className="tracking-page">
      <div className="tracking-header">
        <div className="tracking-badge">
          <span className="badge-dot"></span>
          Live Tracking
        </div>
        <h1 className="tracking-title">Know Where Your Circle Is, Always</h1>
        <p className="tracking-subtitle">
          Continuous, battery-friendly location tracking that keeps your
          safety circle connected without draining your phone.
        </p>
      </div>

      <div
        ref={panelRef}
        className={`tracking-panel reveal ${panelVisible ? "visible" : ""}`}
      >
        <div className="tracking-status">
          <span className="status-dot"></span>
          <span>Tracking active</span>
        </div>
        <div className="tracking-members">
          <div className="member-row">
            <div className="member-avatar">A</div>
            <div className="member-info">
              <p className="member-name">Ananya</p>
              <p className="member-status">Moving — Sector 12, near MG Road</p>
            </div>
          </div>
          <div className="member-row">
            <div className="member-avatar">R</div>
            <div className="member-info">
              <p className="member-name">Rahul</p>
              <p className="member-status">Stationary — Home</p>
            </div>
          </div>
          <div className="member-row">
            <div className="member-avatar">S</div>
            <div className="member-info">
              <p className="member-name">Sneha</p>
              <p className="member-status">Moving — Approaching college</p>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={specsRef}
        className={`tracking-specs reveal ${specsVisible ? "visible" : ""}`}
      >
        {trackingFeatures.map((item, index) => (
          <div className="spec-card" key={index}>
            <p className="spec-label">{item.label}</p>
            <p className="spec-value">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LiveTracking;