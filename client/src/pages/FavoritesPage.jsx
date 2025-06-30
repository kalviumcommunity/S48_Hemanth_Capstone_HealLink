import React, { useEffect, useState } from "react";
import "./FavoritesPage.css";
import { useNavigate } from "react-router-dom";
import profileIcon from "../assets/profile-icon.png";
import favIcon from "../assets/fav-icon.png";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavs = async () => {
      const res = await fetch("http://localhost:5000/api/favorites/all", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      const data = await res.json();
      setFavorites(data);
    };
    fetchFavs();
  }, []);

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/home")}>HealLink</div>
        <div className="nav-icons">
          <img src={favIcon} alt="Favorites" className="icon" />
          <img src={profileIcon} alt="Profile" className="icon" />
        </div>
      </nav>

      <section className="favorites-section">
        <h2>My Favorite Remedies</h2>
        {favorites.length === 0 ? (
          <p>No favorites added.</p>
        ) : (
          <ul>
            {favorites.map((fav, i) => (
              <li key={i} onClick={() => navigate(`/search/${fav.disease}`)}>
                🔍 {fav.disease}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default FavoritesPage;
