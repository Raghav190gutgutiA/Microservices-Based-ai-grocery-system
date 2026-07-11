const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.CLIENT_URL
];
app.use(
  cors({
    origin: true,
    credentials: true,
  }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Payment Service Running");
});

app.use("/api/payment", paymentRoutes);

module.exports = app;