const db = require("../db");

exports.submitRating = async (req, res) => {
  const { store_id, rating } = req.body;
  const user_id = req.user.id;

  try {
    await db.execute("INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating=?",
      [user_id, store_id, rating, rating]);
    res.json({ message: "Rating submitted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
