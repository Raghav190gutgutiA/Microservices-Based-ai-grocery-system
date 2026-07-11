

import React from "react";
import { motion } from "framer-motion";

function AnimatedButton({
  children,
  loading = false,
  type = "button",
  onClick,
  className = "",
}) {
  return (
    <motion.button
      whileHover={{ scale: loading ? 1 : 1.03 }}
      whileTap={{ scale: loading ? 1 : 0.97 }}
      disabled={loading}
      type={type}
      onClick={onClick}
      className={`
        relative overflow-hidden
        w-full py-4 rounded-2xl
        font-bold text-lg
        flex items-center justify-center gap-3
        transition-all duration-300

        bg-white text-green-700
        hover:bg-green-100

        disabled:cursor-not-allowed
        disabled:opacity-80

        shadow-lg shadow-green-500/20

        ${className}
      `}
    >
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />

      {loading ? (
        <div className="flex items-center gap-3 relative z-10">
          <div className="relative w-6 h-6">
            <span className="absolute inset-0 rounded-full border-[3px] border-green-300" />

            <span className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-green-700 animate-spin" />
          </div>

          <span className="tracking-wide">
            Processing...
          </span>
        </div>
      ) : (
        <div className="relative z-10 flex items-center gap-2">
          {children}
        </div>
      )}
    </motion.button>
  );
}

export default AnimatedButton;