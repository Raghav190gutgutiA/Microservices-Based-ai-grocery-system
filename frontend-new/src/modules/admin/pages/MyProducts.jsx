import React, { useEffect, useState } from "react";

import {
  Package,
} from "lucide-react";

import ProductCard from "../components/ProductCard";

import {
  deleteProduct,
  getMyProducts,
} from "../api/productApi";
import { useNavigate } from "react-router-dom";

function MyProducts() {

 const navigate = useNavigate();
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchProducts = async () => {

    try {

      const response =
        await getMyProducts();

      setProducts(response);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {

    try {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this product?"
        );

      if (!confirmDelete) return;

      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter(
          (product) =>
            product._id !== id
        )
      );

    } catch (error) {

      console.log(error);

      alert("Failed to delete product");
    }
  };

  const handleEdit = (product) => {

   
  navigate(`/admin/edit-product/${product?._id}`);
  
  };

  if (loading) {
    return (
      <div
        className="flex justify-center items-center
        min-h-[60vh] text-2xl font-bold
        text-green-600"
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center gap-4 mb-10">

          <div
            className="w-16 h-16 rounded-2xl
            bg-green-100 flex items-center
            justify-center"
          >
            <Package className="text-green-600 w-8 h-8" />
          </div>

          <div>
            <h1
              className="text-4xl font-extrabold
              text-gray-800"
            >
              My Products
            </h1>

            <p className="text-gray-500 mt-1">
              Manage and showcase your
              grocery products
            </p>
          </div>
        </div>

        {products.length === 0 ? (

          <div
            className="bg-white rounded-[32px]
            shadow-xl p-16 text-center"
          >

            <h2
              className="text-3xl font-bold
              text-gray-700"
            >
              No Products Found
            </h2>

            <p className="text-gray-500 mt-3">
              Start adding products to
              your store
            </p>
          </div>

        ) : (

          <div
            className="grid
            sm:grid-cols-2
            xl:grid-cols-3
            gap-8"
          >

            {products.map((product) => (

              <ProductCard
                key={product._id}
                product={product}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProducts;