"use client"

import { useEffect, useState, useRef } from "react"

export default function IntroLoader({ onFinish }: { onFinish: () => void }) {
  const fullText = "Priyanshu Pal"
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioUnlocked = useRef(false)

  // Create audio
  useEffect(() => {
    audioRef.current = new Audio("/type.mp3")
    audioRef.current.volume = 0.3
  }, [])

  // 🔓 Unlock audio after user interaction
  useEffect(() => {
    const unlock = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            audioRef.current?.pause()
            audioRef.current!.currentTime = 0
            audioUnlocked.current = true
            console.log("Audio unlocked")
          })
          .catch(() => {})
      }
    }

    window.addEventListener("click", unlock, { once: true })
    window.addEventListener("touchstart", unlock, { once: true })

    return () => {
      window.removeEventListener("click", unlock)
      window.removeEventListener("touchstart", unlock)
    }
  }, [])

  // Typing logic
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index])

        if (audioRef.current && audioUnlocked.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play().catch(() => {})
        }

        setIndex(index + 1)
      }, 160)

      return () => clearTimeout(timeout)
    } else {
      const finishTimeout = setTimeout(() => {
        onFinish()
      }, 1100)

      return () => clearTimeout(finishTimeout)
    }
  }, [index, fullText, onFinish])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <h1 className="font-bitcount text-white text-5xl md:text-8xl tracking-widest">
        {text}
        <span className="cursor">|</span>
      </h1>
    </div>
  )
}
