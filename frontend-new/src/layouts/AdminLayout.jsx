import React, { useState } from "react";

import {
  Outlet,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  PackagePlus,
  Boxes,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { logoutUser } from "../modules/auth/api/authApi";

import { useDispatch } from "react-redux";
import { logoutUserRedux } from "../modules/auth/slices/authSlice";



function AdminLayout() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout =
    async () => {

      try {

        await logoutUser();
        // localStorage.removeItem("token");
        dispatch(
          logoutUserRedux()
        );

        navigate("/login");

      } catch (error) {
0
        console.log(error);

        dispatch(
          logoutUserRedux()
        );

        navigate("/login");
      }
    };

  return (
    <div
      className="min-h-screen
      bg-gray-100 flex overflow-hidden"
    >

      <AnimatePresence>

        {(sidebarOpen ||
          window.innerWidth >=
            768) && (
          <motion.div
            initial={{
              x: -250,
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: -250,
            }}
            transition={{
              duration: 0.3,
            }}
            className="fixed inset-y-0 left-0
            md:static z-50 w-[260px]
            min-h-screen
            bg-gradient-to-b
            from-green-700
            to-green-900
            text-white shadow-2xl
            flex flex-col"
          >

            <div
              className="flex items-center
              justify-between
              px-6 py-5 border-b
              border-white/10"
            >

              <h1
                className="text-2xl
                font-extrabold
                tracking-wide"
              >
                Admin
              </h1>

              <button
                className="md:hidden"
                onClick={() =>
                  setSidebarOpen(
                    false
                  )
                }
              >
                <X />
              </button>
            </div>

            <div
              className="flex flex-col
              gap-2 p-4"
            >

              <Link
                to="/admin"
                className="flex items-center
                gap-3 px-4 py-3
                rounded-xl
                hover:bg-white/10
                transition-all"
              >
                <LayoutDashboard className="w-5 h-5" />

                Dashboard
              </Link>

              <Link
                to="/admin/create-product"
                className="flex items-center
                gap-3 px-4 py-3
                rounded-xl
                hover:bg-white/10
                transition-all"
              >
                <PackagePlus className="w-5 h-5" />

                Create Product
              </Link>

              <Link
                to="/admin/my-products"
                className="flex items-center
                gap-3 px-4 py-3
                rounded-xl
                hover:bg-white/10
                transition-all"
              >
                <Boxes className="w-5 h-5" />

                My Products
              </Link>
            </div>

            <div
              className="mt-auto p-4
              border-t border-white/10"
            >

              <button
                className="w-full flex
                items-center gap-3
                px-4 py-3 rounded-xl
                hover:bg-red-500/20
                text-red-200
                transition-all"
                onClick={
                  handleLogout
                }
              >
                <LogOut className="w-5 h-5" />

                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="flex-1 flex
        flex-col min-h-screen"
      >

        <div
          className="h-16 bg-white
          shadow-sm flex items-center
          px-5 sticky top-0 z-40"
        >

          <button
            className="md:hidden"
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <Menu />
          </button>

          <h2
            className="ml-4 text-2xl
            font-bold text-gray-700"
          >
            Admin Panel
          </h2>
        </div>

        <div
          className="flex-1 p-6
          overflow-y-auto"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;