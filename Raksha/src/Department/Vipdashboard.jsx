// src/pages/dashboard/Vipdashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Crown, LogOut, Star, Shield, Users, Award } from "lucide-react";
import useScrollReveal from "../Hooks/Scroll";
import '../App.css';

const statsData = [
  { icon: Star, label: "VIP Status", value: "Active", tone: "gold" },
  { icon: Shield, label: "Security Level", value: "Maximum", tone: "info" },
  { icon: Users, label: "Support Team", value: "24/7", tone: "success" },
  { icon: Award, label: "Services Used", value: "42", tone: "warning" },
];

const activityData = [
  { text: "VIP access granted to user", time: "5 min ago", icon: "👑" },
  { text: "Security briefing completed", time: "20 min ago", icon: "🛡️" },
  { text: "Priority report generated", time: "45 min ago", icon: "📊" },
];

const requestsData = [
  { id: "REQ-201", service: "Personal Escort", requestedBy: "A. Malhotra", status: "Approved" },
  { id: "REQ-202", service: "Route Clearance", requestedBy: "S. Kapoor", status: "Pending" },
  { id: "REQ-203", service: "Event Security", requestedBy: "V. Rao", status: "Approved" },
  { id: "REQ-204", service: "Priority Transport", requestedBy: "N. Sharma", status: "Pending" },
];

function VIPDashboard({ user }) {
  const navigate = useNavigate();
  const [statsRef, statsVisible] = useScrollReveal();
  const [requestsRef, requestsVisible] = useScrollReveal();
  const [activityRef, activityVisible] = useScrollReveal();

  const handleLogout = () => {
    localStorage.removeItem("raksha_user");
    navigate("/login");
  };

  return (
    <div className="dashboard vip-dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <Crown size={36} className="dashboard-header-icon" />
          <div>
            <h1 className="dashboard-title">VIP Section</h1>
            <p className="dashboard-subtitle">Priority Access Management</p>
          </div>
        </div>

        <button className="dashboard-logout" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <div className="dashboard-welcome">
        <h2>Welcome, {user?.name || "VIP"}</h2>
        <p>
          You have been granted priority access. Enjoy exclusive features
          and services.
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
        ref={requestsRef}
        className={`dashboard-panel reveal ${requestsVisible ? "visible" : ""}`}
      >
        <h3 className="dashboard-panel-title">Priority Requests</h3>
        <div className="cases-table">
          <div className="cases-row cases-row-head">
            <span>Request ID</span>
            <span>Service</span>
            <span>Requested By</span>
            <span>Status</span>
          </div>
          {requestsData.map((item, index) => (
            <div className="cases-row stations-row" key={index}>
              <span className="cases-id">{item.id}</span>
              <span>{item.service}</span>
              <span className="cases-location">{item.requestedBy}</span>
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
        <h3 className="dashboard-panel-title">Recent Activities</h3>
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

export default VIPDashboard;