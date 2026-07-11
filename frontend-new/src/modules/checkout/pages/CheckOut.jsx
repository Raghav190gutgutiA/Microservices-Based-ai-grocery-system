import React, {
  useMemo,
  useState,
} from "react";

import {
  CreditCard,
  MapPin,
  Phone,
  ShoppingBag,
  User,
  Wallet,
  QrCode,
} from "lucide-react";

import {
	useDispatch,
  useSelector,
} from "react-redux";

import {
  motion,
} from "framer-motion";

import {
  createOrder,
} from "../api/orderApi";
import { createPayment, verifyPayment } from "../api/paymentApi";
import { clearCart } from "../../cart/api/cartApi";
import { clearUserCart } from "../../cart/slices/cartSlice";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
	  const navigate = useNavigate();

	//  onClick={() => navigate("/all-products")}
  const dispatch = useDispatch()
  const { items } =
    useSelector(
      (state) => state.cart
    );

  const [loading, setLoading] =
    useState(false);

  const [orderData, setOrderData] =
    useState(null);

  const [orderCreated, setOrderCreated] =
    useState(false);

  const [formData, setFormData] =
    useState({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
      paymentMethod: "cod",
    });

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const totalPrice = useMemo(
    () => {

      return items.reduce(
        (acc, item) =>
          acc +
          item.price *
            item.quantity,
        0
      );
    },
    [items]
  );

  const totalQuantity =
    items.reduce(
      (acc, item) =>
        acc +
        item.quantity,
      0
    );

  const deliveryCharge =
    totalPrice > 500
      ? 0
      : 40;

  const finalAmount =
    totalPrice +
    deliveryCharge;

  const handleCheckout =
    async (e) => {

      e.preventDefault();

      if (orderCreated) {
        return;
      }

      try {

        setLoading(true);

        const response =
          await createOrder({
            shippingAddress:
              formData,

            paymentMethod:
              formData.paymentMethod,
          });

        setOrderData(
          response
        );

        setOrderCreated(
          true
        );
		dispatch(clearUserCart())
		if (formData.paymentMethod === "cod") {
    navigate("/my-orders");
}

      } catch (error) {

        console.log(error);

        alert(
          error?.response?.data
            ?.message ||
            "Failed to create order"
        );

      } finally {

        setLoading(false);
      }
    };
