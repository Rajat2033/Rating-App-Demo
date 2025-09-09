import React, { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";
import "./addstore.css";

export default function AddStore() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post("/stores", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Store added successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to add store. Only admin can add stores.");
    }
  };

  return (
    <div className="add-store-page">
      <div className="form-container">
        <h2>Add New Store</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Store Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Store Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Owner ID"
            value={form.owner_id}
            onChange={(e) => setForm({ ...form, owner_id: e.target.value })}
            required
          />
          <button type="submit" className="btn">Add Store</button>
        </form>
      </div>
    </div>
  );
}
