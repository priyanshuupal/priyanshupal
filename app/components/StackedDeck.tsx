"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const cards = [
  "Hii, I'M Priyanshu Pal, from india, an emerging BSCIT final year stydent, with average of CGPA 9.46.",
  "I have good command in software development, likes to create creative and interactive websites like this portfolio 😎.",
  "Always eager to learn and inspire from others.",
  "Some usefull big projects like langopal: A language learning platform.",
  "Some of small and mini projects like RPS Dash and wheather application.",
  "Can create latest modern software with inclding AI help, knowledge, and advancement.",
  "Let's work together 😉, contact me via E-mail or WhatsApp.",
  "Likes to vibe code and learn new things 😄.",
];

export default function StackedDeck() {
  const [active, setActive] = useState(0);

  // 🔼 move up
  const prevCard = () => {
    setActive((prev) => Math.max(prev - 1, 0));
  };

  // 🔽 move down
  const nextCard = () => {
    setActive((prev) => Math.min(prev + 1, cards.length - 1));
  };

  // ⌨️ keyboard control (IMPORTANT UX)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") prevCard();
      if (e.key === "ArrowDown") nextCard();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="relative w-[380px] h-[260px] mx-auto mt-20">

      {/* 🔼🔽 ARROWS */}
      <div className="absolute -top-12 right-0 z-50 flex items-center gap-3">
        
        <button
          onClick={prevCard}
          disabled={active === 0}
          className="w-8 h-8 rounded-full border border-white text-white disabled:opacity-30"
        >
          ↑
        </button>

        <span className="text-white text-sm opacity-70">
          {active + 1} / {cards.length}
        </span>

        <button
          onClick={nextCard}
          disabled={active === cards.length - 1}
          className="w-8 h-8 rounded-full border border-white text-white disabled:opacity-30"
        >
          ↓
        </button>

      </div>

      {/* 🃏 CARDS */}
      <div className="relative w-full h-full flex items-center justify-center">
        {cards.map((text, i) => {
          const offset = i - active;

          return (
            <motion.div
              key={i}
              className="absolute w-full h-full rounded-3xl bg-black border-2 border-white p-8 text-white shadow-2xl"
              animate={{
                y: offset * 20,                      // vertical stack
                scale: 1 - Math.abs(offset) * 0.10,  // depth
                opacity: offset === 0 ? 1 : 0.8,     // focus
                zIndex: 100 - Math.abs(offset),
                filter: offset === 0 ? "none" : "blur(2px)",
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
              }}
            >
              <TypingText text={text} active={offset === 0} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function TypingText({ text, active }: { text: string; active: boolean }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) return;

    setDisplayed("");
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [active, text]);

  return (
    <p className="text-xl leading-relaxed tracking-wide font-mono">
      {displayed}
    </p>
  );
}