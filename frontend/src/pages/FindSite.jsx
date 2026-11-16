
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents
} from "react-leaflet";

import L from "leaflet";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function LocationPicker({ setLocation }) {
  useMapEvents({
    click(event) {
      setLocation({
        latitude: Number(event.latlng.lat.toFixed(6)),
        longitude: Number(event.latlng.lng.toFixed(6))
      });
    }
  });

  return null;
}

function FindSite({ setResult }) {
  const navigate = useNavigate();

  const [location, setLocation] = useState({
    latitude: 26.8467,
    longitude: 80.9462
  });

  const [rainfall, setRainfall] = useState("800");
  const [slope, setSlope] = useState("4");
  const [soil, setSoil] = useState("Clay Loam");
  const [landUse, setLandUse] = useState("Agricultural");
  const [drainage, setDrainage] = useState("Moderate");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkSite(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const siteData = {
      latitude: location.latitude,
      longitude: location.longitude,
      rainfall: Number(rainfall),
      slope: Number(slope),
      soil: soil,
      land_use: landUse,
      drainage: drainage
    };

    try {
      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(siteData)
        }
      );

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();

      setResult(data);
      navigate("/result");

    } catch (err) {
      setError(
        "Could not connect to the backend. Please check whether the backend server is running."
      );
    }

    setLoading(false);
  }

  return (
    <div className="page-content">
      <h2>Find a Suitable Site</h2>

      <p className="page-description">
        Select a location on the map and enter its details
        to check its rainwater harvesting suitability.
      </p>

      <div className="form-map-layout">

        <section className="panel">
          <h3>Select Location</h3>

          <MapContainer
            center={[26.8467, 80.9462]}
            zoom={10}
            className="map"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationPicker setLocation={setLocation} />

            <Marker
              position={[
                location.latitude,
                location.longitude
              ]}
              icon={markerIcon}
            />
          </MapContainer>

          <p className="hint">
            Click on the map to select a location.
          </p>

          <div className="coordinates">
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </div>
        </section>

        <section className="panel">
          <h3>Enter Site Details</h3>

          <form onSubmit={checkSite}>

            <label>Annual Rainfall (mm)</label>
            <input
              type="number"
              min="0"
              max="10000"
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
              required
            />

            <label>Slope (degrees)</label>
            <input
              type="number"
              min="0"
              max="90"
              step="0.1"
              value={slope}
              onChange={(e) => setSlope(e.target.value)}
              required
            />

            <label>Soil Type</label>
            <select
              value={soil}
              onChange={(e) => setSoil(e.target.value)}
            >
              <option>Sandy</option>
              <option>Loamy</option>
              <option>Clay</option>
              <option>Clay Loam</option>
              <option>Rocky</option>
            </select>

            <label>Land Use</label>
            <select
              value={landUse}
              onChange={(e) => setLandUse(e.target.value)}
            >
              <option>Agricultural</option>
              <option>Residential</option>
              <option>Forest</option>
              <option>Barren</option>
              <option>Water Body</option>
            </select>

            <label>Drainage Condition</label>
            <select
              value={drainage}
              onChange={(e) => setDrainage(e.target.value)}
            >
              <option>Poor</option>
              <option>Moderate</option>
              <option>Good</option>
            </select>

            <button type="submit" disabled={loading}>
              {loading ? "Checking..." : "Check Suitability"}
            </button>

          </form>

          {error && (
            <p className="error">{error}</p>
          )}
        </section>

      </div>
    </div>
  );
}

export default FindSite;
