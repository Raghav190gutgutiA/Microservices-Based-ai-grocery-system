import axios from "axios";

const paymentApi = axios.create({
  baseURL: "https://ai-grocery-payment.onrender.com/api/payment",
});

paymentApi.interceptors.request.use(
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

export const createPayment = async (data) => {
  const response = await paymentApi.post("/create", data);
  return response.data;
};

export const verifyPayment = async (data) => {
  const response = await paymentApi.post("/verify", data);
  return response.data;
};

export default paymentApi;