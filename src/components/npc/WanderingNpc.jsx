"use client";

import { useEffect, useRef, useState } from "react";

export default function WanderingNPC({
  startX,
  startY,
  radius = 120,
  speed = 1,
  isPaused = false,
  colliders = [],
  worldWidth,
  worldHeight,
}) {
  const [pos, setPos] = useState({ x: startX, y: startY });
  const dirRef = useRef({ x: 0, y: 0 });
  const timerRef = useRef(0);
  const stateRef = useRef("idle"); // idle | walk

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const collides = (x, y) =>
    colliders.some(
      (c) =>
        x > c.x - c.w / 2 &&
        x < c.x + c.w / 2 &&
        y > c.y - c.h / 2 &&
        y < c.y + c.h / 2
    );

  useEffect(() => {
    if (isPaused) return;

    let raf;

    const loop = () => {
      timerRef.current -= 1;

      if (timerRef.current <= 0) {
        if (stateRef.current === "idle") {
          // switch to walking
          stateRef.current = "walk";
          timerRef.current = 60 + Math.random() * 120;

          const angle = Math.random() * Math.PI * 2;
          dirRef.current = {
            x: Math.cos(angle),
            y: Math.sin(angle),
          };
        } else {
          // switch to idle
          stateRef.current = "idle";
          timerRef.current = 40 + Math.random() * 80;
          dirRef.current = { x: 0, y: 0 };
        }
      }

      if (stateRef.current === "walk") {
        setPos((p) => {
          let nx = p.x + dirRef.current.x * speed;
          let ny = p.y + dirRef.current.y * speed;

          // keep within wander radius
          const dist = Math.hypot(nx - startX, ny - startY);
          if (dist > radius) {
            nx = p.x;
            ny = p.y;
            stateRef.current = "idle";
            timerRef.current = 40;
          }

          // collision
          if (collides(nx, p.y)) nx = p.x;
          if (collides(p.x, ny)) ny = p.y;

          return {
            x: clamp(nx, 16, worldWidth - 16),
            y: clamp(ny, 16, worldHeight - 16),
          };
        });
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isPaused, colliders, radius, speed, startX, startY, worldWidth, worldHeight]);

  return (
    <div
      className="absolute z-10"
      style={{
        left: pos.x,
        top: pos.y,
        width: 28,
        height: 28,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="h-5 w-5 rounded-full bg-orange-400 border-2 border-black" />
    </div>
  );
}
