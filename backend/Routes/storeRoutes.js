const express = require("express");
const {
  getStores,
  addStore,
  getOwnerStores,
  getOwnerRatings,
  addOwnerStore
} = require("../controllers/storeController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// GET all stores (any user or admin)
router.get("/", auth(["ADMIN", "USER"]), getStores);

// POST add store (only admin)
router.post("/", auth(["ADMIN"]), addStore);

// ---------------- Owner-specific ----------------

// GET stores of owner
router.get("/myStores", auth(["OWNER"]), getOwnerStores);

// GET ratings of owner's stores
router.get("/myRatings", auth(["OWNER"]), getOwnerRatings);

// POST add store by owner
router.post("/owner", auth(["OWNER"]), addOwnerStore);

module.exports = router;
