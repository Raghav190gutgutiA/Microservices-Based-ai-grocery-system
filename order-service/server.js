require("dotenv").config();
const app = require("./app");
const { connectRabbitMQ } = require("./broker/rabbit");
const {startConsumer}  = require("./broker/listener")
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5004;

const start = async () => {
  await connectDB();
  connectRabbitMQ();
  startConsumer()
  app.listen(PORT, () => {
    console.log(`Order service running on ${PORT}`);
  });
};

start();