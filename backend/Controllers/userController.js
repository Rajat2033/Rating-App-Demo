const pool = require("../db");

// GET /api/users - only admin
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name, email, role FROM users");
    res.json({ users: rows });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
