import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext.jsx";
import SOSButton from "../components/SOSButton.jsx";
import MapView from "../components/MapView.jsx";
import ContactsManager from "../components/ContactsManager.jsx";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export default function Dashboard() {
  const { user, setUser, logout } = useAuth();
  const [position, setPosition] = useState(null);
  const [activeAlert, setActiveAlert] = useState(null);
  const [feed, setFeed] = useState([]);
  const socketRef = useRef(null);
  const watchIdRef = useRef(null);

  // Watch geolocation continuously
  useEffect(() => {
    if (!navigator.geolocation) return;
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.error("Geolocation error:", err.message),
      { enableHighAccuracy: true, maximumAge: 5000 }
    );
    return () => navigator.geolocation.clearWatch(watchIdRef.current);
  }, []);

  // Socket.io for live SOS feed / nearby alerts
  useEffect(() => {
    socketRef.current = io(SOCKET_URL);
    socketRef.current.on("sos:new", (payload) => {
      setFeed((prev) => [payload, ...prev].slice(0, 10));
    });
    return () => socketRef.current.disconnect();
  }, []);

  // While an alert is active, push location updates every 8s
  useEffect(() => {
    if (!activeAlert || !position) return;
    const interval = setInterval(() => {
      api.put(`/sos/${activeAlert._id}/location`, position).catch(() => {});
    }, 8000);
    return () => clearInterval(interval);
  }, [activeAlert, position]);

  const triggerSOS = async () => {
    if (!position) {
      alert("Waiting for your location — please allow location access.");
      return;
    }
    const res = await api.post("/sos/trigger", position);
    setActiveAlert(res.data.alert);
  };

  const resolveSOS = async () => {
    if (!activeAlert) return;
    await api.put(`/sos/${activeAlert._id}/resolve`, { status: "resolved" });
    setActiveAlert(null);
  };

  const updateContacts = (emergencyContacts) => {
    setUser({ ...user, emergencyContacts });
  };

  return (
    <div className="dashboard">
      <header className="topbar">
        <div className="brand-mark small">
          <span className="brand-dot" />
          RAKSHA
        </div>
        <div className="topbar-right">
          <span className="hello">Hi, {user?.name?.split(" ")[0]}</span>
          <button className="btn-ghost" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      <main className="dashboard-grid">
        <section className="map-panel">
          <MapView position={position} active={!!activeAlert} />
        </section>

        <section className="sos-panel">
          <SOSButton onTrigger={triggerSOS} active={!!activeAlert} />
          {activeAlert && (
            <button className="btn-secondary resolve-btn" onClick={resolveSOS}>
              I'm safe now — resolve alert
            </button>
          )}
        </section>

        <section className="side-panel">
          <ContactsManager contacts={user?.emergencyContacts || []} onUpdated={updateContacts} />

          <div className="panel">
            <h3 className="panel-title">Nearby activity</h3>
            <p className="panel-sub">Live SOS events from the community safety net.</p>
            <ul className="feed-list">
              {feed.length === 0 && <li className="contact-empty">No recent alerts nearby.</li>}
              {feed.map((f, i) => (
                <li key={i} className="feed-row">
                  <strong>{f.userName}</strong> triggered an SOS · {f.nearbyUserIds.length} nearby users notified
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
