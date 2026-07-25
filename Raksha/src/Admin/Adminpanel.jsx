import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Flame, Siren, Crown, Check, X } from "lucide-react";
import "../App.css";

const DEPT_META = {
  police: { label: "Police", icon: ShieldCheck, color: "#3a7bd5" },
  fire: { label: "Fire", icon: Flame, color: "#e8492f" },
  ambulance: { label: "Ambulance", icon: Siren, color: "#3fb27f" },
  vip: { label: "VIP Section", icon: Crown, color: "#c99a3a" },
};

function Admin() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(true);

  // MongoDB Fatch Requests API Call
  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/auth/admin/requests");
      const data = await response.json();
      if (response.ok) {
        setRequests(data);
      }
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Superadmin
  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5001/api/auth/admin/update-status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status, isApproved: status === "approved" } : r))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const visible = requests.filter((r) => (filter === "all" ? true : r.status === filter));
  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <section className="admin-page">
      <div className="admin-shell">
        <div className="admin-header">
          <div className="auth-logo">
            <span className="logo-dot"></span>
            <span className="logo-text">RAKSHA</span>
          </div>
          <button className="auth-link admin-logout" onClick={() => navigate("/login")}>
            Log out
          </button>
        </div>

        <p className="auth-subtitle">
          Admin panel — {pendingCount} request{pendingCount === 1 ? "" : "s"} awaiting review
        </p>

        <div className="admin-tabs">
          {["pending", "approved", "rejected", "all"].map((f) => (
            <button
              key={f}
              className={`admin-tab${filter === f ? " is-active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="admin-list">
          {loading ? (
            <p className="auth-subtitle">Loading requests...</p>
          ) : visible.length === 0 ? (
            <p className="auth-subtitle" style={{ marginTop: 20 }}>No requests here yet.</p>
          ) : (
            visible.map((r) => {
              const meta = DEPT_META[r.department] || {};
              const Icon = meta.icon;
              return (
                <div className="request-card" key={r._id} style={{ "--dept-color": meta.color }}>
                  <span className="request-card__bar" />
                  <div className="request-card__main">
                    {Icon && <Icon size={20} className="request-card__icon" />}
                    <div>
                      <div className="request-card__name">{r.name}</div>
                      <div className="request-card__meta">
                        {meta.label} · {r.email} · {r.phone}
                      </div>
                      {}
                      <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
                        Password: <strong>{r.password}</strong>
                      </div>
                    </div>
                  </div>

                  {r.status === "pending" ? (
                    <div className="request-card__actions">
                      <button className="icon-btn icon-btn--approve" onClick={() => updateStatus(r._id, "approved")}>
                        <Check size={16} /> Approve
                      </button>
                      <button className="icon-btn icon-btn--reject" onClick={() => updateStatus(r._id, "rejected")}>
                        <X size={16} /> Reject
                      </button>
                    </div>
                  ) : (
                    <span className={`status-badge status-badge--${r.status}`}>{r.status}</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default Admin;
