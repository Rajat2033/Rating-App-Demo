const db = require("../db");

// GET all stores (for both users and admin)
exports.getStores = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        s.id, 
        s.name, 
        s.email, 
        s.address, 
        s.owner_id,
        IFNULL(AVG(r.rating), 0) AS avgRating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
    `);
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

// ---------------- Owner-specific ----------------

// GET stores owned by owner
exports.getOwnerStores = async (req, res) => {
  try {
    const ownerId = req.user.id; // decoded from token in auth middleware
    const [rows] = await db.execute(
      "SELECT s.id, s.name, s.email, s.address, s.owner_id, AVG(r.rating) as avgRating " +
      "FROM stores s LEFT JOIN ratings r ON s.id = r.store_id " +
      "WHERE s.owner_id = ? GROUP BY s.id",
      [ownerId]
    );
    res.json({ stores: rows });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "Failed to fetch owner stores" });
  }
};


// GET ratings for stores owned by this owner
exports.getOwnerRatings = async (req, res) => {
  const ownerId = req.user.id;
  try {
    const [rows] = await db.execute(
      `SELECT r.id, r.user_id, r.store_id, r.rating 
       FROM ratings r
       JOIN stores s ON r.store_id = s.id
       WHERE s.owner_id = ?`,
      [ownerId]
    );
    res.json({ ratings: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch ratings for owner's stores" });
  }
};

// POST add store (owner adds their own store)
exports.addOwnerStore = async (req, res) => {
  const ownerId = req.user.id;
  const { name, email, address } = req.body;

  if (!name || !email || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db.execute(
      "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
      [name, email, address, ownerId]
    );
    res.json({ message: "Store added successfully by owner" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add store" });
  }
};
