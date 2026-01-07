"use client";

import { useEffect, useState } from "react";

export default function DialogueBox({
  isOpen,
  speakerName,
  title,
  text,
  choices = [],
  onChoice,
  onClose,
}) {
  const [displayedText, setDisplayedText] = useState("");

  // Typewriter effect whenever `text` changes
  useEffect(() => {
    if (!isOpen || !text) {
      setDisplayedText("");
      return;
    }

    let i = 0;
    setDisplayedText("");
    const speed = 18; // ms per character

    const interval = setInterval(() => {
      i++;
      setDisplayedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/90 shadow-inner px-4 py-3 md:px-5 md:py-4">
      {/* Header: Speaker + Close */}
      <div className="flex items-center justify-between mb-2">
        <div>
          {speakerName && (
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-wide text-emerald-800">
              {speakerName}
            </p>
          )}
          {title && (
            <p className="text-xs md:text-sm font-semibold text-emerald-900">
              {title}
            </p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-[10px] md:text-xs px-2 py-1 rounded-full bg-white/80 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors"
          >
            Close
          </button>
        )}
      </div>

      {/* Dialogue text */}
      <p className="text-[11px] md:text-sm text-gray-800 min-h-12 md:min-h-14">
        {displayedText}
      </p>

      {/* Choices */}
      {choices.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {choices.map((choice) => (
            <button
              key={choice.id || choice.label}
              onClick={() => onChoice && onChoice(choice)}
              className="text-[10px] md:text-xs px-3 py-1 rounded-full bg-white/90 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              {choice.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
