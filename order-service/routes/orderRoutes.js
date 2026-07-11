const router = require("express").Router();
const { createOrder, getOrders } = require("../controllers/orderController");
const { verifyToken } = require("../middlewares/authMiddleware");
// const { verifyToken } = require("../middleware/authMiddleware");

router.post("/create", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);

module.exports = router;