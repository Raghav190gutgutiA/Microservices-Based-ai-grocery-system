import axios from "axios";

const cartApi = axios.create({
  baseURL: "https://ai-grocery-cart-service.onrender.com/api/cart",
});

cartApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getCart = async () => {
  const response = await cartApi.get("/");
  return response.data;
};

export const addToCart = async (data) => {
  const response = await cartApi.post("/add", data);
  return response.data;
};

export const removeFromCart = async (data) => {
  const response = await cartApi.post("/remove", data);
  return response.data;
};

export const updateQuantity = async (data) => {
  const response = await cartApi.put("/update-quantity", data);
  return response.data;
};

export const clearCart = async () => {
  const response = await cartApi.post("/clear");
  return response.data;
};

export default cartApi;