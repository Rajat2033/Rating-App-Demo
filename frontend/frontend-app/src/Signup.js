import React, { useState } from "react";
import API from "./api";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css"; 

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      alert("Signup success, please login");
      navigate("/login"); // redirect to login
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div>
      {/* ✅ Navigation Bar */}
      <nav className="navbar">
        <div className="logo">MyStore</div>
        <ul className="nav-links">
          <li><Link to="/">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>

      {/* ✅ Signup Form */}
      <div className="form-container">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" className="btn">Signup</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
