const mongoose = require("mongoose");
const Product = require("./model/Product");
const connectDB = require("./config/db");
require("dotenv").config();
const categories = {
  Dairy: [
    "Milk",
    "Paneer",
    "Butter",
    "Cheese",
    "Curd",
    "Ghee",
  ],
  Vegetables: [
    "Tomato",
    "Potato",
    "Onion",
    "Capsicum",
    "Carrot",
    "Cucumber",
  ],
  Fruits: [
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Grapes",
    "Papaya",
  ],
  Grocery: [
    "Rice",
    "Atta",
    "Sugar",
    "Salt",
    "Besan",
    "Poha",
  ],
  Snacks: [
    "Chips",
    "Namkeen",
    "Cookies",
    "Biscuits",
    "Popcorn",
  ],
  Beverages: [
    "Tea",
    "Coffee",
    "Juice",
    "Soft Drink",
    "Energy Drink",
  ],
};

const brands = [
  "Amul",
  "Mother Dairy",
  "Aashirvaad",
  "Fortune",
  "Nestle",
  "Britannia",
  "Parle",
  "Tata",
  "Patanjali",
  "Local",
];

const weights = [
  "100g",
  "200g",
  "250g",
  "500g",
  "1kg",
];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seedProducts() {
  try {
    await connectDB();

    console.log("MongoDB Connected");

    const products = [];

    for (let i = 0; i < 500; i++) {
      const categoryName =
        random(
          Object.keys(categories)
        );

      const productName =
        random(
          categories[categoryName]
        );

      const brand =
        random(brands);

      const weight =
        random(weights);

      products.push({
        name: `${brand} ${productName}`,

        price:
          Math.floor(
            Math.random() * 400
          ) + 20,

        stock:
          Math.floor(
            Math.random() * 100
          ) + 1,

        sold:
          Math.floor(
            Math.random() * 500
          ),

        brand,

        unit: "kg",

        weight,

        category: [
          categoryName,
        ],

        description: `${brand} ${productName} premium quality`,

        images: [
          {
            url:
              "https://placehold.co/600x600/png",
            public_id:
              "placeholder",
            isThumbnail: true,
          },
        ],

        ratings:
          (
            Math.random() * 5
          ).toFixed(1),

        numReviews:
          Math.floor(
            Math.random() * 500
          ),

        featured:
          Math.random() > 0.8,

        discountPercentage:
          Math.floor(
            Math.random() * 30
          ),

        userId:
          "",

        isActive: true,
      });
    }

    await Product.deleteMany({});

    await Product.insertMany(
      products
    );

    console.log(
      `${products.length} products inserted`
    );

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedProducts();