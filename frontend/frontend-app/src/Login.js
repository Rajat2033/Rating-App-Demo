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
      const res = await API.post("/auth/login", { email, password });
      const { token, role } = res.data;

      // Save token to localStorage
      localStorage.setItem("token", token);

      // Redirect based on role
      if (role === "ADMIN") {
        navigate("/dashboard");
      } else if (role === "OWNER") {
        navigate("/owner-dashboard");
      } else if (role === "USER") {
        navigate("/stores");
      } else {
        alert("Unknown role");
      }
    } catch (err) {
      console.error(err);
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
