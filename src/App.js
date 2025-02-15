import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Sample data for venues
const venues = [
  { name: "Fabric London", lat: 51.5194, lng: -0.1022, vibe: "🎵 Electric" },
  { name: "Jazz Café", lat: 51.5395, lng: -0.1433, vibe: "🎷 Smooth" },
  {
    name: "Ministry of Sound",
    lat: 51.4978,
    lng: -0.0991,
    vibe: "🔥 High Energy",
  },
];

// Sample data for friends' locations
const friends = [
  { name: "Alex", lat: 51.515, lng: -0.1, status: "At Fabric 🎶" },
  { name: "Jess", lat: 51.505, lng: -0.12, status: "Exploring Soho 🍸" },
];

export default function App() {
  const [feedback, setFeedback] = useState("");
  const [recentFeedback, setRecentFeedback] = useState([]);

  const handleSubmit = () => {
    if (feedback.trim() !== "") {
      setRecentFeedback([
        { text: feedback, time: new Date().toLocaleTimeString() },
        ...recentFeedback,
      ]);
      setFeedback("");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {/* Map */}
      <h2>📍 London Live Activity Map</h2>
      <MapContainer
        center={[51.509865, -0.118092]}
        zoom={12}
        style={{ height: "300px", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Venue Markers */}
        {venues.map((venue, idx) => (
          <Marker key={idx} position={[venue.lat, venue.lng]}>
            <Popup>
              <strong>{venue.name}</strong>
              <br />
              {venue.vibe}
            </Popup>
          </Marker>
        ))}

        {/* Friends' Locations */}
        {friends.map((friend, idx) => (
          <Marker key={idx} position={[friend.lat, friend.lng]}>
            <Popup>
              <strong>{friend.name}</strong>
              <br />
              {friend.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Live Feedback */}
      <h2>💬 Live Feedback</h2>
      <input
        type="text"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="How's the vibe?"
        style={{
          padding: "10px",
          width: "80%",
          marginRight: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px",
          cursor: "pointer",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        SUBMIT
      </button>

      {/* Recent Feedback */}
      <h3>📝 Recent Feedback</h3>
      {recentFeedback.length === 0 ? (
        <p>No feedback yet. Be the first!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {recentFeedback.map((item, idx) => (
            <li
              key={idx}
              style={{ padding: "5px", borderBottom: "1px solid #ddd" }}
            >
              {item.text} <small>({item.time})</small>
            </li>
          ))}
        </ul>
      )}

      {/* Trending Venues */}
      <h3>🔥 Trending Now</h3>
      {venues.map((venue, idx) => (
        <div
          key={idx}
          style={{
            padding: "10px",
            borderBottom: "1px solid #ddd",
            background: "#f9f9f9",
            borderRadius: "4px",
            marginBottom: "5px",
          }}
        >
          <strong>{venue.name}</strong>
          <br />
          {venue.vibe}
        </div>
      ))}

      {/* Friends' Activity */}
      <h3>🕺 Friends Out & About</h3>
      {friends.map((friend, idx) => (
        <div
          key={idx}
          style={{
            padding: "10px",
            borderBottom: "1px solid #ddd",
            background: "#e3f2fd",
            borderRadius: "4px",
            marginBottom: "5px",
          }}
        >
          <strong>{friend.name}</strong> - {friend.status}
        </div>
      ))}
    </div>
  );
}
