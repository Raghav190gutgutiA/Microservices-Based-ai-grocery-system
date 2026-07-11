const router = require("express").Router();
const { fetchSingleRecipe, fetchRecipes, saveRecipe } = require("../controllers/recipeController");

router.get("/fetchRecipes", fetchRecipes);

router.get(
  "/fetchRecipe/:recipeId",
  fetchSingleRecipe
);

router.post(
  "/saveRecipe",
  saveRecipe
);
module.exports = router;