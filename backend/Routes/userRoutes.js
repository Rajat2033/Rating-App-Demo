const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware(["ADMIN"]), getAllUsers);

module.exports = router;
