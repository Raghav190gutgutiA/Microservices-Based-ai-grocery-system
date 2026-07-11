const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: String,
  orderId: String,
  amount: Number,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING"
  },
  email: String
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);