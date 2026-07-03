import React from "react";
import { motion } from "framer-motion";
import bgImage from "@assets/фон_1771937139052.jpeg";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-black">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={bgImage} 
          alt="Abstract Dark Background" 
          className="w-full h-full object-cover opacity-90" 
        />
        {/* Gradients to ensure text readability and blend edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Decorative ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Content Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[420px]"
      >
        {children}
      </motion.div>
    </div>
  );
}
