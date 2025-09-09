const express = require("express");
const { submitRating, getAllRatings } = require("../controllers/ratingController");
const auth = require("../middleware/authMiddleware"); // make sure this exports a function
const router = express.Router();

// POST: submit rating (USER only)
router.post("/", auth(["USER"]), submitRating);

// GET: get all ratings (ADMIN only)
router.get("/", auth(["ADMIN"]), getAllRatings);

module.exports = router;
