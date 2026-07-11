const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const productRoutes = require("./routes/productRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
// const cookieParser = require("cookie-parser");

const app = express();
// app.use(cookieParser());

// app.use(cors());
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Product Service Running");
});

app.use("/api/products", productRoutes);
app.use("/api/recipes",recipeRoutes)

module.exports = app;