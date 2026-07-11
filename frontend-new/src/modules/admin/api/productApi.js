import axios from "axios";

const productApi = axios.create({
  baseURL: "https://ai-grocery-product-service.onrender.com/api/products",
  withCredentials: true,
});

export const createProduct = async (formData) => {

  const response = await productApi.post(
    "/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getAllProducts = async () => {

  const response = await productApi.get("/");

  return response.data;
};

export const getSingleProduct = async (id) => {

  const response = await productApi.get(`/${id}`);

  return response.data;
};

export const updateProduct = async (
  id,
  formData
) => {

  const response = await productApi.put(
    `/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteProduct = async (id) => {

  const response = await productApi.delete(
    `/${id}`
  );

  return response.data;
};

export const getMyProducts = async () => {

  const response = await productApi.get(
    "/my-products"
  );

  return response.data;
};

export default productApi;