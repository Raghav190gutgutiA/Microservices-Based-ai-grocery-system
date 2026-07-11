import React, { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Package,
  Layers3,
  Weight,
  IndianRupee,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

function ProductCard({
  product,
  onDelete,
  onEdit,
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

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
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

        <div
          className="absolute top-4 left-4
          bg-white/90 backdrop-blur-md
          px-4 py-2 rounded-full
          text-green-700 font-bold"
        >
          ₹{product.price}
        </div>

        <div
          className={`absolute top-4 right-4
          px-4 py-2 rounded-full
          text-sm font-bold
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
          className="grid grid-cols-3 gap-4
          mt-6"
        >

          <div
            className="bg-gray-50 rounded-2xl
            p-4"
          >
            <div
              className="flex items-center gap-2
              text-gray-500 text-sm"
            >
              <Layers3 className="w-4 h-4" />
              Stock
            </div>

            <h3
              className="text-xl font-bold
              text-gray-800 mt-2"
            >
              {product.stock}
            </h3>
          </div>

          <div
            className="bg-gray-50 rounded-2xl
            p-4"
          >
            <div
              className="flex items-center gap-2
              text-gray-500 text-sm"
            >
              <Weight className="w-4 h-4" />
              Weight
            </div>

            <h3
              className="text-xl font-bold
              text-gray-800 mt-2"
            >
              {product.weight || "N/A"}
            </h3>
          </div>

          <div
            className="bg-gray-50 rounded-2xl
            p-4"
          >
            <div
              className="flex items-center gap-2
              text-gray-500 text-sm"
            >
              <IndianRupee className="w-4 h-4" />
              Price
            </div>

            <h3
              className="text-xl font-bold
              text-green-600 mt-2"
            >
              ₹{product.price}
            </h3>
          </div>
        </div>

        <div
          className="flex items-center justify-between
          mt-6 bg-gray-50 rounded-2xl p-4"
        >

          <div className="flex items-center gap-3">

            <div
              className="w-12 h-12 rounded-2xl
              bg-green-100 flex items-center
              justify-center"
            >
              <Package className="text-green-600 w-6 h-6" />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Brand
              </p>

              <h3
                className="font-bold text-gray-800"
              >
                {product.brand ||
                  "No Brand"}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">

          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-blue-50
            hover:bg-blue-100
            text-blue-700 rounded-2xl
            py-4 font-semibold
            flex items-center justify-center gap-2
            transition-all"
          >
            <Pencil className="w-5 h-5" />
            Edit Product
          </button>

          <button
            onClick={() =>
              onDelete(product._id)
            }
            className="flex-1 bg-red-50
            hover:bg-red-100
            text-red-700 rounded-2xl
            py-4 font-semibold
            flex items-center justify-center gap-2
            transition-all"
          >
            <Trash2 className="w-5 h-5" />
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;