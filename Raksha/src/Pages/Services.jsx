import '../App.css';
import React from "react";
import useScrollReveal from "../Hooks/Scroll";

const servicesData = [
  {
    title: "SOS Emergency Alert",
    description:
      "One tap sends your live location and a distress signal to your entire safety circle instantly.",
    points: ["Instant notification", "Live location attached", "Works offline via SMS fallback"],
  },
  {
    title: "Live Location Sharing",
    description:
      "Share your real-time location with chosen contacts for a set duration or continuously.",
    points: ["Custom sharing duration", "Multiple contacts at once", "Auto stop when you arrive"],
  },
  {
    title: "Safe Route Guidance",
    description:
      "Get route suggestions based on lighting, crowd data, and past incident reports in your area.",
    points: ["Well-lit path priority", "Avoids reported hotspots", "Turn-by-turn navigation"],
  },
  {
    title: "Community Incident Reports",
    description:
      "Report and view safety incidents shared by the community to stay aware of your surroundings.",
    points: ["Anonymous reporting", "Verified by moderators", "Localized alerts"],
  },
];

// separate row component so each row gets its own scroll-triggered reveal
function ServiceRow({ service, index }) {
  const [rowRef, isVisible] = useScrollReveal();

  return (
    <div
      ref={rowRef}
      className={`service-row reveal ${isVisible ? "visible" : ""}`}
    >
      <div className="service-number">{String(index + 1).padStart(2, "0")}</div>
      <div className="service-content">
        <h3 className="service-title">{service.title}</h3>
        <p className="service-description">{service.description}</p>
        <ul className="service-points">
          {service.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Services() {
  return (
    <section className="services-page">
      <div className="services-header">
        <div className="services-badge">
          <span className="badge-dot"></span>
          Our Services
        </div>
        <h1 className="services-title">Built For Every Safety Scenario</h1>
        <p className="services-subtitle">
          From daily commutes to emergencies, Raksha covers every situation
          where you need to feel protected.
        </p>
      </div>

      <div className="services-list">
        {servicesData.map((service, index) => (
          <ServiceRow service={service} index={index} key={index} />
        ))}
      </div>
    </section>
  );
}

export default Services;