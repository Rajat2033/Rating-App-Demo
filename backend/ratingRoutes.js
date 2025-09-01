const express = require("express");
const { submitRating } = require("../controllers/ratingController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", auth(["USER"]), submitRating);

module.exports = router;
