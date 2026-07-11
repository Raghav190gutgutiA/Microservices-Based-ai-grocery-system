// src/modules/auth/pages/ResetPasswordPage.jsx

import React, { useState } from "react";

import { motion } from "framer-motion";

import {
  Lock,
  KeyRound,
  CheckCircle,
} from "lucide-react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import AnimatedButton from "../../shared/components/AnimatedButton";

import { resetPassword } from "../api/authApi";

function ResetPasswordPage() {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const token =
    searchParams.get("token");

  const [loading, setLoading] =
    useState(false);

  const [passwords, setPasswords] =
    useState({
      password: "",
      confirmPassword: "",
    });

  const handleResetPassword = async (
    e
  ) => {
    e.preventDefault();

    if (
      passwords.password !==
      passwords.confirmPassword
    ) {
      return alert(
        "Passwords do not match"
      );
    }

    try {
      setLoading(true);

      // EXACT BACKEND PAYLOAD

      const payload = {
        token: token,
        newPassword:
          passwords.password,
      };

      console.log(payload);

      const response =
        await resetPassword(
          payload
        );

      console.log(response);

      alert(
        "Password reset successful"
      );

      navigate("/login");
    } catch (error) {
      console.log(
        error.response?.data ||
          error.message
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
          <div
            className="
            w-20
            h-20
            rounded-3xl
            bg-green-500/20
            flex
            items-center
            justify-center
            border border-green-400/20
            mb-8
          "
          >
            <KeyRound className="text-white w-10 h-10" />
          </div>

          <h1 className="text-5xl font-black text-white">
            Reset Password
          </h1>

          <p className="text-green-100 mt-5 text-lg leading-relaxed">
            Create a new strong password
            for your account security.
          </p>

          <form
            onSubmit={
              handleResetPassword
            }
            className="space-y-6 mt-10"
          >
            <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-5 py-5">
              <Lock className="text-green-200 w-6 h-6" />

              <input
                type="password"
                placeholder="New Password"
                required
                value={
                  passwords.password
                }
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    password:
                      e.target.value,
                  })
                }
                className="bg-transparent outline-none text-white w-full text-lg placeholder:text-green-100"
              />
            </div>

            <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-5 py-5">
              <CheckCircle className="text-green-200 w-6 h-6" />

              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={
                  passwords.confirmPassword
                }
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword:
                      e.target.value,
                  })
                }
                className="bg-transparent outline-none text-white w-full text-lg placeholder:text-green-100"
              />
            </div>

            <AnimatedButton
              type="submit"
              loading={loading}
            >
              Reset Password
            </AnimatedButton>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default ResetPasswordPage;