const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    recipe: {
      type: Object,
      required: true,
    },

    cartItems: [
      {
        ingredient: {
          type: String,
          required: true,
        },

        requiredQuantity: {
          type: Number,
          required: true,
        },

        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        productName: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        discountPercentage: {
          type: Number,
          default: 0,
        },

        image: {
          type: String,
        },

        weight: {
          type: String,
        },

        quantity: {
          type: Number,
          default: 1,
        },

        userId: {
          type: String,
          default: null,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Recipe",
  recipeSchema
);