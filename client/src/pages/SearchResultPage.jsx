import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SearchResultPage.css";
import profileIcon from "../assets/profile-icon.png";
import favIcon from "../assets/fav-icon.png";

const extractYouTubeId = (url) => {
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : "";
};

function SearchResultPage() {
  const { disease } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");
  const [favMsg, setFavMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/remedies/${disease}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          setMsg("No data found for this disease.");
        }
      } catch (err) {
        setMsg("Server error.");
      }
    };

    fetchData();
  }, [disease]);

  const addToFavorites = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ disease }),
      });

      const result = await res.json();
      if (res.ok) {
        setFavMsg("✅ Added to favorites!");
      } else {
        setFavMsg(`⚠️ ${result.msg}`);
      }
    } catch (error) {
      setFavMsg("Server error while adding to favorites.");
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/home")}>
          HealLink
        </div>
        <div className="nav-icons">
          <img
            src={favIcon}
            alt="Favorites"
            className="icon"
            onClick={() => navigate("/favorites")}
          />
          <img
            src={profileIcon}
            alt="Profile"
            className="icon"
            onClick={() => navigate("/profile")}
          />
        </div>
      </nav>

      <div className="result-container">
        <h2>Search Results for: <span>"{disease}"</span></h2>
        <button onClick={addToFavorites} className="fav-btn">❤️ Add to Favorites</button>
        {favMsg && <p>{favMsg}</p>}
        {msg && <p className="error">{msg}</p>}

        {data && (
          <>
            <section>
              <h3>💊 Doctor-Recommended Medicines</h3>
              <ul>
                {data.medicines.map((med, i) => (
                  <li key={i}>
                    ✅ <strong>{med.name}</strong><br />
                    <span className="instruction">🕒 {med.instruction}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3>🌿 Home Remedies</h3>
              <ul>
                {data.remedies.map((rem, i) => (
                  <li key={i}>✅ {rem}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3>▶️ YouTube Videos</h3>
              <div className="video-grid">
                {data.youtubeLinks.map((link, i) => (
                  <iframe
                    key={i}
                    width="300"
                    height="180"
                    src={`https://www.youtube.com/embed/${extractYouTubeId(link)}`}
                    title={`YouTube video ${i + 1}`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchResultPage;
