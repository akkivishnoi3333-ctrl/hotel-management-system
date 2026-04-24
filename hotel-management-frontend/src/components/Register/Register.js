
import React, { useState } from "react";
import API from "../../utils/api"; 
import "../../App.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const { data } = await API.post("/auth/register", { name, email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data._id);
      alert("Registration successful!");
      navigate("/hotels");
    } catch (err) {
      alert("Error registering user: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <p>
          Already have an account? <a href="/">Login here</a>
        </p>
      </div>
    </div>
  );
}
