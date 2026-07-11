import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./modules/grocery/pages/Home";
import MainLayout from "./layouts/MainLayout";
import AuthPage from "./modules/auth/pages/AuthPage";
import ForgotPasswordPage from "./modules/auth/pages/ForgotPassword";
import ResetPasswordPage from "./modules/auth/pages/ResetPassword";
import CreateProduct from "./modules/admin/pages/CreateProduct";
import AdminLayout from "./layouts/AdminLayout";
import MyProducts from "./modules/admin/pages/MyProducts";
import EditProduct from "./modules/admin/pages/EditProduct";
import GroceryProducts from "./modules/grocery/pages/GroceryProducts";
import CartPage from "./modules/cart/pages/Cart";
import CheckoutPage from "./modules/checkout/pages/CheckOut";
import MyOrdersPage from "./modules/checkout/pages/MyOrders";
import RecipesPage from "./modules/recipes/pages/RecipesPage";
import StatisticsPage from "./modules/admin/pages/Statistics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-products",
        element: <GroceryProducts />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/my-orders",
        element: <MyOrdersPage />,
      },
      {
        path: "/recipes",
        element: <RecipesPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/register",
    element: <AuthPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      path: "create-product",
      element: <CreateProduct />,
    },
    {
      path: "my-products",
      element: <MyProducts />,
    },
    {
      path: "edit-product/:id",
      element: <EditProduct />,
    },
    {
      path: "",
      element: <StatisticsPage/>,
    },
  ],
},,
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;