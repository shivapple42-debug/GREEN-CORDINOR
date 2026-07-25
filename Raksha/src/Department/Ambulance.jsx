// src/pages/dashboard/Ambulence.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Siren, LogOut, Heart, Users, Clock, Stethoscope } from "lucide-react";
import useScrollReveal from "../Hooks/Scroll";
import '../App.css';

const statsData = [
  { icon: Heart, label: "Emergency Calls", value: "56", tone: "success" },
  { icon: Users, label: "Patients Today", value: "23", tone: "danger" },
  { icon: Clock, label: "Avg Arrival", value: "8.2m", tone: "info" },
  { icon: Stethoscope, label: "Success Rate", value: "97%", tone: "warning" },
];

const activityData = [
  { text: "Cardiac arrest - Sector 5", time: "15 min ago", icon: "🚑" },
  { text: "Accident response - Highway", time: "30 min ago", icon: "🩸" },
  { text: "Patient stabilized - Unit 7", time: "1 hour ago", icon: "✅" },
];

const fleetData = [
  { id: "Unit 01", driver: "R. Kumar", location: "Sector 5", status: "On Call" },
  { id: "Unit 03", driver: "A. Singh", location: "City Hospital", status: "Available" },
  { id: "Unit 05", driver: "M. Iyer", location: "Highway Route 9", status: "En Route" },
  { id: "Unit 07", driver: "P. Das", location: "Base Station", status: "Available" },
];

function AmbulanceDashboard({ user }) {
  const navigate = useNavigate();
  const [statsRef, statsVisible] = useScrollReveal();
  const [fleetRef, fleetVisible] = useScrollReveal();
  const [activityRef, activityVisible] = useScrollReveal();

  const handleLogout = () => {
    localStorage.removeItem("raksha_user");
    navigate("/login");
  };

  return (
    <div className="dashboard ambulance-dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <Siren size={36} className="dashboard-header-icon" />
          <div>
            <h1 className="dashboard-title">Ambulance Services</h1>
            <p className="dashboard-subtitle">Medical Emergency Response</p>
          </div>
        </div>

        <button className="dashboard-logout" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <div className="dashboard-welcome">
        <h2>Welcome, {user?.name || "Paramedic"}</h2>
        <p>
          You are logged in as Ambulance Department. Save lives with quick
          emergency response.
        </p>
      </div>

      <div
        ref={statsRef}
        className={`dashboard-stats reveal ${statsVisible ? "visible" : ""}`}
      >
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div className={`stat-tile stat-${stat.tone}`} key={index}>
              <Icon size={26} className="stat-icon" />
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div
        ref={fleetRef}
        className={`dashboard-panel reveal ${fleetVisible ? "visible" : ""}`}
      >
        <h3 className="dashboard-panel-title">Fleet Status</h3>
        <div className="cases-table">
          <div className="cases-row cases-row-head">
            <span>Unit</span>
            <span>Driver</span>
            <span>Location</span>
            <span>Status</span>
          </div>
          {fleetData.map((item, index) => (
            <div className="cases-row stations-row" key={index}>
              <span className="cases-id">{item.id}</span>
              <span>{item.driver}</span>
              <span className="cases-location">{item.location}</span>
              <span
                className={`cases-status status-${item.status.toLowerCase().replace(" ", "-")}`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={activityRef}
        className={`dashboard-panel reveal ${activityVisible ? "visible" : ""}`}
      >
        <h3 className="dashboard-panel-title">Recent Emergencies</h3>
        <ul className="activity-list">
          {activityData.map((item, index) => (
            <li className="activity-item" key={index}>
              <span>
                <span className="activity-emoji">{item.icon}</span>
                {item.text}
              </span>
              <span className="activity-time">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AmbulanceDashboard;
