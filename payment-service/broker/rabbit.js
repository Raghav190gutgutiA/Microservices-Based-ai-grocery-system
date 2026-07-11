const amqp = require("amqplib");

let channel;

exports.connectRabbitMQ = async () => {
  const conn = await amqp.connect(process.env.RABBITMQ_URI);
  channel = await conn.createChannel();
  console.log("RabbitMQ Connected");
};

exports.publishEvent = async (queue, data) => {
  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(
    queue,
    Buffer.from(JSON.stringify(data)),
    { persistent: true }
  );
};