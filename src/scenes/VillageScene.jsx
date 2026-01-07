"use client";

import { useEffect, useRef, useState } from "react";
import WorldViewport from "@/components/world/WorldViewport";
import WorldLayer from "@/components/world/WorldLayer";
import { getCameraPosition } from "@/components/world/CameraFollow";
import ElderNPC from "@/components/npc/ElderNPC";
import DialogueBox from "@/components/DialogueBox";
import { ELDER_DIALOGUE } from "@/data/elderDialogue"; // earlier file we added

export default function VillageScene({ onChangeScene }) {
  const viewportRef = useRef(null);

  const ELDER_POS = { x: 1250, y: 1300 }; // slightly below center for better visual anchor
  const WORLD_W = 2400;
  const WORLD_H = 2400;

  const [camera, setCamera] = useState({ camX: 0, camY: 0 });
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState(null);

  // compute camera (safe on resize)
  useEffect(() => {
    const updateCamera = () => {
      if (!viewportRef.current) return;
      const { offsetWidth, offsetHeight } = viewportRef.current;
      const { camX, camY } = getCameraPosition({
        targetX: ELDER_POS.x,
        targetY: ELDER_POS.y,
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
  }, []);

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

  const currentNode = currentNodeId ? ELDER_DIALOGUE[currentNodeId] : null;

  return (
    <div ref={viewportRef} className="w-full h-full">
      <WorldViewport>
        <WorldLayer cameraX={camera.camX} cameraY={camera.camY}>
          {/* Elder: isTalking while dialogue is open */}
          <ElderNPC
            x={ELDER_POS.x}
            y={ELDER_POS.y}
            isTalking={isDialogueOpen}
            onClick={openElderDialogue}
            size={64}
          />

          {/* TODO: building hotspots components go here */}
        </WorldLayer>

        {/* DialogueBox anchored at bottom center of the viewport */}
        <div className="absolute left-0 right-0 bottom-6 flex justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <DialogueBox
              isOpen={isDialogueOpen && !!currentNode}
              speakerName={currentNode?.speakerName}
              title={currentNode?.title}
              text={currentNode?.text}
              choices={currentNode?.choices || []}
              onChoice={handleDialogueChoice}
              onClose={closeDialogue}
            />
          </div>
        </div>
      </WorldViewport>
    </div>
  );
}
