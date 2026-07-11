

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Boxes,
  LogOut,
  Search,
  ShoppingCart,
  User,
  X,
  Package,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { logoutUser } from "../../auth/api/authApi";

import {
  useDispatch,
  useSelector,
} from "react-redux";
import { logoutUserRedux } from "../../auth/slices/authSlice";
import { fetchCart } from "../../cart/slices/cartSlice";



function Nav() {

 const cart = useSelector((store)=>store.cart);
  const navigate = useNavigate();


  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );
  const {
    items,
    loading,
  } = useSelector(
    (state) => state.cart
  );
  	// dispatch(fetchCart());
  
  console.log("userData",user);

  const [open, setOpen] =
    useState(false);

  const [
    searchBarOpen,
    setSearchBarOpen,
  ] = useState(false);

  const totalQuantity =
  cart?.items.reduce(
    (acc, item) =>
      acc + item.quantity,
    0
  );

  const [search, setSearch] =
    useState("");

  const profileDropDown =
    useRef(null);

  const cartCount = items?.length;

  useEffect(() => {
	dispatch(fetchCart());

    const handleClickOutside = (
      e
    ) => {

      if (
        profileDropDown.current &&
        !profileDropDown.current.contains(
          e.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  const handleSearch = (e) => {

    e.preventDefault();

    console.log(search);

    setSearch("");

    setSearchBarOpen(false);
  };

  const handleLogout =
    async () => {

      try {

        await logoutUser();

        dispatch(
          logoutUserRedux()
        );

        navigate("/login");

      } catch (error) {

        console.log(error);

        dispatch(
          logoutUserRedux()
        );

        navigate("/login");
      }
    };

  return (
    <>
      <div
        className="w-[95%] fixed top-4 left-1/2
        -translate-x-1/2
        bg-gradient-to-r from-green-500
        to-green-700 rounded-2xl
        shadow-lg shadow-black/20
        flex justify-between items-center
        h-20 px-4 md:px-8 z-50"
      >

        <Link
          to="/"
          className="text-white
          font-extrabold text-2xl
          sm:text-3xl"
        >
          Quickcart
        </Link>

        

        <div
          className="flex items-center
          gap-3 md:gap-6 relative"
        >

          <div
            className="bg-white rounded-full
            w-11 h-11 flex items-center
            justify-center md:hidden
            cursor-pointer"
            onClick={() =>
              setSearchBarOpen(
                (prev) => !prev
              )
            }
          >
            <Search
              className="text-green-600
              w-6 h-6"
            />
          </div>

          {(!user ||
            user?.role !==
              "admin") && (
            <Link
              to="/cart"
              className="relative
              bg-white rounded-full
              w-11 h-11 flex
              items-center justify-center"
            >

              <ShoppingCart
                className="text-green-600
                w-6 h-6"
              />

              <span
                className="absolute
                -top-1 -right-1
                bg-red-500 text-white
                text-xs w-5 h-5
                flex items-center
                justify-center
                rounded-full"
              >
                {totalQuantity}
              </span>
            </Link>
          )}

          {!user ? (

            <Link
              to="/login"
              className="bg-white
              text-green-700 px-5 py-2
              rounded-full font-semibold
              hover:bg-green-100
              transition"
            >
              Login
            </Link>

          ) : (

            <div
              className="relative"
              ref={
                profileDropDown
              }
            >

              <div
                className="bg-white
                rounded-full w-11 h-11
                flex items-center
                justify-center
                overflow-hidden
                cursor-pointer"
                onClick={() =>
                  setOpen(
                    (prev) => !prev
                  )
                }
              >
                <User />
              </div>

              <AnimatePresence>

                {open && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                    }}
                    className="absolute right-0
                    mt-3 w-56 bg-white
                    rounded-2xl shadow-xl
                    p-3 z-[999]"
                  >

                    <div
                      className="flex items-center
                      gap-3 px-3 py-2
                      border-b"
                    >

                      <div
                        className="w-10 h-10
                        rounded-full bg-green-100
                        flex items-center
                        justify-center"
                      >
                        <User />
                      </div>

                      <div>

                        <div
                          className="text-gray-800
                          font-semibold"
                        >
                          {user?.name}
                        </div>

                        <div
                          className="text-xs
                          text-gray-500 capitalize"
                        >
                          {user?.role}
                        </div>
                      </div>
                    </div>

                    {user?.role ===
                    "admin" ? (
                      <>
                        <Link
                          to="/admin"
                          className="flex items-center
                          gap-2 px-3 py-3
                          hover:bg-green-50
                          rounded-lg
                          text-gray-700
                          font-medium"
                        >
                          <Boxes
                            className="w-5 h-5
                            text-green-600"
                          />

                          Admin Dashboard
                        </Link>

                        <button
                          className="flex items-center
                          gap-2 w-full text-left
                          px-3 py-3
                          hover:bg-red-50
                          rounded-lg
                          text-gray-700
                          font-medium"
                          onClick={
                            handleLogout
                          }
                        >
                          <LogOut
                            className="w-5 h-5
                            text-red-600"
                          />

                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/my-orders"
                          className="flex items-center
                          gap-2 px-3 py-3
                          hover:bg-green-50
                          rounded-lg
                          text-gray-700
                          font-medium"
                        >
                          <Package
                            className="w-5 h-5
                            text-green-600"
                          />

                          My Orders
                        </Link>

                        <button
                          className="flex items-center
                          gap-2 w-full text-left
                          px-3 py-3
                          hover:bg-red-50
                          rounded-lg
                          text-gray-700
                          font-medium"
                          onClick={
                            handleLogout
                          }
                        >
                          <LogOut
                            className="w-5 h-5
                            text-red-600"
                          />

                          Logout
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Nav;