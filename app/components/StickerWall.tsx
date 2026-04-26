"use client";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Rotate3D } from "lucide-react";
import PokeballAnimation from "./PokeballAnimation";

export default function StickerWall() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showEmailBox, setShowEmailBox] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [walking, setWalking] = useState(false);
  const [flyingIndex, setFlyingIndex] = useState<number | null>(null);

  const stickers = [
    {
      src: "/stickers/shoes.png",
      top: "20%",
      right: "10%",
      size: 120,
      type: "walk",
    },
    {
      src: "/stickers/phone.png",
      top: "3%",
      left: "33%",
      size: 100,
      type: "whatsapp",
    },
    {
      src: "/stickers/whatsapp.png",
      top: "25%",
      right: "25%",
      size: 140,
      type: "whatsapp",
    },
    {
      src: "/stickers/rohit.png",
      top: "70%",
      right: "15%",
      size: 220,
    },
    {
      src: "/stickers/indianflag.png",
      top: "-4%",
      right: "30%",
      size: 280,
    },
    {
      src: "/stickers/linkedin.png",
      top: "45%",
      right: "28%",
      size: 130,
      type: "linkedin",
    },
    {
      src: "/stickers/bottle.png",
      top: "68%",
      right: "25%",
      size: 160,
    },
    {
      src: "/stickers/headphone.png",
      top: "75%",
      right: "38%",
      size: 160,
    },
    {
      src: "/stickers/laptop.png",
      top: "55%",
      right: "15%",
      size: 140,
      type: "email",
    },
    { src: "/stickers/cycle.png", top: "4%", left: "15%", size: 220 },
    {
      src: "/stickers/aeroeplane.png",
      top: "-2%",
      right: "10%",
      size: 200,
      type: "plane",
    },
    {
      src: "/stickers/EmailMe.png",
      top: "10%",
      right: "25%",
      size: 100,
      type: "email",
    },
    {
      src: "/stickers/Pokeball.png",
      top: "75%",
      left: "4%",
      size: 180,
      type: "pokeball",
    },
    { src: "/stickers/html.png", top: "40%", left: "20%", size: 80, skill: 92 },
    { src: "/stickers/mongodb.png", top: "27%", left: "15%", size: 120, skill: 48 },
    { src: "/stickers/mysql.png", top: "80%", left: "16%", size: 120, skill: 58 },
    { src: "/stickers/figma.png", top: "44%", left: "30%", size: 100, skill: 42 },
    { src: "/stickers/css.png", top: "30%", left: "32%", size: 70, skill: 89 },
    { src: "/stickers/js.png", top: "55%", left: "23%", size: 70, skill: 80 },
    {
      src: "/stickers/reactjs.png",
      top: "84%",
      left: "36%",
      size: 70,
      skill: 70,
    },
    {
      src: "/stickers/nodejs.png",
      top: "75%",
      left: "30%",
      size: 80,
      skill: 75,
    },
    {
      src: "/stickers/tailwind.png",
      top: "71%",
      left: "23%",
      size: 80,
      skill: 25,
    },
  ];

  useEffect(() => {
    console.log("PUBLIC KEY:", process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
    console.log("SERVICE ID:", process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
    console.log("TEMPLATE ID:", process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.2;
      audioRef.current.play();
    }
  };
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  const sendEmail = async () => {
    if (!email) return toast("Enter Email");
    if (!message) return toast("Enter Message");

    setLoading(true);

    try {
      const res = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          user_email: email,
          user_message: message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      if (res.status === 200) {
        toast.success("Email sent successfully ✅"); // ✅ SUCCESS TOAST
      }
      setShowEmailBox(false);
      setEmail("");
      setMessage("");
    } catch (error: any) {
      console.error("EMAIL ERROR:", error);
      toast("Failed to send email ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "919076189264"; // your number
    const message = "Hello, I got your number from your portfolio.";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleLinkedinclick = () => {
    const url = `https://www.linkedin.com/in/priyanshu-pal-14121828a/`;
    window.open(url, "_blank");
  };

  const getColor = (value: number) => {
    if (value <= 30) return "#FF3131"; // red
    if (value <= 60) return "#ffff00"; // yellow
    return "#0FFF50"; // greens
  };

  return (
    <>
      <audio ref={audioRef} src="/click.mp3" />

      <div className="absolute inset-0 z-10">
        {stickers.map((s, i) => {
          const isTech = typeof s.skill === "number";

          // Only calculate ring if tech sticker
          const stroke = 6;
          const radius = s.size / 2 - stroke / 1;
          const circumference = 2 * Math.PI * radius;
          const progress = activeIndex === i ? (s.skill ?? 0) : 0;
          const offset = circumference - (progress / 100) * circumference;

          return (
            <div
              key={i}
              className="absolute flex items-center justify-center cursor-pointer"
              style={{
                top: s.top,
                ...(s.left && { left: s.left }),
                ...(s.right && { right: s.right }),
                width: s.size,
                height: s.size,
              }}
              onClick={() => {
                playSound();
                if (s.type === "walk") {
                  setWalking(true);
                  setTimeout(() => setWalking(false), 2000); // stop after 2 sec
                }
                if (isTech) setActiveIndex(i); // only tech stickers animate
                if (s.type === "email") {
                  setShowEmailBox(true);
                }
                if (s.type === "whatsapp") {
                  handleWhatsAppClick();
                }
                if (s.type === "linkedin") {
                  handleLinkedinclick();
                }
                if (s.type === "plane") {
                  setFlyingIndex(i);

                  setTimeout(() => {
                    setFlyingIndex(null); // reset after animation
                  }, 2000);
                }
              }}
            >
              {/* 🟢 ONLY TECH STICKERS GET PROGRESS RING */}
              {isTech && (
                <svg
                  width={s.size}
                  height={s.size}
                  className="absolute -rotate-90"
                >
                  {/* <circle
                    cx={s.size / 2}
                    cy={s.size / 2}
                    r={radius}
                    stroke="#222"
                    strokeWidth="6"
                    fill="transparent"
                  /> */}
                  <circle
                    cx={s.size / 2}
                    cy={s.size / 2}
                    r={radius}
                    stroke={getColor(s.skill!)}
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
              )}

              {/* Sticker Image */}
              <motion.div
                className="relative w-full h-full p-[10%]"
                animate={
                  s.type === "walk" && walking
                    ? { x: [0, 50, 0], rotate: [0, -10, 10, 0] }
                    : s.type === "plane" && flyingIndex === i
                      ? {
                          x: [0, 120, -1260, 0], // horizontal loop
                          y: [0, -80, 80, 0], // upward arc
                          rotate: [0, 10, -10, 0],
                        }
                      : {}
                }
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                {s.type === "pokeball" ? (
                  <PokeballAnimation size={s.size} />
                ) : (
                  <Image
                    src={s.src}
                    alt=""
                    fill
                    className="object-contain hover:scale-110 transition"
                  />
                )}
              </motion.div>

              {/* % only for tech stickers */}
              {isTech && activeIndex === i && (
                <span className="absolute text-[10px] font-bold text-white">
                  {s.skill}%
                </span>
              )}
            </div>
          );
        })}
      </div>
      {showEmailBox && (
        <div className="fixed inset-0 z-999 bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-900 rounded-xl p-6 w-340px relative">
            {/* Close */}
            <button
              onClick={() => setShowEmailBox(false)}
              className="absolute top-2 right-3 text-zinc-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4 text-white">
              Send me a message ✉️
            </h2>

            {/* EMAIL FIELD */}
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-black border border-zinc-700 mb-3 outline-none text-white"
            />

            {/* MESSAGE FIELD */}
            <textarea
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full p-2 rounded bg-black border border-zinc-700 mb-4 outline-none resize-none text-white"
            />

            {/* SEND BUTTON */}
            <button
              onClick={sendEmail}
              disabled={loading}
              className="w-full bg-white text-black py-2 rounded font-medium hover:bg-zinc-200 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
