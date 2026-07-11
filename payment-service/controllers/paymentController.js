const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const Payment = require("../model/Payment");
const { publishEvent } = require("../broker/rabbit");

exports.createPayment = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    const razorOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR"
    });

    await Payment.create({
      userId: req.user.id,
      orderId,
      amount,
      razorpayOrderId: razorOrder.id,
      email: req.user.email
    });

    res.json(razorOrder);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    const payment = await Payment.findOne({ orderId });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (expectedSignature === razorpay_signature) {

      payment.status = "SUCCESS";
      payment.razorpayPaymentId = razorpay_payment_id;
      await payment.save();

      await publishEvent("payment_events", {
        type: "PAYMENT_SUCCESS",
        orderId
      });

      await publishEvent("notification_events", {
        type: "PAYMENT_SUCCESS",
        email: payment.email,
        orderId,
        amount: payment.amount
      });

      return res.json({ success: true });
    }

    payment.status = "FAILED";
    await payment.save();

    await publishEvent("payment_events", {
      type: "PAYMENT_FAILED",
      orderId
    });

    await publishEvent("notification_events", {
      type: "PAYMENT_FAILED",
      email: payment.email,
      orderId
    });

    res.status(400).json({ success: false });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};