const handleUPIPayment =
  async (orderData) => {

    try {

      setLoading(true);

      const razorOrder =
        await createPayment({
          amount:
            orderData.totalAmount,

          orderId:
            orderData._id,
        });
// 		RAZORPAY_KEY="rzp_test_ojFHkSuH0TK6lC"
// RAZORPAY_SECRET="9oqjssU7cybIqtfvgLfqixB0"

      const options = {
        key:
          "rzp_test_ojFHkSuH0TK6lC",
        amount:
          razorOrder.amount,

        currency:
          razorOrder.currency,

        name:
          "Quickcart",

        description:
          "Order Payment",

        order_id:
          razorOrder.id,

        handler:
          async (
            response
          ) => {

            try {

              await  verifyPayment({
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                orderId:
                  orderData._id,
              });

              alert(
                "Payment Successful 🎉"
              );

              setOrderData({
                ...orderData,

                paymentStatus:
                  "PAID",

                status:
                  "PAID",
              });
                

navigate("/my-orders");
			  
			

            } catch (err) {

              console.log(err);

              alert(
                "Payment verification failed"
              );
            }
          },

        prefill: {
          name:
            formData.fullName,

          contact:
            formData.phone,
        },

        theme: {
          color:
            "#16a34a",
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();

    } catch (err) {

      console.log(err);

      alert(
        err?.response?.data
          ?.message ||
          "Payment failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-7xl mx-auto">

        <div
          className="flex items-center
          gap-4 mb-10"
        >

          <div
            className="w-16 h-16
            rounded-2xl
            bg-green-100
            flex items-center
            justify-center"
          >
            <ShoppingBag
              className="text-green-600
              w-8 h-8"
            />
          </div>

          <div>

            <h1
              className="text-4xl
              font-extrabold
              text-gray-800"
            >
              Checkout
            </h1>

            <p
              className="text-gray-500
              mt-1"
            >
              Complete your order
            </p>
          </div>
        </div>

        <div
          className="grid
          lg:grid-cols-[1fr_400px]
          gap-8"
        >

          <motion.form
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            onSubmit={
              handleCheckout
            }
            className="bg-white
            rounded-[32px]
            shadow-xl p-8"
          >

            <h2
              className="text-3xl
              font-bold text-gray-800
              mb-8"
            >
              Shipping Details
            </h2>

            <div className="space-y-6">

              <div>

                <label
                  className="font-semibold
                  text-gray-700"
                >
                  Full Name
                </label>

                <div
                  className="mt-2 border
                  rounded-2xl px-4 py-4
                  flex items-center"
                >
                  <User
                    className="w-5 h-5
                    text-gray-400 mr-3"
                  />

                  <input
                    type="text"
                    name="fullName"
                    value={
                      formData.fullName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter your name"
                    className="w-full
                    outline-none"
                    required
                  />
                </div>
              </div>

              <div>

                <label
                  className="font-semibold
                  text-gray-700"
                >
                  Phone Number
                </label>

                <div
                  className="mt-2 border
                  rounded-2xl px-4 py-4
                  flex items-center"
                >
                  <Phone
                    className="w-5 h-5
                    text-gray-400 mr-3"
                  />

                  <input
                    type="text"
                    name="phone"
                    value={
                      formData.phone
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter phone number"
                    className="w-full
                    outline-none"
                    required
                  />
                </div>
              </div>

              <div>

                <label
                  className="font-semibold
                  text-gray-700"
                >
                  Address
                </label>

                <div
                  className="mt-2 border
                  rounded-2xl px-4 py-4
                  flex items-start"
                >
                  <MapPin
                    className="w-5 h-5
                    text-gray-400 mr-3 mt-1"
                  />

                  <textarea
                    rows="4"
                    name="address"
                    value={
                      formData.address
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter delivery address"
                    className="w-full
                    outline-none
                    resize-none"
                    required
                  />
                </div>
              </div>

              <div
                className="grid
                md:grid-cols-2 gap-6"
              >

                <div>

                  <label
                    className="font-semibold
                    text-gray-700"
                  >
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={
                      formData.city
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter city"
                    className="mt-2 w-full
                    border rounded-2xl
                    px-4 py-4 outline-none"
                    required
                  />
                </div>

                <div>

                  <label
                    className="font-semibold
                    text-gray-700"
                  >
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={
                      formData.pincode
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter pincode"
                    className="mt-2 w-full
                    border rounded-2xl
                    px-4 py-4 outline-none"
                    required
                  />
                </div>
              </div>

              <div>

                <label
                  className="font-semibold
                  text-gray-700"
                >
                  Payment Method
                </label>

                <div
                  className="grid
                  md:grid-cols-2 gap-4 mt-4"
                >

                  <label
                    className={`border-2
                    rounded-3xl p-5
                    cursor-pointer
                    transition-all flex
                    items-center gap-4
                    ${
                      formData.paymentMethod ===
                      "cod"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >

                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={
                        formData.paymentMethod ===
                        "cod"
                      }
                      onChange={
                        handleChange
                      }
                    />

                    <Wallet
                      className="text-green-600"
                    />

                    <div>

                      <h3
                        className="font-bold"
                      >
                        Cash On Delivery
                      </h3>

                      <p
                        className="text-sm
                        text-gray-500"
                      >
                        Pay after delivery
                      </p>
                    </div>
                  </label>

                  <label
                    className={`border-2
                    rounded-3xl p-5
                    cursor-pointer
                    transition-all flex
                    items-center gap-4
                    ${
                      formData.paymentMethod ===
                      "upi"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >

                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={
                        formData.paymentMethod ===
                        "upi"
                      }
                      onChange={
                        handleChange
                      }
                    />

                    <QrCode
                      className="text-green-600"
                    />

                    <div>

                      <h3
                        className="font-bold"
                      >
                        UPI Payment
                      </h3>

                      <p
                        className="text-sm
                        text-gray-500"
                      >
                        Pay instantly via UPI
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  loading ||
                  orderCreated
                }
                className={`w-full mt-6
                text-white py-5
                rounded-2xl
                font-bold text-lg
                flex items-center
                justify-center gap-3
                transition-all
                ${
                  orderCreated
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                <CreditCard
                  className="w-6 h-6"
                />

                {loading
                  ? "Creating Order..."
                  : orderCreated
                  ? "Order Created"
                  : "Create Order"}
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="bg-white
            rounded-[32px]
            shadow-xl p-8
            h-fit sticky top-24"
          >

            <h2
              className="text-3xl
              font-extrabold
              text-gray-800"
            >
              Order Summary
            </h2>

            <div
              className="space-y-5 mt-8"
            >

              {items.map(
                (item) => (

                  <div
                    key={
                      item.productId
                    }
                    className="flex
                    items-center gap-4"
                  >

                    <img
                      src={
                        item.image
                      }
                      alt={
                        item.name
                      }
                      className="w-20 h-20
                      rounded-2xl
                      object-cover"
                    />

                    <div className="flex-1">

                      <h3
                        className="font-bold
                        text-gray-800"
                      >
                        {item.name}
                      </h3>

                      <p
                        className="text-sm
                        text-gray-500"
                      >
                        Qty:
                        {" "}
                        {
                          item.quantity
                        }
                      </p>
                    </div>

                    <div
                      className="font-bold
                      text-green-600"
                    >
                      ₹
                      {item.price *
                        item.quantity}
                    </div>
                  </div>
                )
              )}

              <div
                className="border-t
                pt-5 space-y-4"
              >

                <div
                  className="flex
                  justify-between"
                >
                  <span>
                    Total Products
                  </span>

                  <span
                    className="font-bold"
                  >
                    {
                      items.length
                    }
                  </span>
                </div>

                <div
                  className="flex
                  justify-between"
                >
                  <span>
                    Total Quantity
                  </span>

                  <span
                    className="font-bold"
                  >
                    {
                      totalQuantity
                    }
                  </span>
                </div>

                <div
                  className="flex
                  justify-between"
                >
                  <span>
                    Subtotal
                  </span>

                  <span
                    className="font-bold"
                  >
                    ₹
                    {totalPrice}
                  </span>
                </div>

                <div
                  className="flex
                  justify-between"
                >
                  <span>
                    Delivery
                  </span>

                  <span
                    className="font-bold"
                  >
                    ₹
                    {
                      deliveryCharge
                    }
                  </span>
                </div>

                <div
                  className="border-t
                  pt-5 flex
                  justify-between"
                >

                  <span
                    className="text-2xl
                    font-bold"
                  >
                    Total
                  </span>

                  <span
                    className="text-3xl
                    font-extrabold
                    text-green-600"
                  >
                    ₹
                    {
                      finalAmount
                    }
                  </span>
                </div>
              </div>

              {orderData && (
                <div
                  className="mt-8
                  bg-green-50
                  border border-green-200
                  rounded-3xl p-6"
                >

                  <h3
                    className="text-2xl
                    font-bold
                    text-green-700"
                  >
                    Order Created 🎉
                  </h3>

                  <p
                    className="mt-3
                    text-gray-600"
                  >
                    Order ID
                  </p>

                  <div
                    className="font-bold
                    text-lg break-all
                    mt-1"
                  >
                    {
                      orderData._id
                    }
                  </div>

                  <div
                    className="mt-4
                    flex justify-between"
                  >
                    <span>
                      Payment
                    </span>

                    <span
                      className="font-bold
                      uppercase"
                    >
                      {
                        formData.paymentMethod
                      }
                    </span>
                  </div>

                  <div
                    className="mt-2
                    flex justify-between"
                  >
                    <span>
                      Amount
                    </span>

                    <span
                      className="font-bold
                      text-green-700"
                    >
                      ₹
                      {
                        orderData.totalAmount
                      }
                    </span>
                  </div>

                  {formData.paymentMethod ===
                    "upi" && (
                    <button
                      onClick={
                        ()=>handleUPIPayment(orderData)
                      }
                      className="w-full mt-6
                      bg-gradient-to-r
                      from-purple-600
                      to-indigo-600
                      hover:opacity-90
                      text-white py-4
                      rounded-2xl
                      font-bold text-lg
                      transition-all"

					  
                    >
                      Pay ₹
                      {
                        orderData.totalAmount
                      }
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;