import React, { useEffect, useState } from "react";
import API from "./api";
import AddStore from "./addstore"; // Reuse your AddStore component
import "./dashboard.css";

export default function OwnerDashboard() {
    const [activeTab, setActiveTab] = useState("stores");
    const [stores, setStores] = useState([]);
    const [ratings, setRatings] = useState([]);

    const token = localStorage.getItem("token");

    // Fetch stores added by owner
    // Fetch stores added by owner
    const fetchOwnerStores = async () => {
        try {
            const res = await API.get("/stores/myStores", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStores(res.data.stores || []);
        } catch (err) {
            console.error("Failed to fetch owner stores:", err);
            setStores([]);
        }
    };

    // Fetch ratings for owner's stores
    const fetchStoreRatings = async () => {
        try {
            const res = await API.get("/stores/myRatings", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRatings(res.data.ratings || []);
        } catch (err) {
            console.error("Failed to fetch store ratings:", err);
            setRatings([]);
        }
    };

    useEffect(() => {
        if (activeTab === "stores") fetchOwnerStores();
        if (activeTab === "ratings") fetchStoreRatings();
    }, [activeTab]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Owner Panel</h2>
                <ul>
                    <li
                        className={activeTab === "stores" ? "active" : ""}
                        onClick={() => setActiveTab("stores")}
                    >
                        My Stores
                    </li>
                    <li
                        className={activeTab === "addStore" ? "active" : ""}
                        onClick={() => setActiveTab("addStore")}
                    >
                        Add Store
                    </li>
                    <li
                        className={activeTab === "ratings" ? "active" : ""}
                        onClick={() => setActiveTab("ratings")}
                    >
                        Store Ratings
                    </li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="content">
                {/* My Stores */}
                {activeTab === "stores" && (
                    <div>
                        <h2>My Stores</h2>
                        {stores.length === 0 ? (
                            <p>No stores yet</p>
                        ) : (
                            stores.map((s) => (
                                <div
                                    key={s.id}
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        marginBottom: "10px",
                                        borderRadius: "8px",
                                        backgroundColor: "#f5f6fa",
                                    }}
                                >
                                    <h3>{s.name}</h3>
                                    <p>Email: {s.email}</p>
                                    <p>Address: {s.address}</p>
                                    <p>Average Rating: {parseFloat(s.avgRating || 0).toFixed(2)}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Add Store */}
                {activeTab === "addStore" && <AddStore onStoreAdded={fetchOwnerStores} />}

                {/* Store Ratings */}
                {activeTab === "ratings" && (
                    <div>
                        <h2>Store Ratings</h2>
                        {ratings.length === 0 ? (
                            <p>No ratings yet</p>
                        ) : (
                            <table className="styled-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Store</th>
                                        <th>User</th>
                                        <th>Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ratings.map((r) => (
                                        <tr key={r.id}>
                                            <td>{r.id}</td>
                                            <td>{r.store_name}</td>
                                            <td>{r.user_id}</td>
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
