"use client";

import { useEffect, useState, useMemo } from "react";
import { useProgress } from "@/state/ProgressContext";
import DialogueBox from "@/components/DialogueBox";
import { SCENES } from "@/constants/scenes";

const ELDER_DIALOGUE_NODES = {
  intro: {
    id: "intro",
    speakerName: "Elder of the Village",
    title: "Welcome to the town",
    text: "Welcome, traveler. This town holds pieces of Yash's journey. Which place would you like to visit?",
    choices: [
      { id: "intro_home", label: "Tell me about Yash", type: "scene", sceneKey: SCENES.HOME },
      { id: "intro_workshop", label: "Show me his projects", type: "scene", sceneKey: SCENES.WORKSHOP },
      { id: "intro_forest", label: "I want to see his skills", type: "scene", sceneKey: SCENES.FOREST },
      { id: "intro_post", label: "How can I contact him?", type: "scene", sceneKey: SCENES.POST_OFFICE },
      { id: "intro_look", label: "I'll explore on my own", type: "close" },
    ],
  },
};

export default function VillageSquareScene({ onNavigate }) {
  const { markVisited, progress } = useProgress();

  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState(null);

  useEffect(() => {
    markVisited("village");
  }, [markVisited]);

  const visitedCount =
    progress?.visited && Object.values(progress.visited).filter(Boolean).length;

  const currentNode = useMemo(() => {
    if (!currentNodeId) return null;
    return ELDER_DIALOGUE_NODES[currentNodeId] || null;
  }, [currentNodeId]);

  const openElderDialogue = () => {
    setCurrentNodeId("intro");
    setIsDialogueOpen(true);
  };

  const handleDialogueChoice = (choice) => {
    if (choice.type === "scene" && choice.sceneKey) {
      setIsDialogueOpen(false);
      setCurrentNodeId(null);
      onNavigate(choice.sceneKey);
      return;
    }

    if (choice.type === "close") {
      setIsDialogueOpen(false);
      setCurrentNodeId(null);
      return;
    }

    if (choice.next) {
      setCurrentNodeId(choice.next);
    }
  };

  const handleCloseDialogue = () => {
    setIsDialogueOpen(false);
    setCurrentNodeId(null);
  };

  return (
    <section className="relative h-full w-full rounded-3xl md:rounded-4xl overflow-hidden border border-emerald-100 shadow-[0_18px_40px_rgba(15,118,110,0.15)]">
      {/* full pixel map background */}
      <div className="absolute inset-0">
        <img
          src="/village/town-map.png"
          alt="Peaceful town of Yash"
          className="h-full w-full object-cover image-pixelated"
        />
      </div>

      {/* overlay UI */}
      <div className="relative z-10 h-full w-full">
        {/* small text hint top-left */}
        <div className="absolute left-4 top-4 rounded-xl bg-emerald-900/70 text-[11px] md:text-xs text-emerald-50 px-3 py-2 max-w-xs">
          <p className="font-semibold">Peaceful Town of Yash 🌿</p>
          <p className="mt-0.5">
            Click a house to visit it. The Elder in the center can guide you if you&apos;re not sure.
          </p>
          {visitedCount && visitedCount > 1 && (
            <p className="mt-1 text-emerald-100/90">
              You&apos;ve already visited{" "}
              <span className="font-semibold">{visitedCount}</span> places.
            </p>
          )}
        </div>

        {/* Elder NPC in center with idle label */}
        <button
          onClick={openElderDialogue}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group"
        >
          {/* Elder sprite placeholder – replace with pixel art later */}
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-emerald-200/90 border border-emerald-600 flex items-center justify-center shadow-md image-pixelated">
            <span className="text-xl">🌱</span>
          </div>
          {/* nameplate */}
          <div className="px-3 py-1 rounded-md bg-emerald-900/90 text-[10px] md:text-xs text-emerald-50 shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
            <span className="font-semibold">The Elder</span>
            <span className="ml-1 text-emerald-100/80 group-hover:underline">
              — click to talk
            </span>
          </div>
        </button>

        {/* Clickable houses (hotspots) */}
        {/* Adjust these percentages to match your map image */}
        {/* Home */}
        <button
          onClick={() => onNavigate(SCENES.HOME)}
          className="absolute -translate-x-1/2 -translate-y-1/2 hover:scale-[1.03] transition-transform"
          style={{ left: "40%", top: "25%" }}
          aria-label="Go to Home"
        >
          <div className="px-2 py-1 rounded bg-emerald-900/80 text-[10px] md:text-xs text-emerald-50 shadow">
            🏡 Home
          </div>
        </button>

        {/* Workshop */}
        <button
          onClick={() => onNavigate(SCENES.WORKSHOP)}
          className="absolute -translate-x-1/2 -translate-y-1/2 hover:scale-[1.03] transition-transform"
          style={{ left: "68%", top: "28%" }}
          aria-label="Go to Workshop"
        >
          <div className="px-2 py-1 rounded bg-emerald-900/80 text-[10px] md:text-xs text-emerald-50 shadow">
            🔨 Workshop
          </div>
        </button>

        {/* Forest */}
        <button
          onClick={() => onNavigate(SCENES.FOREST)}
          className="absolute -translate-x-1/2 -translate-y-1/2 hover:scale-[1.03] transition-transform"
          style={{ left: "40%", top: "74%" }}
          aria-label="Go to Forest of Skills"
        >
          <div className="px-2 py-1 rounded bg-emerald-900/80 text-[10px] md:text-xs text-emerald-50 shadow">
            🌲 Forest of Skills
          </div>
        </button>

        {/* Post Office */}
        <button
          onClick={() => onNavigate(SCENES.POST_OFFICE)}
          className="absolute -translate-x-1/2 -translate-y-1/2 hover:scale-[1.03] transition-transform"
          style={{ left: "70%", top: "72%" }}
          aria-label="Go to Post Office"
        >
          <div className="px-2 py-1 rounded bg-emerald-900/80 text-[10px] md:text-xs text-emerald-50 shadow">
            🐦 Post Office
          </div>
        </button>

        {/* Elder dialogue overlay */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center px-4">
          <DialogueBox
            isOpen={isDialogueOpen && !!currentNode}
            speakerName={currentNode?.speakerName}
            title={currentNode?.title}
            text={currentNode?.text}
            choices={currentNode?.choices || []}
            onChoice={handleDialogueChoice}
            onClose={handleCloseDialogue}
          />
        </div>
      </div>
    </section>
  );
}
