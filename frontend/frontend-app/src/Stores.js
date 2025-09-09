import React, { useEffect, useState } from "react";
import API from "./api";
import "./stores.css";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [rating, setRating] = useState({});
  const [activeTab, setActiveTab] = useState("stores");

  const fetchStores = async () => {
    try {
      const res = await API.get("/stores"); // backend endpoint
      setStores(res.data.stores || res.data);
    } catch (err) {
      console.error("Failed to fetch stores:", err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleRating = async (storeId) => {
    if (!rating[storeId] || rating[storeId] < 1 || rating[storeId] > 5) {
      alert("Please enter a rating between 1 and 5");
      return;
    }

    try {
      await API.post("/ratings", {
        store_id: storeId,
        rating: Number(rating[storeId]),
      });
      alert("Rating submitted successfully!");
      setRating({ ...rating, [storeId]: "" }); // clear input
      fetchStores();
    } catch (err) {
      console.error("Failed to submit rating:", err);
      alert("Failed to submit rating");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect to login
  };

  return (
    <div className="stores-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>User Panel</h2>
        <ul>
          <li
            className={activeTab === "stores" ? "active" : ""}
            onClick={() => setActiveTab("stores")}
          >
            Submit Store Ratings
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeTab === "stores" && (
          <div className="store-cards-container">
            {stores.length === 0 && <p>No stores available</p>}
            {stores.map((s) => (
              <div className="store-card" key={s.id}>
                <h3>{s.name}</h3>
                <p><strong>Email:</strong> {s.email || "N/A"}</p>
                <p><strong>Address:</strong> {s.address || "N/A"}</p>
                <p><strong>Owner ID:</strong> {s.owner_id || "N/A"}</p>
                <p><strong>Average Rating:</strong> {s.avgRating || 0}</p>
                <div className="rating-section">
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating[s.id] || ""}
                    onChange={(e) =>
                      setRating({ ...rating, [s.id]: e.target.value })
                    }
                    placeholder="Rate 1-5"
                  />
                  <button onClick={() => handleRating(s.id)}>Submit</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
