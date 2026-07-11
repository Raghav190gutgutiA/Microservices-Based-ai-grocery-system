const router = require("express").Router();
const { createPayment, verifyPayment } = require("../controllers/paymentController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/create", verifyToken, createPayment);
router.post("/verify", verifyToken, verifyPayment);

module.exports = router;