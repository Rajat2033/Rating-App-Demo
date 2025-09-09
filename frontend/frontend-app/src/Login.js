import React, { useState } from "react";
import API from "./api";
import { useNavigate, Link } from "react-router-dom";
import "./login.css"; // ✅ Import CSS file

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      if (data.role === "ADMIN") navigate("/dashboard");
      else navigate("/stores");
    } catch (err) {
      alert("Login failed");
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

      {/* ✅ Login Form */}
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn">Login</button>
        </form>
        <p>
          Don’t have an account? <Link to="/">Signup here</Link>
        </p>
      </div>
    </div>
  );
}
