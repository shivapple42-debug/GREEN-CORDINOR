import React from "react";
import useScrollReveal from "../Hooks/Scroll";
import '../App.css';

const valuesData = [
  {
    title: "Safety first",
    description: "Every feature we build starts with one question: does this make someone safer?",
  },
  {
    title: "Privacy respected",
    description: "Your location data is yours. We never sell it or share it beyond your circle.",
  },
  {
    title: "Always reliable",
    description: "Emergencies do not wait, so neither does our system. Built for uptime.",
  },
];

function About() {
  const [storyRef, storyVisible] = useScrollReveal();
  const [valuesRef, valuesVisible] = useScrollReveal();

  return (
    <section className="about-page">
      <div className="about-header">
        <div className="about-badge">
          <span className="badge-dot"></span>
          About Raksha
        </div>
        <h1 className="about-title">Safety Should Feel Effortless</h1>
        <p className="about-subtitle">
          Raksha was built with one goal — to make sure no one ever feels
          alone when they need help the most.
        </p>
      </div>

      <div
        ref={storyRef}
        className={`about-story reveal ${storyVisible ? "visible" : ""}`}
      >
        <p>
          Raksha started as a simple idea: what if getting help during an
          emergency took one tap instead of a panicked scramble to call
          multiple people?
        </p>
        <p>
          Today, Raksha connects families and friend circles through live
          location sharing, instant SOS alerts, and community-driven safety
          insights — built for the moments that matter most.
        </p>
      </div>

      <div
        ref={valuesRef}
        className={`about-values reveal ${valuesVisible ? "visible" : ""}`}
      >
        {valuesData.map((value, index) => (
          <div className="value-card" key={index}>
            <h3 className="value-title">{value.title}</h3>
            <p className="value-description">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
