const Order = require("../model/Order"); 
const { getCart, clearCart, } = require( "../services/cartService" ); 
const { decreaseStock,increaseStock } = require( "../services/inventoryService" );
const { publishToQueue } = require("../broker/rabbit");

exports.createOrder = async (req, res) => {
  try {
    const token =
      req.cookies?.token ||
      req.headers.authorization?.replace(
        "Bearer ",
        ""
      );

    const userId = req.user.id;

    const {
      shippingAddress,
      paymentMethod,
    } = req.body;


	console.log("raghav",token)
    const cart = await getCart(token);
	console.log("raghav",token,cart)

	// const { decreaseStock, } = require( "../services/inventoryService" );
// const { decreaseStock, } = require( "../services/inventoryService" );
    if (
      !cart ||
      cart.items.length === 0
    ) {
      return res.status(400).json({
        message: "Cart empty",
      });
    }

    let total = 0;

    for (const item of cart.items) {
      total +=
        item.price * item.quantity;

      await decreaseStock(
        item.productId,
        item.quantity,
        token
      );
    }

    const order =
      await Order.create({
        userId,
        items: cart.items,
        totalAmount: total,
        shippingAddress,
        paymentMethod,
        paymentStatus:
          paymentMethod === "cod"
            ? "PAID"
            : "PENDING",
        status:
          paymentMethod === "cod"
            ? "PLACED"
            : "PAID",
      });
	  if(paymentMethod=="cod")
	  {

		console.log(":se,order",order?._id)
        await publishToQueue("payment_events", {
        type: "PAYMENT_SUCCESS",
        orderId:order?._id
      });
	}
    // await clearCart(token);

    res.status(201).json(order);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }

};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};