import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  Mail,
  Lock,
  User,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";

import {
  loginUser,
  registerUser,
} from "../api/authApi";
import { setUser } from "../slices/authSlice";
import { useDispatch } from "react-redux";

function AuthPage() {

  const dispatch = useDispatch();
  const location = useLocation();

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(
    location.pathname === "/login"
  );

  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "user",
    });

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const payload = {
        email: loginData.email,
        password: loginData.password,
      };

      const response = await loginUser(payload);
      
      localStorage.setItem("token",response.token)
   
      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

	  console.log("checking response",response)
     
	  dispatch(setUser({
       "user":response.user,
	//    "token":response.token
	  }))
      navigate(
        response.user.role === "admin"
          ? "/admin"
          : "/"
      );

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const payload = {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,

        role:
          registerData.role === "seller"
            ? "admin"
            : "user",
      };

      const response = await registerUser(payload);

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      navigate(
        response.user.role === "admin"
          ? "/admin"
          : "/"
      );

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-green-950
      via-green-900
      to-black
      overflow-hidden
      relative
      flex
      items-center
      justify-center
      px-4
      py-10
    "
    >

      <div className="absolute top-[-120px] left-[-120px] w-[450px] h-[450px] bg-green-500/20 rounded-full blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-emerald-400/10 rounded-full blur-3xl" />

      <div
        className="
        relative z-10
        w-full
        max-w-7xl
        min-h-[85vh]
        rounded-[40px]
        overflow-hidden
        border border-white/10
        backdrop-blur-2xl
        bg-white/5
        shadow-[0_0_60px_rgba(0,255,120,0.12)]
        grid
        lg:grid-cols-2
      "
      >

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="
          hidden
          lg:flex
          flex-col
          justify-between
          relative
          p-14
          overflow-hidden
          bg-gradient-to-br
          from-green-500/20
          to-transparent
        "
        >

          <div className="relative z-10">

            <div
              className="
              w-20
              h-20
              rounded-3xl
              bg-white/10
              flex
              items-center
              justify-center
              border border-white/10
            "
            >
              <ShoppingBag className="text-white w-10 h-10" />
            </div>

            <h1 className="text-6xl font-black text-white mt-10">
              Quickcart
            </h1>

            <p className="text-green-100/90 text-xl mt-6 leading-relaxed max-w-lg">
              Smart grocery shopping experience with
              premium UI and lightning-fast delivery.
            </p>
          </div>

          <div className="space-y-5">

            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-full bg-green-400" />

              <p className="text-white text-lg">
                Fast Delivery
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-full bg-green-400" />

              <p className="text-white text-lg">
                Premium Grocery Collection
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-full bg-green-400" />

              <p className="text-white text-lg">
                Secure Payments
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="
          flex
          items-center
          justify-center
          p-6
          sm:p-10
          lg:p-16
        "
        >

          <div className="w-full max-w-xl">

            <div className="text-center">

              <motion.h1
                key={isLogin ? "login" : "register"}
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                text-5xl
                font-black
                text-white
              "
              >
                {isLogin
                  ? "Welcome Back"
                  : "Create Account"}
              </motion.h1>

              <p className="text-green-100 mt-5 text-lg">
                {isLogin
                  ? "Login to continue shopping"
                  : "Join Quickcart today"}
              </p>
            </div>

            <div className="flex bg-white/5 p-2 rounded-2xl mt-10 border border-white/10">

              <button
                onClick={() => setIsLogin(true)}
                className={`
                  flex-1 py-4 rounded-xl
                  font-bold text-lg transition-all

                  ${
                    isLogin
                      ? "bg-white text-green-700"
                      : "text-white"
                  }
                `}
              >
                Login
              </button>

              <button
                onClick={() =>
                  setIsLogin(false)
                }
                className={`
                  flex-1 py-4 rounded-xl
                  font-bold text-lg transition-all

                  ${
                    !isLogin
                      ? "bg-white text-green-700"
                      : "text-white"
                  }
                `}
              >
                Register
              </button>
            </div>

            <div className="mt-10">

              <AnimatePresence mode="wait">

                {isLogin ? (

                  <motion.form
                    key="login"
                    initial={{
                      opacity: 0,
                      x: 50,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -50,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    onSubmit={handleLogin}
                    className="space-y-6"
                  >

                    <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-5 py-5">
                      <Mail className="text-green-200 w-6 h-6" />

                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            email:
                              e.target.value,
                          })
                        }
                        className="bg-transparent outline-none text-white w-full text-lg placeholder:text-green-100"
                      />
                    </div>

                    <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-5 py-5">
                      <Lock className="text-green-200 w-6 h-6" />

                      <input
                        type="password"
                        placeholder="Password"
                        required
                        value={
                          loginData.password
                        }
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password:
                              e.target.value,
                          })
                        }
                        className="bg-transparent outline-none text-white w-full text-lg placeholder:text-green-100"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Link
                        to="/forgot-password"
                        className="text-green-100 hover:text-white transition-all text-sm font-medium"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-white text-green-700 hover:bg-green-100 transition-all rounded-2xl py-5 font-bold text-lg flex items-center justify-center gap-3"
                    >
                      {loading
                        ? "Loading..."
                        : "Login"}

                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.form>

                ) : (

                  <motion.form
                    key="register"
                    initial={{
                      opacity: 0,
                      x: 50,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -50,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    onSubmit={
                      handleRegister
                    }
                    className="space-y-6"
                  >

                    <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-5 py-5">
                      <User className="text-green-200 w-6 h-6" />

                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={
                          registerData.name
                        }
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            name:
                              e.target.value,
                          })
                        }
                        className="bg-transparent outline-none text-white w-full text-lg placeholder:text-green-100"
                      />
                    </div>

                    <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-5 py-5">
                      <Mail className="text-green-200 w-6 h-6" />

                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={
                          registerData.email
                        }
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            email:
                              e.target.value,
                          })
                        }
                        className="bg-transparent outline-none text-white w-full text-lg placeholder:text-green-100"
                      />
                    </div>

                    <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-5 py-5">
                      <Lock className="text-green-200 w-6 h-6" />

                      <input
                        type="password"
                        placeholder="Password"
                        required
                        value={
                          registerData.password
                        }
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password:
                              e.target.value,
                          })
                        }
                        className="bg-transparent outline-none text-white w-full text-lg placeholder:text-green-100"
                      />
                    </div>

                    <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-5 py-5">

                      <User className="text-green-200 w-6 h-6" />

                      <select
                        value={registerData.role}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            role: e.target.value,
                          })
                        }
                        className="bg-transparent outline-none text-white w-full text-lg"
                      >
                        <option
                          value="user"
                          className="text-black"
                        >
                          User
                        </option>

                        <option
                          value="seller"
                          className="text-black"
                        >
                          Seller
                        </option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-white text-green-700 hover:bg-green-100 transition-all rounded-2xl py-5 font-bold text-lg flex items-center justify-center gap-3"
                    >
                      {loading
                        ? "Loading..."
                        : "Register"}

                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AuthPage;