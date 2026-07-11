import axios from "axios";

const recipeApi = axios.create({
  baseURL:
    "https://ai-grocery-product-service.onrender.com/api/recipes",

  withCredentials: true,
});

export const getRecipes =
  async () => {
    const response =
      await recipeApi.get("/fetchRecipes");

    return response.data;
  };

export const getRecipe =
  async (recipeId) => {
    const response =
      await recipeApi.get(
        `/fetchRecipe/${recipeId}`
      );

    return response.data;
  };

export const saveRecipe =
  async (data) => {
    const response =
      await recipeApi.post(
        "/saveRecipe",
        data
      );

    return response.data;
  };

export default recipeApi;