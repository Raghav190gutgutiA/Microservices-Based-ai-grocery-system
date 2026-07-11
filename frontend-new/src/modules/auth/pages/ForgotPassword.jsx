// src/modules/auth/pages/ForgotPasswordPage.jsx

import React, { useState } from "react";

import { motion } from "framer-motion";

import {
  Mail,
  Send,
  ArrowLeft,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import AnimatedButton from "../../shared/components/AnimatedButton";

import { forgotPassword } from "../api/authApi";

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setMessage("");

      const payload = {
        email,
      };

      const response = await forgotPassword(
        payload
      );

      console.log(response);

      setMessage(
        response.message ||
          "Reset link sent successfully"
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message ||
          "Something went wrong"
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
      flex
      items-center
      justify-center
      p-4
      relative
      overflow-hidden
    "
    >
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-green-500/20 rounded-full blur-3xl" />

      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl" />

      <motion.div
        initial={{
          opacity: 0,
          y: 60,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
        relative
        z-10
        w-full
        max-w-xl
      "
      >
        <div
          className="
          backdrop-blur-2xl
          bg-white/5
          border border-white/10
          rounded-[35px]
          overflow-hidden
          p-8
          sm:p-10
          shadow-[0_0_60px_rgba(0,255,120,0.12)]
        "
        >
          <Link
            to="/login"
            className="
            inline-flex
            items-center
            gap-2
            text-green-100
            hover:text-white
            transition-all
            mb-8
          "
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Login
          </Link>

          <h1 className="text-5xl font-black text-white">
            Forgot Password
          </h1>

          <p className="text-green-100 mt-5 text-lg leading-relaxed">
            Enter your registered email address and we
            will send you password reset instructions.
          </p>

          <form
            onSubmit={handleForgotPassword}
            className="space-y-6 mt-10"
          >
            <div
              className="
              flex items-center gap-4
              bg-white/10
              border border-white/10
              rounded-2xl
              px-5 py-5
            "
            >
              <Mail className="text-green-200 w-6 h-6" />

              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                bg-transparent
                outline-none
                text-white
                w-full
                text-lg
                placeholder:text-green-100
              "
              />
            </div>

            {message && (
              <div
                className="
                text-center
                text-sm
                text-green-200
                bg-green-500/10
                border border-green-400/20
                py-3
                rounded-xl
              "
              >
                {message}
              </div>
            )}

            <AnimatedButton
              type="submit"
              loading={loading}
            >
              Send Reset Link
              <Send className="w-5 h-5" />
            </AnimatedButton>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPasswordPage;