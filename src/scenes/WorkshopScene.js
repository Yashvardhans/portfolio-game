"use client";

import { useState, useMemo, useEffect } from "react";
import DialogueBox from "@/components/DialogueBox";
import { SCENES } from "@/constants/scenes";
import { useProgress } from "@/state/ProgressContext";

const WORKSHOP_DIALOGUE = {
  intro: {
    id: "intro",
    speakerName: "Workshop Guide",
    title: "Welcome to the workshop",
    text: "Here you'll find projects, experiments, and little quests Yash has completed.",
    choices: [
      { id: "intro_projects", label: "Show me his projects", type: "action", action: "openProjects" },
      { id: "intro_back", label: "Back to the village square", type: "scene", sceneKey: SCENES.VILLAGE },
    ],
  },
};

export default function WorkshopScene({ onNavigate }) {
  const { markVisited } = useProgress();
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  useEffect(() => {
    markVisited("workshop");
  }, [markVisited]);

  const currentNode = useMemo(() => {
    if (!currentNodeId) return null;
    return WORKSHOP_DIALOGUE[currentNodeId] || null;
  }, [currentNodeId]);

  const openDialogue = () => {
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

    if (choice.type === "action" && choice.action === "openProjects") {
      setIsProjectsOpen(true);
      return;
    }
  };

  const handleCloseDialogue = () => {
    setIsDialogueOpen(false);
    setCurrentNodeId(null);
  };

  return (
    <section className="relative h-full w-full rounded-3xl md:rounded-4xl overflow-hidden border border-emerald-100 shadow-[0_18px_40px_rgba(15,118,110,0.15)]">
      {/* Interior background */}
      <div className="absolute inset-0">
        <img
          src="/workshop/interior.png"
          alt="Workshop interior"
          className="h-full w-full object-cover image-pixelated"
        />
      </div>

      <div className="relative z-10 h-full w-full flex flex-col">
        {/* top bar hint */}
        <div className="p-3 md:p-4 text-[11px] md:text-xs text-emerald-50 bg-emerald-900/80">
          <span className="font-semibold">Workshop 🔨</span>
          <span className="ml-2 text-emerald-100/90">
            Little quests and projects live here. Talk to the guide to explore.
          </span>
        </div>

        {/* main area */}
        <div className="flex-1 relative">
          {/* NPC at bottom center */}
          <button
            onClick={openDialogue}
            className="absolute left-1/2 bottom-16 -translate-x-1/2 flex flex-col items-center gap-1 group"
          >
            {/* NPC sprite placeholder */}
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-amber-200/90 border border-amber-700 flex items-center justify-center shadow-md image-pixelated">
              <span className="text-xl">🧑‍🔧</span>
            </div>
            {/* idle label */}
            <div className="px-3 py-1 rounded-md bg-amber-900/90 text-[10px] md:text-xs text-amber-50 shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
              <span className="font-semibold">The Builder</span>
              <span className="ml-1 text-amber-100/80 group-hover:underline">
                — click to talk
              </span>
            </div>
          </button>

          {/* Dialogue box */}
          <div className="absolute inset-x-0 bottom-2 flex justify-center px-4">
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

        {/* Back to village button (fallback) */}
        <div className="p-3 md:p-4 flex justify-end">
          <button
            onClick={() => onNavigate(SCENES.VILLAGE)}
            className="text-[11px] md:text-xs px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50/90 text-emerald-800 hover:bg-emerald-100"
          >
            ← Back to the village square
          </button>
        </div>
      </div>

      {/* Projects popup */}
      {isProjectsOpen && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-emerald-900/60">
          <div className="w-full max-w-lg rounded-2xl bg-white/95 shadow-2xl p-4 md:p-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm md:text-base font-semibold text-emerald-900">
                Projects & Quests
              </h2>
              <button
                onClick={() => setIsProjectsOpen(false)}
                className="text-xs text-emerald-700 hover:underline"
              >
                Close ✕
              </button>
            </div>

            {/* TODO: replace with your real projects list */}
            <ul className="space-y-2 text-[11px] md:text-xs text-gray-800">
              <li>
                <span className="font-semibold">Project 1:</span> Short description of a project.
              </li>
              <li>
                <span className="font-semibold">Project 2:</span> Another cool thing you built.
              </li>
              <li>
                <span className="font-semibold">Project 3:</span> etc.
              </li>
            </ul>

            <div className="mt-4 text-right">
              <button
                onClick={() => setIsProjectsOpen(false)}
                className="inline-flex items-center text-[11px] md:text-xs px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              >
                Back to the workshop
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
