import Image from "next/image"

export default function HeroImage() {
  return (
    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10">
      <Image
        src="/me.png"
        alt="Priyanshu"
        width={220}
        height={220}
        className="rounded-full shadow-xl"
      />
    </div>
  )
}
