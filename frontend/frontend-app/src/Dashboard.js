import React, { useState, useEffect } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";
import AddStore from "./addstore.js";   
import "./dashboard.css";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);
  const navigate = useNavigate();

  // ---------------- Fetch Functions ----------------
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.users || []);
    } catch {
      alert("Failed to load users");
    }
  };

  const fetchStores = async () => {
    try {
      const res = await API.get("/stores"); // no token needed
      setStores(res.data.stores || []);
    } catch {
      alert("Failed to load stores");
    }
  };

  const fetchRatings = async () => {
    try {
      const token = localStorage.getItem("token"); // ADMIN token
      const res = await API.get("/ratings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRatings(res.data.ratings || []);
    } catch {
      alert("Failed to load ratings");
    }
  };

  // ---------------- Effect ----------------
  useEffect(() => {
    if (activeTab === "users") fetchUsers();
    if (activeTab === "stores") fetchStores();
    if (activeTab === "ratings") fetchRatings();
  }, [activeTab]);

  // ---------------- Logout ----------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActiveTab("users")}>User Details</li>
          <li onClick={() => setActiveTab("stores")}>Store Details</li>
          <li onClick={() => setActiveTab("addStore")}>Add Store</li>
          <li onClick={() => setActiveTab("ratings")}>Rating Details</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Users Table */}
        {activeTab === "users" && (
          <div>
            <h2>All Users</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Stores Table */}
        {activeTab === "stores" && (
          <div>
            <h2>All Stores</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.address}</td>
                    <td>{s.owner_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Store Form */}
        {activeTab === "addStore" && (
          <div>
            <AddStore onStoreAdded={fetchStores} />
          </div>
        )}

        {/* Ratings Table */}
        {activeTab === "ratings" && (
          <div>
            <h2>All Ratings (Admin Only)</h2>
            {ratings.length === 0 ? (
              <p>No ratings found</p>
            ) : (
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Store ID</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {ratings.map((r) => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>{r.user_id}</td>
                      <td>{r.store_id}</td>
                      <td>{r.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
