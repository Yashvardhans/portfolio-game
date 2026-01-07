"use client";

import { useProgress } from "@/state/ProgressContext";

export default function LeafProgress() {
  const { visitedCount, totalScenes, completion } = useProgress();

  const percentage = Math.round(completion * 100);

  // Simple leaf row
  const leaves = [];
  for (let i = 0; i < totalScenes; i++) {
    leaves.push(
      <span key={i} className="text-lg">
        {i < visitedCount ? "🍃" : "🍂"}
      </span>
    );
  }

  return (
    <div className="mt-2 flex flex-col items-center gap-1 text-xs text-gray-700">
      <div className="flex gap-1">{leaves}</div>
      <div>
        Explored{" "}
        <span className="font-semibold">
          {visitedCount}/{totalScenes}
        </span>{" "}
        areas · {percentage}%
      </div>
    </div>
  );
}
