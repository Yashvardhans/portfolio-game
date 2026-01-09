"use client";

import { useEffect, useRef, useState } from "react";
import WorldViewport from "@/components/world/WorldViewport";
import WorldLayer from "@/components/world/WorldLayer";
import { getCameraPosition } from "@/components/world/CameraFollow";
import ElderNPC from "@/components/npc/ElderNPC";
import DialogueBox from "@/components/DialogueBox";
import { ELDER_DIALOGUE } from "@/data/elderDialogue";
import { SCENES } from "@/constants/scenes";

/* ---------- SIMPLE PLAYER ---------- */
function Player({ x, y }) {
  return (
    <div
      className="absolute z-20"
      style={{
        left: x,
        top: y,
        width: 32,
        height: 32,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-black" />
    </div>
  );
}


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

  const WORLD_W = 2400;
  const WORLD_H = 2400;

  const ELDER_POS = { x: 1250, y: 1300 };

 
  const [playerPos, setPlayerPos] = useState({ x: 1200, y: 1600 });

  const [camera, setCamera] = useState({ camX: 0, camY: 0 });


  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState(null);

  
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

  useEffect(() => {
    if (isDialogueOpen) return;

    let raf;
    const speed = 3;

    const loop = () => {
      setPlayerPos((pos) => {
        let x = pos.x;
        let y = pos.y;

        if (keysRef.current["w"] || keysRef.current["ArrowUp"]) y -= speed;
        if (keysRef.current["s"] || keysRef.current["ArrowDown"]) y += speed;
        if (keysRef.current["a"] || keysRef.current["ArrowLeft"]) x -= speed;
        if (keysRef.current["d"] || keysRef.current["ArrowRight"]) x += speed;

       
        x = Math.max(0, Math.min(WORLD_W, x));
        y = Math.max(0, Math.min(WORLD_H, y));

        return { x, y };
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isDialogueOpen]);

  
  useEffect(() => {
    const updateCamera = () => {
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
    };

    updateCamera();
    window.addEventListener("resize", updateCamera);
    return () => window.removeEventListener("resize", updateCamera);
  }, [playerPos]);

  
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

  const checkEnter = (targetX, targetY, sceneKey) => {
    const dist = Math.hypot(playerPos.x - targetX, playerPos.y - targetY);
    if (dist < 40) {
      onChangeScene && onChangeScene(sceneKey);
    }
  };

  useEffect(() => {
    checkEnter(1000, 1100, SCENES.HOME);
    checkEnter(1500, 1100, SCENES.WORKSHOP);
    checkEnter(1250, 800, SCENES.FOREST);
    checkEnter(1700, 1500, SCENES.POST_OFFICE);
  }, [playerPos]);

  return (
    <div ref={viewportRef} className="w-full h-full">
      <WorldViewport>
        <WorldLayer cameraX={camera.camX} cameraY={camera.camY}>
          {/* PLAYER */}
          <Player x={playerPos.x} y={playerPos.y} />

          {/* ELDER */}
          {!isDialogueOpen && (
            <ElderNPC
              x={ELDER_POS.x}
              y={ELDER_POS.y}
              isTalking={isDialogueOpen}
              onClick={openElderDialogue}
              size={64}
            />
          )}

          {/* LANDMARKS */}
          <Landmark name="Home" x={900} y={1100} />
          <Landmark name="Workshop" x={1500} y={1100} />
          <Landmark name="Forest" x={1250} y={800} />
          <Landmark name="Post Office" x={1700} y={1500} />
        </WorldLayer>

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
