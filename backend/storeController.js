const db = require("../db");

exports.getStores = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT s.id, s.name, s.address,
             IFNULL(AVG(r.rating), 0) as avgRating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addStore = async (req, res) => {
  const { name, email, address, owner_id } = req.body;
  try {
    await db.execute("INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
      [name, email, address, owner_id]);
    res.json({ message: "Store added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
