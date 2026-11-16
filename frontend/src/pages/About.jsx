
import React from "react";
import "./About.css";

function About() {
  const introduction = [
    {
      number: "01",
      title: "Water Conservation",
      description:
        "Rainwater harvesting is an effective way to conserve water by collecting and storing rainwater for future use."
    },
    {
      number: "02",
      title: "Why Location Matters",
      description:
        "Choosing the right location is important for collecting rainwater efficiently and making the best use of available resources."
    },
    {
      number: "03",
      title: "Environmental Analysis",
      description:
        "Our project considers rainfall, soil type, land slope, land use and drainage conditions to understand the suitability of an area."
    },
    {
      number: "04",
      title: "Suitability Assessment",
      description:
        "The system calculates a suitability score and classifies locations as highly suitable, moderately suitable or having low suitability."
    },
    {
      number: "05",
      title: "Smart Recommendations",
      description:
        "Based on the analysis, the application suggests suitable rainwater harvesting methods for the selected location."
    }
  ];

  const objectives = [
    {
      icon: "📍",
      title: "Location Selection",
      description: "Select a geographical location using an interactive map."
    },
    {
      icon: "🌱",
      title: "Site Analysis",
      description: "Understand the environmental factors affecting site suitability."
    },
    {
      icon: "💧",
      title: "Water Conservation",
      description: "Encourage better collection and management of rainwater."
    },
    {
      icon: "🏡",
      title: "Recommendations",
      description: "Identify suitable rainwater harvesting methods."
    }
  ];

  const steps = [
    "Select a location on the interactive map.",
    "Enter rainfall, slope, soil and other environmental details.",
    "The system analyses the provided information.",
    "A suitability score and category are generated.",
    "View the result and recommended harvesting method."
  ];

  return (
    <div className="page-content about-page">

      <div className="about-header">
        <span className="about-tag">ABOUT THE PROJECT</span>
        <h2>About Our Project</h2>
        <p>
          Discover how we use location-based analysis
          to support smarter rainwater harvesting.
        </p>
      </div>

      <section className="about-intro panel">
        <div className="about-section-heading">
          <span className="about-heading-icon">🌧️</span>
          <div>
            <h3>Introduction</h3>
            <p>Understanding the idea behind our project</p>
          </div>
        </div>

        <div className="intro-grid">
          {introduction.map((item) => (
            <div className="intro-card" key={item.number}>
              <span className="intro-number">
                {item.number}
              </span>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-section-heading">
          <span className="about-heading-icon">🎯</span>
          <div>
            <h3>Our Objectives</h3>
            <p>What we aim to achieve</p>
          </div>
        </div>

        <div className="objectives-grid">
          {objectives.map((item, index) => (
            <div className="objective-card" key={index}>
              <span className="objective-icon">
                {item.icon}
              </span>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel about-process">
        <div className="about-section-heading">
          <span className="about-heading-icon">⚙️</span>
          <div>
            <h3>How Our Project Works</h3>
            <p>A simple step-by-step process</p>
          </div>
        </div>

        <div className="process-list">
          {steps.map((step, index) => (
            <div className="process-item" key={index}>
              <span className="process-number">
                {index + 1}
              </span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-ending">
        <span className="ending-icon">💧</span>
        <h3>Every Drop Counts!</h3>
        <p>
          Our aim is to promote water conservation and
          encourage better use of rainwater through a
          simple location-based site selection tool.
        </p>
      </section>

    </div>
  );
}

export default About;
