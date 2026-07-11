const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(
    "Cart Service Running"
  );
});

app.use(
  "/api/cart",
  cartRoutes
);

module.exports = app;