import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useScrollReveal from "../Hooks/Scroll";
import "../App.css";

const ADMIN_EMAIL = "admin@raksha.com";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardRef, cardVisible] = useScrollReveal();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();

    if (!email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (email === ADMIN_EMAIL && formData.password === "admin123") {
      localStorage.setItem(
        "raksha_user",
        JSON.stringify({ email: ADMIN_EMAIL, role: "admin" })
      );
      navigate("/admin");
      return;
    }

    try {
      setError("");
      setLoading(true);

const response = await fetch("http://localhost:5001/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password: formData.password }),
});
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("raksha_user", JSON.stringify(data.user));

      navigate(`/dashboard/${data.user.department}`);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div
        ref={cardRef}
        className={`auth-card reveal ${cardVisible ? "visible" : ""}`}
      >
        <div className="auth-logo">
          <span className="logo-dot"></span>
          <span className="logo-text">RAKSHA</span>
        </div>

        <p className="auth-subtitle">Welcome back. Sign in to stay protected.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register" className="auth-link">
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;