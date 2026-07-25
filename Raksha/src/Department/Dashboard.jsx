// src/pages/dashboard/DashboardRouter.jsx
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import PoliceDashboard from "./PoliceDashboard";
import FireDashboard from "./Firedashboard";
import AmbulanceDashboard from "./Ambulence";
import VIPDashboard from "./Vipdashboard";

function DashboardRouter() {
  const { department } = useParams();

  const user = JSON.parse(localStorage.getItem("raksha_user") || "null");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const normalizedDept = department?.toLowerCase();

  switch (normalizedDept) {
    case "police":
      return <PoliceDashboard user={user} />;
    case "fire":
      return <FireDashboard user={user} />;
    case "ambulance":
      return <AmbulanceDashboard user={user} />;
    case "vip":
      return <VIPDashboard user={user} />;
    default:
      return <Navigate to="/login" replace />;
  }
}

export default DashboardRouter;