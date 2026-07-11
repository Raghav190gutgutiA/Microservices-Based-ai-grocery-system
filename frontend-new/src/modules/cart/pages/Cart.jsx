import React, {
  useEffect,
  useMemo,
} from "react";

import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  clearUserCart,
  fetchCart,
  removeCartItem,
  updateCartQuantity,
} from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

function CartPage() {

 const navigate = useNavigate()
  const dispatch =
    useDispatch();

  const {
    items,
    loading,
  } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {

    dispatch(fetchCart());

  }, []);

  const handleQuantity = (
    productId,
    quantity
  ) => {

    dispatch(
      updateCartQuantity({
        productId,
        quantity,
      })
    );
  };

  const handleRemove = (
    productId
  ) => {

    dispatch(
      removeCartItem(
        productId
      )
    );
  };

  const handleClearCart =
    () => {

      dispatch(
        clearUserCart()
      );
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

  if (loading) {
    return (
      <div
        className="min-h-screen
        flex items-center
        justify-center
        text-3xl font-bold
        text-green-600"
      >
        Loading Cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-7xl mx-auto">

        <div
          className="flex items-center
          justify-between mb-10"
        >

          <div
            className="flex items-center
            gap-4"
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
                My Cart
              </h1>

              <p
                className="text-gray-500
                mt-1"
              >
                Review your grocery items
              </p>
            </div>
          </div>

          {items.length > 0 && (
            <button
              onClick={
                handleClearCart
              }
              className="bg-red-500
              hover:bg-red-600
              text-white px-6 py-3
              rounded-2xl
              font-semibold
              transition-all"
            >
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (

          <div
            className="bg-white
            rounded-[32px]
            shadow-xl p-20
            text-center"
          >

            <h2
              className="text-3xl
              font-bold text-gray-700"
            >
              Your Cart Is Empty
            </h2>

            <p
              className="text-gray-500
              mt-3"
            >
              Add products to continue
              shopping
            </p>
          </div>

        ) : (

          <div
            className="grid
            lg:grid-cols-[1fr_350px]
            gap-8"
          >

            <div className="space-y-6">

              <AnimatePresence>

                {items.map(
                  (item) => (

                    <motion.div
                      key={
                        item.productId
                      }
                      layout
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -50,
                      }}
                      className="bg-white
                      rounded-[32px]
                      p-5 shadow-xl
                      flex flex-col
                      md:flex-row
                      gap-6"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full
                        md:w-[220px]
                        h-[220px]
                        object-cover
                        rounded-3xl"
                      />

                      <div
                        className="flex-1
                        flex flex-col
                        justify-between"
                      >

                        <div>

                          <h2
                            className="text-3xl
                            font-bold
                            text-gray-800"
                          >
                            {item.name}
                          </h2>

                          <p
                            className="text-green-600
                            text-2xl
                            font-extrabold
                            mt-3"
                          >
                            ₹{item.price}
                          </p>
                        </div>

                        <div
                          className="flex
                          flex-wrap
                          items-center
                          justify-between
                          gap-4 mt-6"
                        >

                          <div
                            className="flex
                            items-center
                            bg-gray-100
                            rounded-2xl
                            overflow-hidden"
                          >

                            <button
                              onClick={() =>
                                handleQuantity(
                                  item.productId,
                                  item.quantity -
                                    1
                                )
                              }
                              className="w-14
                              h-14 flex
                              items-center
                              justify-center"
                            >
                              <Minus />
                            </button>

                            <div
                              className="w-16
                              text-center
                              font-bold
                              text-xl"
                            >
                              {
                                item.quantity
                              }
                            </div>

                            <button
                              onClick={() =>
                                handleQuantity(
                                  item.productId,
                                  item.quantity +
                                    1
                                )
                              }
                              className="w-14
                              h-14 flex
                              items-center
                              justify-center"
                            >
                              <Plus />
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              handleRemove(
                                item.productId
                              )
                            }
                            className="bg-red-100
                            hover:bg-red-200
                            text-red-600
                            px-6 py-4
                            rounded-2xl
                            flex items-center
                            gap-3
                            font-semibold"
                          >
                            <Trash2
                              className="w-5
                              h-5"
                            />

                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>

            <div
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
                className="space-y-5
                mt-8"
              >

                <div
                  className="flex
                  justify-between
                  text-gray-600"
                >
                  <span>
                    Total Items
                  </span>

                  <span
                    className="font-bold"
                  >
                    {items.length}
                  </span>
                </div>

                <div
                  className="flex
                  justify-between
                  text-gray-600"
                >
                  <span>
                    Delivery
                  </span>

                  <span
                    className="font-bold
                    text-green-600"
                  >
                    Free
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
                    ₹{totalPrice}
                  </span>
                </div>
              </div>

              <button
                className="w-full mt-10
                bg-green-600
                hover:bg-green-700
                text-white py-5
                rounded-2xl
                font-bold text-lg
                transition-all"
				onClick={()=>navigate("/checkout")}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;