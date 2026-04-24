import React from "react";
import { Link, useNavigate } from "react-router-dom";

 export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
    // ✅ clear token and userId
    localStorage.clear();

    // ✅ give user feedback
    alert("User logged out successfully");

    // ✅ redirect to login page
    navigate("/");
  };
  return (
    <nav style={{ padding: "10px", background: "#1976d2", color: "white" }}>
      <h2 style={{ display: "inline-block", marginRight: "20px" }}>Hotel Booking App</h2>
      <Link to="/hotels" style={{ marginRight: "15px", color: "white" }}>Hotels</Link>
      <Link to="/my-bookings" style={{ marginRight: "15px", color: "white" }}>My Bookings</Link>
      <button onClick={handleLogout} style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }}>Logout</button>
    </nav>
  );
}