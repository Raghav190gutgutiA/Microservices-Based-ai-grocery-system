
import axios from "axios";

const authApi = axios.create({
  baseURL: "https://auth-service-ai-grocery.onrender.com/api/auth",
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (
  data
) => {

  const response = await authApi.post(
    "/register",
    data
  );

  return response.data;
};


export const loginUser = async (data) => {

  const response = await authApi.post(
    "/login",
    data
  );

  return response.data;
};

export const forgotPassword = async (
  data
) => {

  const response = await authApi.post(
    "/forgot-password",
    data
  );

  return response.data;
};

export const resetPassword = async (
  data
) => {

  const response = await authApi.post(
    "/reset-password",
    data
  );

  return response.data;
};

export const getCurrentUser = async () => {

  const response = await authApi.get(
    "/me"
  );

  return response.data;
};

export const logoutUser = async () => {

  const response = await authApi.post(
    "/logout"
  );
 
  localStorage.removeItem("user");

  return response.data;
};
export const getTotalEarnings =
  async () => {
    const response =
      await authApi.get(
        "/total-earning"
      );

    return response.data;
  };

export const getProductWiseEarnings =
  async () => {
    const response =
      await authApi.get(
        "/product-wise-earning"
      );

    return response.data;
  };

export default authApi;