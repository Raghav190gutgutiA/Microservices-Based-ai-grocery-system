import React, { useState } from "react";

import {
  Upload,
  PackagePlus,
  IndianRupee,
  FileText,
  Layers3,
  Boxes,
  Tag,
  Weight,
  Star,
  Barcode,
} from "lucide-react";

import { createProduct } from "../api/productApi";

function CreateProduct() {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    // sku: "",
    unit: "",
    weight: "",
    discountPercentage: "",
    featured: false,
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      images.forEach((image) => {
        data.append("images", image);
      });

      const response = await createProduct(data);

      console.log(response);

      alert("Product created successfully");

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
        // sku: "",
        unit: "",
        weight: "",
        discountPercentage: "",
        featured: false,
      });

      setImages([]);

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div
        className="max-w-6xl mx-auto bg-white rounded-3xl
        shadow-xl p-8"
      >

        <div className="flex items-center gap-4 mb-10">

          <div
            className="w-16 h-16 rounded-2xl
            bg-green-100 flex items-center justify-center"
          >
            <PackagePlus className="text-green-600 w-8 h-8" />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              Create Product
            </h1>

            <p className="text-gray-500 mt-1">
              Add fresh grocery products to your store
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Product Name
              </label>

              <div className="mt-2 flex items-center border rounded-2xl px-4 py-3">
                <Boxes className="w-5 h-5 text-gray-400 mr-3" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  className="w-full outline-none"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Price
              </label>

              <div className="mt-2 flex items-center border rounded-2xl px-4 py-3">
                <IndianRupee className="w-5 h-5 text-gray-400 mr-3" />

                <input
                  type="number"
                  name="price"
                  placeholder="Enter product price"
                  className="w-full outline-none"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Stock
              </label>

              <div className="mt-2 flex items-center border rounded-2xl px-4 py-3">
                <Layers3 className="w-5 h-5 text-gray-400 mr-3" />

                <input
                  type="number"
                  name="stock"
                  placeholder="Enter stock"
                  className="w-full outline-none"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Brand
              </label>

              <div className="mt-2 flex items-center border rounded-2xl px-4 py-3">
                <Tag className="w-5 h-5 text-gray-400 mr-3" />

                <input
                  type="text"
                  name="brand"
                  placeholder="Enter brand"
                  className="w-full outline-none"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>
            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Unit
              </label>

              <div className="mt-2 flex items-center border rounded-2xl px-4 py-3">
                <Weight className="w-5 h-5 text-gray-400 mr-3" />

                <input
                  type="text"
                  name="unit"
                  placeholder="kg / litre / pack"
                  className="w-full outline-none"
                  value={formData.unit}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Weight
              </label>

              <div className="mt-2 flex items-center border rounded-2xl px-4 py-3">
                <Weight className="w-5 h-5 text-gray-400 mr-3" />

                <input
                  type="text"
                  name="weight"
                  placeholder="1kg / 500gm"
                  className="w-full outline-none"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Discount %
              </label>

              <div className="mt-2 flex items-center border rounded-2xl px-4 py-3">
                <Star className="w-5 h-5 text-gray-400 mr-3" />

                <input
                  type="number"
                  name="discountPercentage"
                  placeholder="Discount percentage"
                  className="w-full outline-none"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Categories
            </label>

            <div className="mt-2 flex items-center border rounded-2xl px-4 py-3">
              <Layers3 className="w-5 h-5 text-gray-400 mr-3" />

              <input
                type="text"
                name="category"
                placeholder="vegetables, fruits"
                className="w-full outline-none"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Separate categories with commas
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Description
            </label>

            <div className="mt-2 flex border rounded-2xl px-4 py-3">
              <FileText className="w-5 h-5 text-gray-400 mr-3 mt-1" />

              <textarea
                rows="5"
                name="description"
                placeholder="Write product description..."
                className="w-full outline-none resize-none"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5"
            />

            <label className="font-medium text-gray-700">
              Featured Product
            </label>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Upload Product Images
            </label>

            <label
              className="mt-3 border-2 border-dashed border-green-300
              rounded-3xl p-10 flex flex-col items-center justify-center
              cursor-pointer hover:bg-green-50 transition-all"
            >
              <Upload className="w-12 h-12 text-green-500 mb-4" />

              <p className="text-lg font-semibold text-gray-700">
                Click to Upload Images
              </p>

              <p className="text-sm text-gray-400 mt-1">
                PNG, JPG, JPEG supported
              </p>

              <input
                type="file"
                multiple
                hidden
                onChange={handleImageChange}
              />
            </label>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="rounded-2xl overflow-hidden border"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      className="w-full h-36 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700
            text-white py-4 rounded-2xl font-bold text-lg
            transition-all shadow-lg disabled:opacity-60"
          >
            {loading
              ? "Creating Product..."
              : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;