const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const { upload, createSubmission, getMySubmissions } = require("../controllers/farmerController");

router.post("/submit", protect, upload, createSubmission);
router.get("/my-submissions", protect, getMySubmissions);

module.exports = router;