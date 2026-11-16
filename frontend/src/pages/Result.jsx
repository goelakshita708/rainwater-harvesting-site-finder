
import React from "react";
import { Link } from "react-router-dom";

function Result({ result }) {
  if (!result) {
    return (
      <div className="page-content panel">
        <h2>No Analysis Available</h2>
        <p>Please enter site details first.</p>
        <Link to="/find-site" className="main-button">
          Find a Site
        </Link>
      </div>
    );
  }

  const maximumScores = {
    Rainfall: 30,
    Slope: 25,
    Soil: 20,
    "Land Use": 15,
    Drainage: 10
  };

  return (
    <div className="page-content">
      <h2>Analysis Result</h2>

      <p className="page-description">
        Here is the suitability analysis for your selected site.
      </p>

      <section className="panel result-panel">

        <div className="score-circle">
          <span>{result.score}</span>
          <small>out of 100</small>
        </div>

        <h2>{result.category}</h2>

        <p className="recommendation">
          Suggested Method: <strong>{result.recommendation}</strong>
        </p>

        <h3>Score Breakdown</h3>

        {Object.entries(result.score_breakdown).map(
          ([name, score]) => (
            <div className="score-row" key={name}>
              <div className="score-label">
                <span>{name}</span>
                <span>{score}/{maximumScores[name]}</span>
              </div>

              <div className="bar">
                <div
                  className="bar-fill"
                  style={{
                    width: `${(score / maximumScores[name]) * 100}%`
                  }}
                />
              </div>
            </div>
          )
        )}

        <p className="disclaimer">
          This result is based on manually entered information
          and a basic scoring system. It is a preliminary
          estimate and not a professional site assessment.
        </p>

        <Link to="/find-site" className="main-button">
          Check Another Site
        </Link>

      </section>
    </div>
  );
}

export default Result;
