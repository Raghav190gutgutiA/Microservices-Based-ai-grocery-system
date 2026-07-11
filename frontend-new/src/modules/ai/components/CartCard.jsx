import React from "react";
import { useDispatch } from "react-redux";
import {
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import {
  addCartItem,
  removeCartItem,
  updateCartQuantity,
} from "../../cart/slices/cartSlice";

function CartCard({ cart = [] }) {
  const dispatch = useDispatch();

  const getDiscountedPrice = (
    item
  ) => {
    return item.discountPercentage > 0
      ? Math.round(
          item.price -
            (item.price *
              item.discountPercentage) /
              100
        )
      : item.price;
  };

  const total = cart.reduce(
    (sum, item) =>
      sum +
      getDiscountedPrice(item) *
        item.quantity,
    0
  );

  const handleAddToCart = (
    product
  ) => {
	console.log("f3fg",product)
    dispatch(
      addCartItem({
        productId:
          product.productId,

        name:
          product.productName,

        price: getDiscountedPrice(product),

        discountPercentage:
          product.discountPercentage,

        image:
          product.image,

        userIds:
          product?.userId,

        quantity:
          product.quantity,
      })
    );
  };

  const handleIncrease = (
    item
  ) => {
    dispatch(
      updateCartQuantity({
        productId:
          item.productId,

        quantity:
          item.quantity + 1,
      })
    );
  };

  const handleDecrease = (
    item
  ) => {
    if (
      item.quantity <= 1
    ) {
      dispatch(
        removeCartItem(
          item.productId
        )
      );

      return;
    }

    dispatch(
      updateCartQuantity({
        productId:
          item.productId,

        quantity:
          item.quantity - 1,
      })
    );
  };

  const handleAddAll =
    () => {
      cart.forEach(
        (product) => {
          dispatch(
            addCartItem({
              productId:
                product.productId,

              name:
                product.productName,

                price:getDiscountedPrice(product),


              discountPercentage:
                product.discountPercentage,

              image:
                product.images?.[0]
                  ?.url,

              userIds:
                product?.userId,

              quantity:
                product.quantity,
            })
          );
        }
      );
    };

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-green-600 text-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Grocery Cart
          </h2>

          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            {cart.length} Items
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4 max-h-[450px] overflow-y-auto">
        {cart.map((item) => (
          <div
            key={
              item.productId
            }
            className="border rounded-2xl p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-800">
                    {
                      item.productName
                    }
                  </h3>

                  {item.discountPercentage >
                    0 && (
                    <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-full font-semibold">
                      {
                        item.discountPercentage
                      }
                      % OFF
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Ingredient:{" "}
                  {
                    item.ingredient
                  }
                </p>

                <p className="text-sm text-gray-500">
                  Required:{" "}
                  {
                    item.requiredQuantity
                  }
                </p>
              </div>

              <div className="text-right">
                {item.discountPercentage >
                0 ? (
                  <>
                    <p className="font-bold text-green-700 text-lg">
                      ₹
                      {getDiscountedPrice(
                        item
                      )}
                    </p>

                    <p className="text-sm text-gray-400 line-through">
                      ₹
                      {
                        item.price
                      }
                    </p>
                  </>
                ) : (
                  <p className="font-bold text-green-700 text-lg">
                    ₹
                    {
                      item.price
                    }
                  </p>
                )}

                <p className="text-xs text-gray-500">
                  {
                    item.weight
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    handleDecrease(
                      item
                    )
                  }
                  className="h-8 w-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200"
                >
                  <Minus
                    size={16}
                  />
                </button>

                <span className="font-semibold min-w-[20px] text-center">
                  {
                    item.quantity
                  }
                </span>

                <button
                  onClick={() =>
                    handleIncrease(
                      item
                    )
                  }
                  className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200"
                >
                  <Plus
                    size={16}
                  />
                </button>
              </div>

              <button
                onClick={() =>
                  handleAddToCart(
                    item
                  )
                }
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm"
              >
                <ShoppingCart
                  size={16}
                />
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-5 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-lg">
            Total
          </span>

          <span className="text-2xl font-bold text-green-700">
            ₹{total}
          </span>
        </div>

        <button
          onClick={
            handleAddAll
          }
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition"
        >
          <ShoppingCart
            size={18}
          />
          Add All To Cart
        </button>
      </div>
    </div>
  );
}

export default CartCard;