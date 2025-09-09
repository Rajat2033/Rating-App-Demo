const express = require("express");
const { signup, login, createAdmin } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);       // Normal user signup
router.post("/login", login);         // Login
router.post("/create-admin", createAdmin); 

module.exports = router;
