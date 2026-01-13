"use client";

import { useEffect, useRef, useState } from "react";
import WorldViewport from "@/components/world/WorldViewport";
import WorldLayer from "@/components/world/WorldLayer";
import { getCameraPosition } from "@/components/world/CameraFollow";
import ElderNPC from "@/components/npc/ElderNPC";
import DialogueBox from "@/components/DialogueBox";
import Player from "@/components/npc/Player";
import { ELDER_DIALOGUE } from "@/data/elderDialogue";
import { SCENES } from "@/constants/scenes";

/* ---------------- HELPERS ---------------- */

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function collides(x, y, colliders) {
  return colliders.some((c) => {
    return (
      x > c.x - c.w / 2 &&
      x < c.x + c.w / 2 &&
      y > c.y - c.h / 2 &&
      y < c.y + c.h / 2
    );
  });
}

/* ---------------- LANDMARK LABEL ---------------- */

function Landmark({ name, x, y }) {
  return (
    <div
      className="absolute font-serif text-yellow-200 text-sm pointer-events-none"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {name}
    </div>
  );
}

export default function VillageScene({ onChangeScene }) {
  const viewportRef = useRef(null);

  /* ---------------- WORLD ---------------- */

  const WORLD_W = 2400;
  const WORLD_H = 2400;

  const ELDER_POS = { x: 1250, y: 1300 };

  const BUILDINGS = [
    { name: "Home", x: 1000, y: 1100, scene: SCENES.HOME },
    { name: "Workshop", x: 1500, y: 1100, scene: SCENES.WORKSHOP },
    { name: "Forest", x: 1250, y: 800, scene: SCENES.FOREST },
    { name: "Post Office", x: 1700, y: 1500, scene: SCENES.POST_OFFICE },
  ];

  const COLLIDERS = [
    { x: 1000, y: 1100, w: 120, h: 80 },
    { x: 1500, y: 1100, w: 140, h: 90 },
    { x: 1250, y: 800, w: 200, h: 120 },
    { x: 1700, y: 1500, w: 120, h: 80 },
  ];

  /* ---------------- PLAYER ---------------- */

  const [playerPos, setPlayerPos] = useState({ x: 1200, y: 1400 });
  const [isMoving, setIsMoving] = useState(false);
  const [nearBuilding, setNearBuilding] = useState(null);

  /* ---------------- CAMERA ---------------- */

  const [camera, setCamera] = useState({ camX: 0, camY: 0 });

  /* ---------------- DIALOGUE ---------------- */

  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState(null);

  /* ---------------- INPUT ---------------- */

  const keysRef = useRef({});

  useEffect(() => {
    const down = (e) => (keysRef.current[e.key] = true);
    const up = (e) => (keysRef.current[e.key] = false);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  /* ---------------- MOVEMENT LOOP ---------------- */

  useEffect(() => {
    if (isDialogueOpen) return;

    let raf;
    const speed = 3;

    const loop = () => {
      setPlayerPos((pos) => {
        let nextX = pos.x;
        let nextY = pos.y;

        const moving =
          keysRef.current["w"] ||
          keysRef.current["a"] ||
          keysRef.current["s"] ||
          keysRef.current["d"] ||
          keysRef.current["ArrowUp"] ||
          keysRef.current["ArrowDown"] ||
          keysRef.current["ArrowLeft"] ||
          keysRef.current["ArrowRight"];

        setIsMoving(!!moving);

        if (keysRef.current["a"] || keysRef.current["ArrowLeft"]) nextX -= speed;
        if (keysRef.current["d"] || keysRef.current["ArrowRight"]) nextX += speed;

        if (!collides(nextX, pos.y, COLLIDERS)) {
          pos = { ...pos, x: nextX };
        }

        if (keysRef.current["w"] || keysRef.current["ArrowUp"]) nextY -= speed;
        if (keysRef.current["s"] || keysRef.current["ArrowDown"]) nextY += speed;

        if (!collides(pos.x, nextY, COLLIDERS)) {
          pos = { ...pos, y: nextY };
        }

        return {
          x: clamp(pos.x, 16, WORLD_W - 16),
          y: clamp(pos.y, 16, WORLD_H - 16),
        };
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isDialogueOpen]);

  /* ---------------- CAMERA FOLLOW ---------------- */

  useEffect(() => {
    if (!viewportRef.current) return;

    const { offsetWidth, offsetHeight } = viewportRef.current;

    const { camX, camY } = getCameraPosition({
      targetX: playerPos.x,
      targetY: playerPos.y,
      viewportWidth: offsetWidth,
      viewportHeight: offsetHeight,
      worldWidth: WORLD_W,
      worldHeight: WORLD_H,
    });

    setCamera({ camX, camY });
  }, [playerPos]);

  /* ---------------- BUILDING PROXIMITY ---------------- */

  useEffect(() => {
    let found = null;
    for (const b of BUILDINGS) {
      if (Math.hypot(playerPos.x - b.x, playerPos.y - b.y) < 50) {
        found = b;
        break;
      }
    }
    setNearBuilding(found);
  }, [playerPos]);

  /* ---------------- PRESS E TO ENTER ---------------- */

  useEffect(() => {
    const onKey = (e) => {
      if (isDialogueOpen) return;
      if (!nearBuilding) return;
      if (e.key === "e" || e.key === "E") {
        onChangeScene && onChangeScene(nearBuilding.scene);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nearBuilding, isDialogueOpen, onChangeScene]);

  /* ---------------- DIALOGUE HANDLERS ---------------- */

  const openElderDialogue = () => {
    setCurrentNodeId("intro");
    setIsDialogueOpen(true);
  };

  const closeDialogue = () => {
    setIsDialogueOpen(false);
    setCurrentNodeId(null);
  };

  const handleDialogueChoice = (choice) => {
    if (choice.type === "scene" && choice.sceneKey) {
      closeDialogue();
      onChangeScene && onChangeScene(choice.sceneKey);
      return;
    }
    if (choice.type === "close") {
      closeDialogue();
      return;
    }
    if (choice.next) {
      setCurrentNodeId(choice.next);
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div ref={viewportRef} className="w-full h-full">
      <WorldViewport>
        <WorldLayer cameraX={camera.camX} cameraY={camera.camY}>
          <Player
            x={playerPos.x}
            y={playerPos.y}
            isMoving={isMoving}
          />

          {!isDialogueOpen && (
            <ElderNPC
              x={ELDER_POS.x}
              y={ELDER_POS.y}
              isTalking={isDialogueOpen}
              onClick={openElderDialogue}
              size={64}
            />
          )}

          {BUILDINGS.map((b) => (
            <Landmark key={b.scene} name={b.name} x={b.x} y={b.y} />
          ))}
        </WorldLayer>

        {nearBuilding && !isDialogueOpen && (
          <div className="absolute bottom-20 w-full text-center text-yellow-200 font-serif">
            Press <b>E</b> to enter {nearBuilding.name}
          </div>
        )}

        <div className="absolute left-0 right-0 bottom-6 flex justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <DialogueBox
              dialogue={ELDER_DIALOGUE}
              currentNodeId={currentNodeId}
              isOpen={isDialogueOpen}
              onChoice={handleDialogueChoice}
            />
          </div>
        </div>
      </WorldViewport>
    </div>
  );
}
