const Recipe = require("../model/Recipe");

exports.saveRecipe = async (req, res) => {
  try {
    const { title, recipe, cartItems } = req.body;

    if (!title || !recipe) {
      return res.status(400).json({
        success: false,
        message: "Title and recipe are required.",
      });
    }

    const existingRecipe = await Recipe.findOne({ title });

    if (existingRecipe) {
      return res.status(409).json({
        success: false,
        message: "Recipe already exists.",
      });
    }

    const savedRecipe = await Recipe.create({
      title,
      recipe,
      cartItems,
    });

    return res.status(201).json({
      success: true,
      message: "Recipe saved successfully.",
      data: savedRecipe,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

exports.fetchRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: recipes,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
exports.fetchSingleRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};