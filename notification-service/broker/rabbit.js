const amqp = require("amqplib");
require("dotenv").config();

let connection = null;
let channel = null;
let isConnecting = false;

const RABBIT_URL = process.env.RABBITMQ_URI;
const RECONNECT_DELAY = 5000;

async function connect() {
  if (channel || isConnecting) return channel;
  isConnecting = true;

  try {
    connection = await amqp.connect(`${RABBIT_URL}?heartbeat=60`);

    connection.on("error", (err) => {
      console.error("RabbitMQ connection error:", err.message);
    });

    connection.on("close", () => {
      console.error("RabbitMQ connection closed. Reconnecting...");
      channel = null;
      connection = null;
      isConnecting = false;
      setTimeout(connect, RECONNECT_DELAY);
    });

    channel = await connection.createChannel();

    channel.on("error", (err) => {
      console.error("RabbitMQ channel error:", err.message);
    });

    channel.on("close", () => {
      console.error("RabbitMQ channel closed");
      channel = null;
    });

    console.log("RabbitMQ connected");
    isConnecting = false;
    return channel;
  } catch (err) {
    console.error("RabbitMQ connection failed:", err.message);
    channel = null;
    connection = null;
    isConnecting = false;
    setTimeout(connect, RECONNECT_DELAY);
  }
}

async function publishToQueue(queueName, data) {
  const ch = await connect();
  if (!ch) return;

  await ch.assertQueue(queueName, { durable: true });

  ch.sendToQueue(
    queueName,
    Buffer.from(JSON.stringify(data)),
    { persistent: true }
  );
}

async function subscribeToQueue(queueName, callback) {
  const ch = await connect();
  if (!ch) return;

  await ch.assertQueue(queueName, { durable: true });

  ch.consume(queueName, async (msg) => {
    if (!msg) return;

    try {
      await callback(JSON.parse(msg.content.toString()));
      ch.ack(msg);
    } catch (err) {
      console.error("Queue processing error:", err.message);
      ch.nack(msg, false, false);
    }
  });
}

module.exports = {
  connect,
  publishToQueue,
  subscribeToQueue,
};
