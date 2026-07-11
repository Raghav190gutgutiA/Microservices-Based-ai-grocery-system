import React, { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

function RecipeCard({ recipe, menuOptions = [] }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 relative">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-green-700">
          {recipe.name}
        </h2>

        {menuOptions.length > 0 && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <MoreVertical size={18} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border z-10">
                {menuOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      option.onClick(recipe);
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 p-3 rounded-xl">
          <p className="text-sm text-gray-500">
            Servings
          </p>

          <p className="font-semibold">
            {recipe.servings}
          </p>
        </div>

        <div className="bg-green-50 p-3 rounded-xl">
          <p className="text-sm text-gray-500">
            Cooking Time
          </p>

          <p className="font-semibold">
            {recipe.cookingTime}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-lg mb-3">
          Ingredients
        </h3>

        <ul className="space-y-2">
          {recipe.ingredients?.map((item, index) => (
            <li
              key={index}
              className="flex justify-between bg-gray-50 p-3 rounded-lg"
            >
              <span>{item.name}</span>

              <span className="font-medium">
                {item.quantity} {item.unit}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-3">
          Instructions
        </h3>

        <ol className="space-y-3">
          {recipe.steps?.map((step, index) => (
            <li
              key={index}
              className="flex gap-3"
            >
              <span className="bg-green-600 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">
                {index + 1}
              </span>

              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default RecipeCard;