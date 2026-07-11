import React, {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Package,
  CreditCard,
  CalendarDays,
} from "lucide-react";

import {
  getOrders,
} from "../api/orderApi";

import {
  createPayment,
  verifyPayment,
} from "../api/paymentApi";

function MyOrdersPage() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const handlePayNow =
    async (order) => {

      try {

        const razorOrder =
          await createPayment({
            amount:
              order.totalAmount,

            orderId:
              order._id,
          });

        const options = {
          key:
            import.meta.env
              .VITE_RAZORPAY_KEY,

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

                await verifyPayment({
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,

                  orderId:
                    order._id,
                });

                alert(
                  "Payment Successful 🎉"
                );

                setOrders(
                  (prev) =>
                    prev.map(
                      (
                        item
                      ) =>
                        item._id ===
                        order._id
                          ? {
                              ...item,

                              paymentStatus:
                                "PAID",

                              status:
                                "PAID",
                            }
                          : item
                    )
                );

              } catch (err) {

                console.log(
                  err
                );

                alert(
                  "Payment verification failed"
                );
              }
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
      }
    };

  useEffect(() => {

    const fetchOrders =
      async () => {

        try {

          const data =
            await getOrders();
       console.log(data)
          setOrders(data?.data);

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }
      };

    fetchOrders();

  }, []);

  if (loading) {

    return (
      <div
        className="min-h-screen
        flex items-center
        justify-center"
      >
        <h1
          className="text-3xl
          font-bold"
        >
          Loading Orders...
        </h1>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen
      bg-gray-100
      py-10 px-6"
    >

      <div
        className="max-w-7xl
        mx-auto"
      >

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
            <Package
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
              My Orders
            </h1>

            <p
              className="text-gray-500
              mt-1"
            >
              Track all your orders
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div
            className="bg-white
            rounded-3xl
            shadow-lg
            p-20 text-center"
          >

            <h2
              className="text-3xl
              font-bold
              text-gray-700"
            >
              No Orders Found
            </h2>
          </div>
        ) : (
          <div
            className="grid
            gap-8"
          >

            {orders?.map(
              (
                order,
                index
              ) => (

                <motion.div
                  key={
                    order._id
                  }
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index *
                      0.1,
                  }}
                  className="bg-white
                  rounded-[32px]
                  shadow-xl
                  overflow-hidden"
                >

                  <div
                    className="bg-gradient-to-r
                    from-green-600
                    to-emerald-700
                    p-6 text-white"
                  >

                    <div
                      className="flex
                      justify-between
                      flex-wrap gap-4"
                    >

                      <div>

                        <h2
                          className="text-2xl
                          font-bold"
                        >
                          Order #
                          {order._id.slice(
                            -6
                          )}
                        </h2>

                        <div
                          className="flex
                          items-center gap-2
                          mt-2 text-green-100"
                        >

                          <CalendarDays
                            className="w-4 h-4"
                          />

                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </div>
                      </div>

                      <div
                        className="text-right"
                      >

                        <div
                          className={`inline-flex
                          px-4 py-2
                          rounded-full
                          font-bold text-sm
                          ${
                            order.paymentStatus ===
                            "PAID"
                              ? "bg-green-200 text-green-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {
                            order.paymentStatus
                          }
                        </div>

                        <h3
                          className="text-3xl
                          font-extrabold
                          mt-3"
                        >
                          ₹
                          {
                            order.totalAmount
                          }
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">

                    <div
                      className="space-y-5"
                    >

                      {order.items.map(
                        (
                          item
                        ) => (

                          <div
                            key={
                              item.productId
                            }
                            className="flex
                            items-center gap-4
                            border rounded-2xl
                            p-4"
                          >

                            <img
                              src={
                                item.image
                              }
                              alt={
                                item.name
                              }
                              className="w-24
                              h-24 rounded-2xl
                              object-cover"
                            />

                            <div
                              className="flex-1"
                            >

                              <h3
                                className="text-xl
                                font-bold
                                text-gray-800"
                              >
                                {
                                  item.name
                                }
                              </h3>

                              <p
                                className="text-gray-500
                                mt-1"
                              >
                                Quantity:
                                {" "}
                                {
                                  item.quantity
                                }
                              </p>

                              <p
                                className="text-green-600
                                font-bold text-lg
                                mt-2"
                              >
                                ₹
                                {
                                  item.price
                                }
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    <div
                      className="mt-8
                      flex justify-between
                      items-center flex-wrap
                      gap-4"
                    >

                      <div>

                        <p
                          className="text-gray-500"
                        >
                          Payment Method
                        </p>

                        <h3
                          className="font-bold
                          uppercase text-lg"
                        >
                          {
                            order.paymentMethod
                          }
                        </h3>
                      </div>

                      <div>

                        <p
                          className="text-gray-500"
                        >
                          Order Status
                        </p>

                        <h3
                          className="font-bold
                          text-lg"
                        >
                          {
                            order.status
                          }
                        </h3>
                      </div>

                      {order.paymentStatus !==
                        "PAID" &&
                        order.paymentMethod ===
                          "upi" && (
                        <button
                          onClick={() =>
                            handlePayNow(
                              order
                            )
                          }
                          className="bg-gradient-to-r
                          from-purple-600
                          to-indigo-600
                          hover:opacity-90
                          text-white
                          px-8 py-4
                          rounded-2xl
                          font-bold
                          flex items-center
                          gap-3"
                        >
                          <CreditCard
                            className="w-5
                            h-5"
                          />

                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrdersPage;