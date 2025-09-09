const express = require("express");
const router = express.Router();
const { getAllUsers, addOwner } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// GET all users - admin only
router.get("/", authMiddleware(["ADMIN"]), getAllUsers);

// POST add store owner - admin only
router.post("/addOwner", authMiddleware(["ADMIN"]), addOwner);

module.exports = router;
