import React from "react";
import useScrollReveal from "../Hooks/Scroll";
import '../App.css';


const featuresData = [
  {
    icon: "pulse",
    title: "Real-Time Monitoring",
    description:
      "Live dashboard tracking every member of your circle, location updates, and safety status.",
  },
  {
    icon: "shield",
    title: "Emergency SOS",
    description:
      "One tap sends your live location and an alert to your emergency contacts instantly.",
  },
  {
    icon: "bolt",
    title: "Smart Alerts",
    description:
      "Automatic check-ins and route deviation warnings powered by real-time location analysis.",
  },
  {
    icon: "radio",
    title: "Live Location Sharing",
    description:
      "Share your live location with trusted contacts for as long as you need, with one tap.",
  },
  {
    icon: "map",
    title: "Safe Route Mapping",
    description:
      "Get suggested routes based on lighting, crowd density, and past incident reports.",
  },
  {
    icon: "alert",
    title: "Incident Reporting",
    description:
      "Report and track incidents in your area, with status updates until resolution.",
  },
];

function renderIcon(name) {
  switch (name) {
    case "pulse":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h4l2 8 4-16 2 8h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "radio":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="2" />
          <path d="M8.5 8.5a5 5 0 000 7M15.5 8.5a5 5 0 010 7M5.5 5.5a9 9 0 000 13M18.5 5.5a9 9 0 010 13" strokeLinecap="round" />
        </svg>
      );
    case "map":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            d="M9 3L3 5v16l6-2 6 2 6-2V3l-6 2-6-2z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M9 3v16M15 5v16" strokeLinecap="round" />
        </svg>
      );
    case "alert":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            d="M12 9v4M12 17h.01M10.3 3.9L2.7 18a1.8 1.8 0 001.6 2.7h15.4a1.8 1.8 0 001.6-2.7L13.7 3.9a1.8 1.8 0 00-3.4 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function Features() {
  const [gridRef, gridVisible] = useScrollReveal();

  return (
    <section className="features">
      <div className="features-header">
        <h2 className="features-title">Everything In One Platform</h2>
        <p className="features-subtitle" id="scroll">
          Complete personal safety management from live tracking to instant
          emergency response.
        </p>
      </div>

      <div
        ref={gridRef}
        className={`features-grid reveal ${gridVisible ? "visible" : ""}`}
      >
        {featuresData.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{renderIcon(feature.icon)}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;