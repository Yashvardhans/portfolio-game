"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import elderTalk from "@/assets/npc/elder/elder_talk.png";
import elderIdle from "@/assets/npc/elder/elder_idle.png";

export default function ElderNPC({
  x = 1200,
  y = 1200,
  isTalking = false,
  onClick = () => {},
}) {
  const [showHint, setShowHint] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 2500);
    return () => clearTimeout(t);
  }, []);

  const spriteSrc = isTalking ? elderTalk : elderIdle;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="The Elder"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute select-none"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -100%)", // feet anchored
        imageRendering: "pixelated",
        zIndex: 10,
      }}
    >
      {/* Nameplate (pixel style) */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <div
          className="px-2 py-[1px] text-[10px] font-bold text-white"
          style={{
            background: "#14532d",
            border: "1px solid #052e16",
            boxShadow: "0 1px 0 #052e16",
          }}
        >
          The Elder
        </div>
      </div>

      {/* Speech hint */}
      {(showHint || hovered) && !isTalking && (
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2"
          style={{ zIndex: 20 }}
        >
          <div
            className="px-2 py-[1px] text-[10px] font-medium text-emerald-950"
            style={{
              background: "#fefce8",
              border: "1px solid #a16207",
              boxShadow: "0 1px 0 #a16207",
            }}
          >
            Click to talk
          </div>
        </div>
      )}

      {/* Sprite + shadow */}
      <div className="relative flex items-end justify-center">
        {/* Pixel shadow */}
        <div
          aria-hidden
          className="absolute -bottom-1 left-1/2 -translate-x-1/2"
          style={{
            width: 18,
            height: 4,
            background: "rgba(0,0,0,0.35)",
          }}
        />

        {/* Sprite (NO SCALING DISTORTION) */}
        <Image
  src={spriteSrc}
  alt="The Elder"
  draggable={false}
  priority
  style={{
    width: 300,          
    height: "auto",
    imageRendering: "auto", // painterly blend
    display: "block",
    zIndex: 30,
    transformOrigin: "50% 100%",
  }}
/>

      </div>
    </div>
  );
}
