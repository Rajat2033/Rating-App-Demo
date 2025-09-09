const pool = require("../db");
const bcrypt = require("bcryptjs");

// GET /api/users - only admin (already exists)
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name, email, role FROM users");
    res.json({ users: rows });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// POST /api/users/addOwner - only admin can add store owner
exports.addOwner = async (req, res) => {
  const { name, email, password, address } = req.body;

  if (!name || !email || !password || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email already exists
    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new owner
    await pool.query(
      "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?,?, ?)",
      [name, email, hashedPassword,address, "OWNER"]
    );

    res.json({ message: "Store Owner added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add store owner" });
  }
};
