"use client";

import { useEffect, useRef } from "react";

export function usePlayerMovement(setPosition, isLocked = false) {
  const keys = useRef({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      keys.current[e.key] = true;
    };

    const handleKeyUp = (e) => {
      keys.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (isLocked) return;

    let raf;
    const speed = 2;

    const loop = () => {
      setPosition((pos) => {
        let x = pos.x;
        let y = pos.y;

        if (keys.current["w"] || keys.current["ArrowUp"]) y -= speed;
        if (keys.current["s"] || keys.current["ArrowDown"]) y += speed;
        if (keys.current["a"] || keys.current["ArrowLeft"]) x -= speed;
        if (keys.current["d"] || keys.current["ArrowRight"]) x += speed;

        return { x, y };
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isLocked, setPosition]);
}
