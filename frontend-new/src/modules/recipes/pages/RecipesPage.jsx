import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getRecipes } from "../../ai/api/recipeApi";
import RecipeCard from "../../ai/components/RecipeCard";
import CartCard from "../../ai/components/CartCard";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [openRecipeId, setOpenRecipeId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);

      const response = await getRecipes();
      setRecipes(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (id) => {
    setOpenRecipeId((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        Loading recipes...
      </div>
    );
  }

  if (!recipes.length) {
    return (
      <div className="flex items-center justify-center h-full">
        No recipes found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold text-green-700">
        Saved Recipes
      </h1>

      {recipes.map((item) => {
        const isOpen = openRecipeId === item._id;

        return (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow overflow-hidden"
          >
            <button
              onClick={() => handleToggle(item._id)}
              className="w-full flex items-center justify-between px-6 py-5"
            >
              <span className="font-semibold text-lg">
                {item.title}
              </span>

              {isOpen ? <ChevronUp /> : <ChevronDown />}
            </button>

            {isOpen && (
              <div className="border-t bg-gray-50 p-6 space-y-6">
                <RecipeCard recipe={item.recipe} />
                <CartCard cart={item.cartItems} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}