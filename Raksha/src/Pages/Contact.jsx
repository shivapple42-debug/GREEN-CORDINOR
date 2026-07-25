import React, { useState } from "react";
import useScrollReveal from "../Hooks/Scroll";
import '../App.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [gridRef, gridVisible] = useScrollReveal();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("✅ Thank you for your message! We will contact you soon.");
    };

    return (
        <section className="contact-page">
            <div className="contact-header">
                <div className="contact-badge">
                    <span className="badge-dot"></span>
                    Get In Touch
                </div>
                <h1 className="contact-title">We're Here To Help</h1>
                <p className="contact-subtitle">
                    Questions, feedback, or partnership ideas — reach out and our team
                    will get back to you within 24 hours.
                </p>
            </div>

            <div
                ref={gridRef}
                className={`contact-grid reveal ${gridVisible ? "visible" : ""}`}
            >
                <form className="contact-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Full name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Tell us how we can help"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <button type="submit" className="contact-submit">
                        Send message
                    </button>
                </form>

                <div className="contact-info">
                    <div className="info-card">
                        <h3>Email us</h3>
                        <p>support@raksha.app</p>
                    </div>
                    <div className="info-card">
                        <h3>Call us</h3>
                        <p>+91 12345 67890</p>
                    </div>
                    <div className="info-card">
                        <h3>Office</h3>
                        <p>Surat, Gujarat, India</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;