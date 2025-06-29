import React from "react";
import "./LandingPage.css";
import homeRemedies from "../assets/home-remedies.png";
import medicalConditions from "../assets/medical-conditions.png";
import treatmentOptions from "../assets/treatment-options.png";
import healthyLiving from "../assets/healthy-living.png";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const redirectToAuth = () => {
    navigate("/login");
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>HealLink</h1>
        <button onClick={redirectToAuth} className="get-started-btn">
          Get Started
        </button>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h2>Your health, your way</h2>
          <p>
            Get the information you need to make decisions about your health.
            Find home remedies, medical information, and more.
          </p>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for health information"
              className="search-input"
            />
            <button className="search-btn" onClick={redirectToAuth}>
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="help-section">
        <h3>How can we help?</h3>
        <div className="help-cards">
          <div className="card">
            <img src={homeRemedies} alt="Home Remedies" />
            <h4>Home Remedies</h4>
            <p>Natural remedies for common ailments</p>
          </div>
          <div className="card">
            <img src={medicalConditions} alt="Medical Conditions" />
            <h4>Medical Conditions</h4>
            <p>In-depth information about symptoms, causes, and risk factors</p>
          </div>
          <div className="card">
            <img src={treatmentOptions} alt="Treatment Options" />
            <h4>Treatment Options</h4>
            <p>Explore different treatments and their effectiveness</p>
          </div>
          <div className="card">
            <img src={healthyLiving} alt="Healthy Living" />
            <h4>Healthy Living</h4>
            <p>Tips for staying healthy and preventing illness</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
