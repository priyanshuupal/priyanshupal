"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 🔊 Unlock audio on first user interaction
    const unlockAudio = () => {
      const audio = new Audio();
      audio.play().catch(() => {});
    };

    window.addEventListener("click", unlockAudio, { once: true });

    return () => {
      lenis.destroy();
      window.removeEventListener("click", unlockAudio);
    };
  }, []);

  return null;
}
