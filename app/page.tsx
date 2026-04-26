"use client"

import { useState } from "react"
import IntroLoader from "./components/IntroLoader"
import StickerWall from "./components/StickerWall"
import StackedDeck from "./components/StackedDeck"
import Hero from "./components/hero"
import DeviceGate from "./components/DeviceGate"

export default function Home() {
  const [loadingDone, setLoadingDone] = useState(false)

  return (
    <DeviceGate>
    <main className="min-h-screen bg-black flex flex-col items-center justify-center">
      {!loadingDone && <IntroLoader onFinish={() => setLoadingDone(true)} />}
      <StickerWall />
      <Hero />
      <StackedDeck />
    </main>
    </DeviceGate>
  )
}
