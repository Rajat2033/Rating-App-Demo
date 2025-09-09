const express = require("express");
const { getStores, addStore } = require("../controllers/storeController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// GET all stores (anyone can see)
router.get("/",auth(["ADMIN",  "USER"]), getStores);

// POST add store (only admin)
router.post("/", auth(["ADMIN"]), addStore);

module.exports = router;
