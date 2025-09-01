import React, { useEffect, useState } from "react";
import API from "../api";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [rating, setRating] = useState({});

  useEffect(() => {
    API.get("/stores").then((res) => setStores(res.data));
  }, []);

  const handleRating = async (id) => {
    await API.post("/ratings", { store_id: id, rating: rating[id] });
    alert("Rating submitted");
  };

  return (
    <div>
      <h2>Stores</h2>
      {stores.map((s) => (
        <div key={s.id}>
          <h4>{s.name} ({s.avgRating})</h4>
          <input
            type="number"
            min="1"
            max="5"
            value={rating[s.id] || ""}
            onChange={(e) => setRating({ ...rating, [s.id]: e.target.value })}
          />
          <button onClick={() => handleRating(s.id)}>Submit Rating</button>
        </div>
      ))}
    </div>
  );
}
