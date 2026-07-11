import React, { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  Star,
  Weight,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

function UserProductCard({
  product,
  onAddToCart,
}) {

  const [currentImage, setCurrentImage] =
    useState(0);

  const nextImage = () => {

    setCurrentImage((prev) =>
      (prev + 1) %
      product.images.length
    );
  };

  const prevImage = () => {

    setCurrentImage((prev) =>
      (prev - 1 +
        product.images.length) %
      product.images.length
    );
  };

  const discountedPrice =
    product.discountPercentage > 0
      ? Math.round(
          product.price -
            (product.price *
              product.discountPercentage) /
              100
        )
      : product.price;

  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      className="bg-white rounded-[32px]
      overflow-hidden shadow-xl"
    >

      <div className="relative h-[320px] overflow-hidden">

        <AnimatePresence mode="wait">

          <motion.img
            key={currentImage}
            src={
              product.images[currentImage]
                ?.url
            }
            alt={product.name}
            initial={{
              opacity: 0,
              scale: 1.08,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            transition={{
              duration: 0.35,
            }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-3
              -translate-y-1/2 w-10 h-10
              rounded-full bg-white/80
              flex items-center justify-center
              backdrop-blur-md"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={nextImage}
              className="absolute top-1/2 right-3
              -translate-y-1/2 w-10 h-10
              rounded-full bg-white/80
              flex items-center justify-center
              backdrop-blur-md"
            >
              <ChevronRight />
            </button>
          </>
        )}

        {product.discountPercentage >
          0 && (
          <div
            className="absolute top-4 left-4
            bg-red-500 text-white
            px-4 py-2 rounded-full
            text-sm font-bold shadow-lg"
          >
            {product.discountPercentage}% OFF
          </div>
        )}

        <button
          className="absolute top-4 right-4
          w-12 h-12 rounded-full
          bg-white/90 backdrop-blur-md
          flex items-center justify-center
          shadow-lg"
        >
          <Heart className="text-red-500 w-5 h-5" />
        </button>

        <div
          className={`absolute bottom-4 left-4
          px-4 py-2 rounded-full
          text-sm font-bold shadow-lg
          ${
            product.stock > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.stock > 0
            ? `${product.stock} In Stock`
            : "Out of Stock"}
        </div>
      </div>

      <div className="p-6">

        <div className="flex items-start justify-between gap-4">

          <div>
            <h2
              className="text-2xl font-bold
              text-gray-800 line-clamp-1"
            >
              {product.name}
            </h2>

            <p
              className="text-gray-500 mt-2
              line-clamp-2"
            >
              {product.description}
            </p>
          </div>

          <div
            className="flex items-center gap-1
            bg-yellow-100 text-yellow-700
            px-3 py-1 rounded-full
            text-sm font-semibold"
          >
            <Star className="w-4 h-4 fill-yellow-500" />

            {product.ratings || 4.5}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-5">

          {product.category?.map(
            (category, index) => (
              <span
                key={index}
                className="bg-green-100
                text-green-700 text-xs
                px-3 py-1 rounded-full"
              >
                {category}
              </span>
            )
          )}
        </div>

        <div
          className="flex items-center justify-between
          mt-6"
        >

          <div>

            <div className="flex items-center gap-3">

              <h2
                className="text-3xl font-extrabold
                text-green-600"
              >
                ₹{discountedPrice}
              </h2>

              {product.discountPercentage >
                0 && (
                <span
                  className="text-gray-400
                  line-through text-lg"
                >
                  ₹{product.price}
                </span>
              )}
            </div>

            <div
              className="flex items-center gap-2
              text-gray-500 mt-2"
            >
              <Weight className="w-4 h-4" />

              <span>
                {product.weight ||
                  "1kg"}
              </span>
            </div>
          </div>
        </div>

        <button
          disabled={
            product.stock <= 0
          }
          onClick={() =>
            onAddToCart(product)
          }
          className={`w-full mt-6 py-4
          rounded-2xl font-bold text-lg
          flex items-center justify-center gap-3
          transition-all
          ${
            product.stock > 0
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          <ShoppingCart className="w-5 h-5" />

          {product.stock > 0
            ? "Add To Cart"
            : "Out Of Stock"}
        </button>
      </div>
    </motion.div>
  );
}

export default UserProductCard;