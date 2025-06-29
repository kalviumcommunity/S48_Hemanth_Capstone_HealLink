import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div style={{ width: "100vw", overflowX: "hidden" }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<h2>Login Page</h2>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
