const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

exports.signup = async (req, res) => {
  const { name, email, password, address } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await db.execute(
      "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashed, address, "USER"] // 👈 fixed role = USER
    );
    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows.length) return res.status(404).json({ message: "User not found" });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAdmin = async (req, res) => {
  const { name, email, password, address } = req.body;
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE role = 'ADMIN'");
    if (rows.length > 0) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.execute(
      "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashed, address, "ADMIN"] // 👈 role = ADMIN
    );
    res.json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
