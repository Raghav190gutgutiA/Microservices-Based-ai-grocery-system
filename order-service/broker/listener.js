require("dotenv").config();

const amqp = require("amqplib");
const Order = require("../model/Order");
const {
  increaseStock,
} = require("../services/inventoryService");

const SYSTEM_SEED_USER_ID =
  process.env.SYSTEM_SEED_USER_ID;

const startConsumer = async () => {
  try {
    const connection = await amqp.connect(
      process.env.RABBITMQ_URI
    );

    const channel =
      await connection.createChannel();

    await channel.assertQueue(
      "payment_events",
      {
        durable: true,
      }
    );

    await channel.assertQueue(
      "earning_events",
      {
        durable: true,
      }
    );

    console.log(
      "Listening to payment_events queue..."
    );

    channel.consume(
      "payment_events",
      async (msg) => {
        if (!msg) return;

        try {
          console.log(
            "Received payment event:",
            msg.content.toString()
          );

          const data = JSON.parse(
            msg.content.toString()
          );

          const order =
            await Order.findById(
              data.orderId
            );

          if (!order) {
            console.log(
              "Order not found"
            );
            channel.ack(msg);
            return;
          }

          if (
            data.type ===
            "PAYMENT_SUCCESS"
          ) {
            console.log(
              "PAYMENT_SUCCESS received"
            );

            order.paymentStatus =
              "PAID";
            order.status = "PAID";

            await order.save();

            console.log(
              "Sending earning events..."
            );

            for (const item of order.items) {
              const sellerId =
                String(
                  item.sellerId
                ) === "SYSTEM_SEED"
                  ? SYSTEM_SEED_USER_ID
                  : item.sellerId;

              const payload = {
                type:
                  "ADD_EARNING",
                sellerId,
                customerId:
                  order.userId,
                orderId:
                  order._id,
                productId:
                  item.productId,
                name:
                  item.name,
                image:
                  item.image,
                quantity:
                  item.quantity,
                price:
                  item.price,
                totalAmount:
                  item.totalAmount,
                paymentStatus:
                  order.paymentStatus,
                orderStatus:
                  order.status,
                shippingAddress:
                  order.shippingAddress,
                orderedAt:
                  order.createdAt,
              };

              console.log(
                "Publishing payload:",
                payload
              );

              const sent =
                channel.sendToQueue(
                  "earning_events",
                  Buffer.from(
                    JSON.stringify(
                      payload
                    )
                  ),
                  {
                    persistent: true,
                  }
                );

              console.log(
                "sendToQueue:",
                sent
              );
            }

            console.log(
              `Order ${order._id} marked as PAID`
            );
          }

          if (
            data.type ===
            "PAYMENT_FAILED"
          ) {
            if (
              order.status !==
              "CANCELLED"
            ) {
              for (const item of order.items) {
                await increaseStock(
                  item.productId,
                  item.quantity
                );
              }

              order.paymentStatus =
                "FAILED";
              order.status =
                "CANCELLED";

              await order.save();

              console.log(
                `Order ${order._id} cancelled`
              );
            }
          }

          if (
            data.type ===
            "PAYMENT_CANCELLED"
          ) {
            if (
              order.status !==
              "CANCELLED"
            ) {
              for (const item of order.items) {
                await increaseStock(
                  item.productId,
                  item.quantity
                );
              }

              order.paymentStatus =
                "FAILED";
              order.status =
                "CANCELLED";

              await order.save();

              console.log(
                `Order ${order._id} payment cancelled`
              );
            }
          }

          channel.ack(msg);
        } catch (err) {
          console.error(
            "Consumer Error:",
            err
          );

          channel.nack(
            msg,
            false,
            false
          );
        }
      }
    );
  } catch (err) {
    console.error(
      "RabbitMQ Consumer Error:",
      err
    );
  }
};

module.exports = {
  startConsumer,
};