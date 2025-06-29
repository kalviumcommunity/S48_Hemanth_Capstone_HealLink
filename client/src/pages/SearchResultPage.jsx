import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SearchResultPage.css";

const extractYouTubeId = (url) => {
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : "";
};

function SearchResultPage() {
  const { disease } = useParams();
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");

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

  return (
    <div className="result-page">
      <h2>You searched for: <span>{disease}</span></h2>
      {msg && <p>{msg}</p>}

      {data && (
        <>
          <section>
            <h3>💊 Doctor-Recommended Medicines</h3>
            <ul>{data.medicines.map((med, i) => <li key={i}>✅ {med}</li>)}</ul>
          </section>

          <section>
            <h3>🌿 Home Remedies</h3>
            <ul>{data.remedies.map((rem, i) => <li key={i}>✅ {rem}</li>)}</ul>
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
  );
}

export default SearchResultPage;
