const express = require("express");
const { getStores, addStore } = require("../controllers/storeController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getStores);
router.post("/", auth(["ADMIN"]), addStore);

module.exports = router;
