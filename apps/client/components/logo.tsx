"use client";

import { siteConfig } from "@/config/site";
import { useScramble } from "use-scramble";

export const Logo = () => {
  // hook returns a ref
  const { ref, replay } = useScramble({
    text: "unlogg",
    // tick: 5,
    overdrive: true,
    // seed: 2,
    // scramble: 5,

    tick: 3,
  });

  return (
    <div
      ref={ref}
      onMouseOver={replay}
      onFocus={replay}
      className="text-xl font-semibold text-nowrap sm:inline-block logo-font grow w-full"
    >
      {siteConfig.name}
    </div>
  );
};
