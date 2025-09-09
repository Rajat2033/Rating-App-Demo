const db = require("../db");

// GET all stores (for both users and admin)
exports.getStores = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, name, email, address, owner_id FROM stores"
    );
    res.json({ stores: rows });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "Failed to fetch stores" });
  }
};

// POST add store (only admin)
exports.addStore = async (req, res) => {
  const { name, email, address, owner_id } = req.body;
  try {
    await db.execute(
      "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
      [name, email, address, owner_id]
    );
    res.json({ message: "Store added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
