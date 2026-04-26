"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function PokeballAnimation({ size = 120 }) {
  const [stage, setStage] = useState("idle");
  const [opened, setOpened] = useState(false);

  const handleClick = async () => {
    if (stage !== "idle") return;

    setStage("shake");

    setTimeout(() => {
      setStage("flash");
    }, 2000);

    setTimeout(() => {
      setStage("open");
      setOpened(true);
    }, 2300);
  };

  const projects = [
    {
      img: "/projects/langopal.png",
      link: "https://langopal.vercel.app/",
    },
    {
      img: "/projects/RPSDash.png",
      link: "https://rpsdash.vercel.app/",
    },
    {
      img: "/projects/wheatherApp.svg",
      link: "https://mausam-aaj-ka.vercel.app/",
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* 🔴 Pokeball */}
      <AnimatePresence>
        {stage !== "opened" && (
          <motion.img
            src="stickers/Pokeball.png" // put image in public folder
            onClick={handleClick}
            initial={{ scale: 1 }}
            animate={
              stage === "shake"
                ? {
                    x: [0, -10, 10, -10, 10, 0],
                    rotate: [0, -10, 10, -10, 10, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.4,
              repeat: stage === "shake" ? 5 : 0,
            }}
            exit={{ scale: 0, opacity: 0 }}
            className="w-40 cursor-pointer z-20"
          />
        )}
      </AnimatePresence>

      {/* ⚡ Flash Effect */}
      <AnimatePresence>
        {stage === "flash" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-white z-30 h-50 w-50 rounded-4xl"
          />
        )}
      </AnimatePresence>

      {/* 💥 PROJECT IMAGES BURST */}
      {stage === "open" && (
        <div className="absolute bottom-0 flex items-end justify-center w-full">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{
                y: 0,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                y: -220 - i * 150,
                x: (i - 1) * -70,
                scale: 0.9,
                opacity: 1,
                rotate: (i - 1) * 20,
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.2,
                type: "spring",
              }}
              className="absolute cursor-pointer z-99"
              onClick={() => window.open(project.link, "_blank")}
            >
              <Image
                src={project.img}
                alt="project"
                width={110}
                height={110}
                className="rounded-lg shadow-xl hover:scale-110 transition"
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
