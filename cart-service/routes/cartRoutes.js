const router = require("express").Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity
} = require("../controllers/cartController");
const { verifyToken } = require("../middleware/authMiddleware");

// const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.post("/remove", verifyToken, removeFromCart);
router.post("/clear", verifyToken, clearCart);
router.put("/update-quantity", verifyToken, updateQuantity);
module.exports = router;