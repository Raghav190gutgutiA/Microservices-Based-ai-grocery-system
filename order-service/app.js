const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.CLIENT_URL
]
app.use(
  cors({
    origin: true,
    credentials: true,
  }));
app.use(cookieParser());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Order Service Running");
});

app.use("/api/orders", orderRoutes);

module.exports = app;