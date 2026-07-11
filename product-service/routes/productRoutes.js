const { createProduct, getProducts, getProductById, updateProduct, deleteProduct, getProductsByUserId, decreaseStock, increaseStock, searchProductsForRecipe } = require("../controllers/productController");
const upload = require("../middlewares/upload");
const { verifyToken, isAdmin } = require("../middlewares/userAuth");

const router = require("express").Router();


router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.array("images", 5),
  createProduct
);

router.put(
  "/increase-stock",
  increaseStock
);

router.get("/", getProducts);
router.put(
  "/decrease-stock",
  verifyToken,
  decreaseStock
);
router.get(
  "/my-products",
  verifyToken,
  isAdmin,
  getProductsByUserId
);

router.get("/:id", getProductById);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload.array("images", 5),
  updateProduct
);

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteProduct
);

router.post("/searchProductsForRecipe",searchProductsForRecipe)

module.exports = router;