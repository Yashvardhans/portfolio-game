"use client";

import { useState } from "react";
import { ProgressProvider } from "@/state/ProgressContext";
import SceneManager from "@/components/SceneManager";
import { SCENES } from "@/constants/scenes";

function GameShell() {
  const [currentScene, setCurrentScene] = useState(SCENES.VILLAGE);

  return (
    <main className="w-screen h-screen overflow-hidden bg-black">
      <SceneManager
        currentScene={currentScene}
        onChangeScene={setCurrentScene}
      />
    </main>
  );
}

export default function HomePage() {
  return (
    <ProgressProvider>
      <GameShell />
    </ProgressProvider>
  );
}
