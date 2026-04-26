"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function ProjectTree() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      {/* SEED */}
      <motion.div
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer"
      >
        <Image
          src="/stickers/seed.png"
          alt="Projects"
          width={120}
          height={120}
        />
      </motion.div>

      {/* BRANCHES */}
      {open && <Branches />}
    </div>
  );
}
