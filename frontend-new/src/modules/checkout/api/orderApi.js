import axios from "axios";

const orderApi = axios.create({
  baseURL: "https://ai-grocery-order-service.onrender.com/api/orders",
});

orderApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const createOrder = async (data) => {
  const response = await orderApi.post("/create", data);
  return response.data;
};

export const getOrders = async () => {
  const response = await orderApi.get("/");
  return response.data;
};

export default orderApi;