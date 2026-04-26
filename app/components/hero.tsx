"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="absolute rotate-1 top-[-60] left-1/2 -translate-x-1/2 z-1">
      
      {/* Background Glow */}
      <div className="absolute w-50 h-50 bg-white/10 blur-[120px]" />

      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 80 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10"
      >
        <Image
          src="/me.png"
          alt="Priyanshu Pal"
          width={250}
          height={250}
          className="object-contain"
          priority
        />
      </motion.div>

    </section>
  )
}
