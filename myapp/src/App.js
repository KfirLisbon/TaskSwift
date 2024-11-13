import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/pages/HomePage.js"; // Ensure .js extension
import NavBar from "./Components/navbar/NavBar.js"; // Ensure .js extension
import Pricing from "./Components/pages/pricing.js"; // Ensure .js extension
import Features from "./Components/pages/features.js"; // Ensure .js extension
import Chatbot from "./Components/chatbot/Chatbot.js"; // Ensure .js extension
import BackgroundVideo from "./Assets/Videos/BackgroundVideo.js"; // Ensure .js extension
import "./App.css";
import Profile from "./Components/profile/Profile.js"; // Ensure .js extension
import UserList from "./Components/profile/UserList.js"; // Ensure .js extension

function App() {
  const [username, setUsername] = useState("");

  return (
    <div className="app-container">
      <BackgroundVideo />
      <NavBar username={username} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/profile" element={<Profile />} /> {/* Add this line */}
        <Route path="/users" element={<UserList />} />{" "}
        {/* Add UserList route */}
      </Routes>

      <Chatbot />
    </div>
  );
}

export default App;
