require("dotenv").config();
const express = require("express");

const startListener = require("./broker/listener");
const { connect } = require("./broker/rabbit");

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connect();
    startListener();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();
