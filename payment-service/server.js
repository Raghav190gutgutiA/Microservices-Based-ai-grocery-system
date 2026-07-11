require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const { connectRabbitMQ } = require("./broker/rabbit");

const PORT = process.env.PORT || 5005;

const start = async () => {
  await connectDB();
  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`Payment service running on ${PORT}`);
  });
};

start();