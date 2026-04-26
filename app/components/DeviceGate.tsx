"use client";

import { useEffect, useState } from "react";

export default function DeviceGate({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024); // 👈 breakpoint
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!isDesktop) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white text-center p-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">💻 Desktop Only</h1>
          <p className="text-sm opacity-70">
            This experience is designed for larger screens.  
            Please open on a laptop or desktop.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}