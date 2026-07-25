// src/pages/dashboard/Firedashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Flame, LogOut, AlertCircle, Clock, Truck, Droplets } from "lucide-react";
import useScrollReveal from "../Hooks/Scroll";
import '../App.css';

const statsData = [
  { icon: Truck, label: "Active Units", value: "12", tone: "fire" },
  { icon: AlertCircle, label: "Active Fires", value: "3", tone: "warning" },
  { icon: Droplets, label: "Water Supply", value: "87%", tone: "info" },
  { icon: Clock, label: "Avg Response", value: "6.8m", tone: "success" },
];

const activityData = [
  { text: "Fire reported in Building 42", time: "10 min ago", icon: "🔥" },
  { text: "Unit 3 dispatched to Sector 12", time: "25 min ago", icon: "🚒" },
  { text: "Fire contained in Market Area", time: "1 hour ago", icon: "✅" },
];

const stationsData = [
  { id: "Station 01", zone: "Central Zone", trucks: "4/4", status: "Ready" },
  { id: "Station 02", zone: "North Zone", trucks: "2/3", status: "Deployed" },
  { id: "Station 03", zone: "East Zone", trucks: "3/3", status: "Ready" },
  { id: "Station 04", zone: "South Zone", trucks: "1/3", status: "Deployed" },
];

function FireDashboard({ user }) {
  const navigate = useNavigate();
  const [statsRef, statsVisible] = useScrollReveal();
  const [stationsRef, stationsVisible] = useScrollReveal();
  const [activityRef, activityVisible] = useScrollReveal();

  const handleLogout = () => {
    localStorage.removeItem("raksha_user");
    navigate("/login");
  };

  return (
    <div className="dashboard fire-dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <Flame size={36} className="dashboard-header-icon" />
          <div>
            <h1 className="dashboard-title">Fire Department</h1>
            <p className="dashboard-subtitle">Fire &amp; Rescue Management</p>
          </div>
        </div>

        <button className="dashboard-logout" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <div className="dashboard-welcome">
        <h2>Welcome, {user?.name || "Firefighter"}</h2>
        <p>
          You are logged in as Fire Department. Monitor emergencies and
          rescue operations here.
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
        ref={stationsRef}
        className={`dashboard-panel reveal ${stationsVisible ? "visible" : ""}`}
      >
        <h3 className="dashboard-panel-title">Station Status</h3>
        <div className="cases-table">
          <div className="cases-row cases-row-head">
            <span>Station</span>
            <span>Zone</span>
            <span>Trucks Available</span>
            <span>Status</span>
          </div>
          {stationsData.map((item, index) => (
            <div className="cases-row stations-row" key={index}>
              <span className="cases-id">{item.id}</span>
              <span>{item.zone}</span>
              <span className="cases-location">{item.trucks}</span>
              <span
                className={`cases-status status-${item.status.toLowerCase()}`}
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
        <h3 className="dashboard-panel-title">Recent Incidents</h3>
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

export default FireDashboard;