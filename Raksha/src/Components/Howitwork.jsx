import React from "react";
import useScrollReveal from "../Hooks/Scroll";
import '../App.css';

const stepsData = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Sign up in under a minute with your name, email, and phone number.",
  },
  {
    number: "02",
    title: "Add your safety circle",
    description:
      "Invite family and friends who should be notified during an emergency.",
  },
  {
    number: "03",
    title: "Enable live tracking",
    description:
      "Turn on location sharing so your circle always knows where you are.",
  },
  {
    number: "04",
    title: "Trigger SOS when needed",
    description:
      "One tap alerts your circle with your live location and situation.",
  },
];

function HowItWorks() {
  const [stepsRef, stepsVisible] = useScrollReveal();

  return (
    <section className="how-it-works">
      <div className="how-it-works-header">
        <h2 className="how-it-works-title">How Raksha Works</h2>
        <p className="how-it-works-subtitle">
          Get protected in four simple steps.
        </p>
      </div>

      <div
        ref={stepsRef}
        className={`steps-container reveal ${stepsVisible ? "visible" : ""}`}
      >
        {stepsData.map((step, index) => (
          <div className="step-card" key={index}>
            <span className="step-number">{step.number}</span>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
            {index < stepsData.length - 1 && <span className="step-connector"></span>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;