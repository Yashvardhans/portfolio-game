"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ProgressContext = createContext(null);

const STORAGE_KEY = "peaceful-town-progress-v1";

// Default structure for progress
const defaultProgress = {
  visited: {
    village: true,      // they always start here
    home: false,
    workshop: false,
    forest: false,
    postOffice: false,
  },
  lastUpdated: null,
};

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(defaultProgress);

  // Load from localStorage on first mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // basic shape check
        if (parsed && parsed.visited) {
          setProgress(parsed);
        }
      }
    } catch (err) {
      console.error("Failed to load progress from localStorage:", err);
    }
  }, []);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (err) {
      console.error("Failed to save progress to localStorage:", err);
    }
  }, [progress]);

  const markVisited = (sceneKey) => {
    setProgress((prev) => {
      if (prev.visited[sceneKey]) return prev; // no change

      const updated = {
        ...prev,
        visited: {
          ...prev.visited,
          [sceneKey]: true,
        },
        lastUpdated: new Date().toISOString(),
      };
      return updated;
    });
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
  };

  const totalScenes = Object.keys(progress.visited).length;
  const visitedCount = Object.values(progress.visited).filter(Boolean).length;
  const completion = visitedCount / totalScenes;

  const value = {
    progress,
    markVisited,
    resetProgress,
    totalScenes,
    visitedCount,
    completion,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used inside a ProgressProvider");
  }
  return ctx;
}
