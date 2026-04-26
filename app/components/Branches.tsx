import {motion} from "framer-motion";
export default function Branches() {
  return (
    <>
      {/* LEFT BRANCH */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute w-40 h-[3px] bg-green-700 origin-right"
        style={{ left: "50%", top: "50%", rotate: "-30deg" }}
      />

      {/* RIGHT BRANCH */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute w-40 h-[3px] bg-green-700 origin-left"
        style={{ left: "50%", top: "50%", rotate: "30deg" }}
      />

      {/* LEAVES */}
      <Leaves />
    </>
  );
}
