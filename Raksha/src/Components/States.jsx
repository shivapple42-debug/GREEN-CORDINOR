import React from "react";
import useScrollReveal from "../Hooks/Scroll";
import "../App.css";

const statsData = [
  { number: "24/7", label: "Active Monitoring" },
  { number: "20K+", label: "Protected Users" },
  { number: "3", label: "Emergency Contacts" },
  { number: "60s", label: "Avg Response Time" },
];

function Stats() {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section className="stats">
      <div
        ref={sectionRef}
        className={`stats-grid reveal ${isVisible ? "visible" : ""}`}
      >
        {statsData.map((stat, index) => (
          <div className="stat-card" key={index}>
            <h3 className="stat-number">{stat.number}</h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;