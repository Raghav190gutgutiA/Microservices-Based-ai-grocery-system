const mongoose =
  require("mongoose");

const orderItemSchema =
  new mongoose.Schema({
    productId: String,
   
    name: String,

    price: Number,

    image: String,

    quantity: Number,

	sellerId:String
  });

const shippingAddressSchema =
  new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },
  });

const orderSchema =
  new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },

      items: [
        orderItemSchema,
      ],

      totalAmount: {
        type: Number,
        required: true,
      },

      shippingAddress: {
        type:
          shippingAddressSchema,
        required: true,
      },

      paymentMethod: {
        type: String,
        enum: [
          "cod",
          "upi",
        ],
        required: true,
      },

      paymentStatus: {
        type: String,
        enum: [
          "PENDING",
          "PAID",
          "FAILED",
        ],
        default:
          "PENDING",
      },

      status: {
        type: String,
        enum: [
          "PLACED",
          "PAID",
          "CANCELLED",
          "SHIPPED",
          "DELIVERED",
        ],
        default:
          "PLACED",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );