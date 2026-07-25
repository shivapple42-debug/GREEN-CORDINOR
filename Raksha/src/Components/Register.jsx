import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Backend Server sathe connect nathi thai shakyu!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="text" name="department" placeholder="Department" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;