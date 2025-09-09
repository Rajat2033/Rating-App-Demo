const db = require("../db");

exports.submitRating = async (req, res) => {
  const { store_id, rating } = req.body;
  const user_id = req.user.id; // from auth middleware
  try {
    await db.execute(
      "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)",
      [user_id, store_id, rating]
    );
    res.json({ message: "Rating submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all ratings for admin
exports.getAllRatings = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, user_id, store_id, rating FROM ratings"
    );
    res.json({ ratings: rows });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ratings" });
  }
};
