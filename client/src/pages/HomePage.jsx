import React, { useState } from "react";
import "./HomePage.css";
import searchBg from "../assets/search-bg.jpg";
import profileIcon from "../assets/profile-icon.png";
import favIcon from "../assets/fav-icon.png";
import emptyFav from "../assets/empty-fav.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${query.toLowerCase()}`);
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/home")}>
          HealLink
        </div>
        <div className="nav-icons">
          <img src={favIcon} alt="Favorites" className="icon" />
          <img src={profileIcon} alt="Profile" className="icon" />
        </div>
      </nav>

      <section className="search-section">
        <img src={searchBg} alt="Search Background" className="search-bg" />
        <div className="search-overlay">
          <h2>How can we help?</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a condition or symptom"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </section>

      <section className="favorites-section">
        <h3>Your Favorites</h3>
        <div className="favorites-empty">
          <img src={emptyFav} alt="No favorites" />
          <p>No favorites added yet.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
