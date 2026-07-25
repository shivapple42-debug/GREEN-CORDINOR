import React from "react";
import useScrollReveal from "../Hooks/Scroll";
import '../App.css';


const testimonialsData = [
  {
    quote:
      "I feel so much safer walking home late from work now. My family gets a live update the moment I start moving.",
    name: "Priya Sharma",
    role: "College Student",
  },
  {
    quote:
      "The SOS button saved us during a scary situation. Help was on the way within minutes of the alert going out.",
    name: "Rohan Mehta",
    role: "Working Professional",
  },
  {
    quote:
      "As a parent, knowing I can track my daughter's location and get instant alerts gives me real peace of mind.",
    name: "Anita Verma",
    role: "Parent",
  },
];

function Testimonials() {
  const [gridRef, gridVisible] = useScrollReveal();

  return (
    <section className="testimonials">
      <div className="testimonials-header">
        <h2 className="testimonials-title">Trusted By Thousands</h2>
        <p className="testimonials-subtitle">
          Real stories from people who use Raksha every day.
        </p>
      </div>

      <div
        ref={gridRef}
        className={`testimonials-grid reveal ${gridVisible ? "visible" : ""}`}
      >
        {testimonialsData.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <p className="testimonial-quote">"{item.quote}"</p>
            <div className="testimonial-author">
              <div className="author-avatar">{item.name.charAt(0)}</div>
              <div>
                <p className="author-name">{item.name}</p>
                <p className="author-role">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;