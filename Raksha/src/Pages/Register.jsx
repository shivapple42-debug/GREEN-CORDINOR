import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Flame, Siren, Crown } from "lucide-react";
import useScrollReveal from "../Hooks/Scroll";
import "../App.css";


const DEPARTMENTS = [
  { id: "police", label: "Police", sub: "Law & security help", icon: ShieldCheck, color: "#3a7bd5" },
  { id: "fire", label: "Fire", sub: "Fire & rescue response", icon: Flame, color: "#e8492f" },
  { id: "ambulance", label: "Ambulance", sub: "Medical emergency", icon: Siren, color: "#3fb27f" },
  { id: "vip", label: "VIP Section", sub: "Priority access", icon: Crown, color: "#c99a3a" },
];

function Register() {
  const navigate = useNavigate();
  const [dept, setDept] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardRef, cardVisible] = useScrollReveal();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dept) {
      setError("Please select a department");
      return;
    }
    if (!formData.name.trim()) {
      setError("Full name is required");
      return;
    }
    if (!/^\d{10}$/.test(formData.phone.trim())) {
      setError("Enter a valid 10-digit phone number");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      setError("Enter a valid email address");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setError("");
      setLoading(true);


      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          password: formData.password,
          department: dept,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const active = DEPARTMENTS.find((d) => d.id === dept);

  return (
    <section className="auth-page">
      <div
        ref={cardRef}
        className={`auth-card auth-card--wide reveal ${cardVisible ? "visible" : ""}`}
        style={{ "--dept-color": active?.color }}
      >
        <div className="auth-logo">
          <span className="logo-dot"></span>
          <span className="logo-text">RAKSHA</span>
        </div>

        {submitted ? (
          <div className="auth-success">
            <h2 className="auth-success__title">Request submitted</h2>
            <p className="auth-success__text">
              Your registration for <strong style={{ color: active?.color }}>{active?.label}</strong> has
              been sent for admin review. You'll be able to log in once it's approved.
            </p>
            <p className="auth-switch">
              <Link to="/login" className="auth-link">Back to login</Link>
            </p>
          </div>
        ) : (
          <>
            <p className="auth-subtitle">Create an account to request department access</p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <span className="dept-label">Select department</span>
              <div className="dept-grid">
                {DEPARTMENTS.map((d) => {
                  const Icon = d.icon;
                  const isActive = dept === d.id;
                  return (
                    <button
                      type="button"
                      key={d.id}
                      className={`dept-card${isActive ? " is-active" : ""}`}
                      style={{ "--dept-color": d.color }}
                      onClick={() => setDept(d.id)}
                    >
                      <span className="dept-card__bar" />
                      <Icon size={18} className="dept-card__icon" />
                      <div className="dept-card__title">{d.label}</div>
                      <div className="dept-card__sub">{d.sub}</div>
                    </button>
                  );
                })}
              </div>

              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                placeholder="As per government ID"
                value={formData.name}
                onChange={handleChange}
              />

              <div className="auth-row">
                <div className="auth-form-group">
                  <label htmlFor="phone">Phone number</label>
                  <input
                    id="phone"
                    name="phone"
                    placeholder="10-digit mobile"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="auth-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
              />

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit for approval"}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default Register;