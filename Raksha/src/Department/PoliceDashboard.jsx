// src/pages/dashboard/PoliceDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Shield, LogOut, Users, AlertTriangle, Clock, Activity } from "lucide-react";
import useScrollReveal from "../Hooks/Scroll";
import '../App.css';

const statsData = [
  { icon: Users, label: "Active Officers", value: "128", tone: "neutral" },
  { icon: AlertTriangle, label: "Active Alerts", value: "7", tone: "danger" },
  { icon: Clock, label: "Avg Response", value: "4.2m", tone: "warning" },
  { icon: Activity, label: "Resolution Rate", value: "94%", tone: "success" },
];

const activityData = [
  { text: "New alert reported in Sector 7", time: "5 min ago", icon: "🚨" },
  { text: "Officer Patel logged in", time: "15 min ago", icon: "👮" },
  { text: "Daily report generated", time: "1 hour ago", icon: "📊" },
];

const casesData = [
  { id: "CASE-1042", type: "Theft", location: "Sector 7, MG Road", status: "In Progress", priority: "High" },
  { id: "CASE-1041", type: "Traffic Incident", location: "Ring Road Junction", status: "Assigned", priority: "Medium" },
  { id: "CASE-1039", type: "Noise Complaint", location: "Sector 12", status: "Resolved", priority: "Low" },
  { id: "CASE-1038", type: "Suspicious Activity", location: "Central Market", status: "In Progress", priority: "High" },
];

function PoliceDashboard({ user }) {
  const navigate = useNavigate();
  const [statsRef, statsVisible] = useScrollReveal();
  const [casesRef, casesVisible] = useScrollReveal();
  const [activityRef, activityVisible] = useScrollReveal();

  const handleLogout = () => {
    localStorage.removeItem("raksha_user");
    navigate("/login");
  };

  return (
    <div className="dashboard police-dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <Shield size={36} className="dashboard-header-icon" />
          <div>
            <h1 className="dashboard-title">Police Dashboard</h1>
            <p className="dashboard-subtitle">Law &amp; Security Management</p>
          </div>
        </div>

        <button className="dashboard-logout" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <div className="dashboard-welcome">
        <h2>Welcome, {user?.name || "Officer"}</h2>
        <p>
          You are logged in as Police Department. Monitor security alerts and
          manage operations here.
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
        ref={casesRef}
        className={`dashboard-panel reveal ${casesVisible ? "visible" : ""}`}
      >
        <h3 className="dashboard-panel-title">Active Cases</h3>
        <div className="cases-table">
          <div className="cases-row cases-row-head">
            <span>Case ID</span>
            <span>Type</span>
            <span>Location</span>
            <span>Status</span>
            <span>Priority</span>
          </div>
          {casesData.map((item, index) => (
            <div className="cases-row" key={index}>
              <span className="cases-id">{item.id}</span>
              <span>{item.type}</span>
              <span className="cases-location">{item.location}</span>
              <span className={`cases-status status-${item.status.toLowerCase().replace(" ", "-")}`}>
                {item.status}
              </span>
              <span className={`cases-priority priority-${item.priority.toLowerCase()}`}>
                {item.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={activityRef}
        className={`dashboard-panel reveal ${activityVisible ? "visible" : ""}`}
      >
        <h3 className="dashboard-panel-title">Recent Activity</h3>
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

export default PoliceDashboard;