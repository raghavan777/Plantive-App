const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const { getAllSubmissions, verifySubmission } = require("../controllers/officialController");

router.get("/submissions", protect, getAllSubmissions);
router.put("/verify/:id", protect, verifySubmission);

module.exports = router;