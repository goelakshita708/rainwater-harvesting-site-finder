
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-text">
          <h1>Save Rainwater, Secure Tomorrow</h1>

          <p>
            Rainwater Harvesting Site Finder helps identify
            potentially suitable locations for rainwater
            harvesting using basic geographical and
            environmental details.
          </p>

          <Link to="/find-site" className="main-button">
            Find a Suitable Site
          </Link>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800"
            alt="Rainwater and nature"
          />
        </div>
      </section>

      <section className="features">
        <h2>What does this project do?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Choose Location</h3>
            <p>
              Select a location using the interactive map.
            </p>
          </div>

          <div className="feature-card">
            <h3>Enter Site Details</h3>
            <p>
              Provide rainfall, slope, soil and drainage details.
            </p>
          </div>

          <div className="feature-card">
            <h3>Get Results</h3>
            <p>
              View a suitability score and suggested harvesting method.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
