"use client";

import { useEffect } from "react";
import { useProgress } from "@/state/ProgressContext";
import { SCENES } from "@/constants/scenes";
import { PROFILE } from "@/data/profile";

export default function HomeScene({ onNavigate }) {
  const { markVisited } = useProgress();

  useEffect(() => {
    markVisited("home");
  }, [markVisited]);

  return (
    <section
      className="
        h-full w-full rounded-3xl md:rounded-[32px] overflow-hidden
        bg-gradient-to-b from-[#FDF2DC] via-[#FEF9E7] to-[#F4E0B5]
        border border-amber-100 shadow-[0_18px_40px_rgba(180,83,9,0.18)]
      "
    >
      <div className="relative h-full w-full">
        {/* soft floor glow */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-amber-400/70 via-amber-300/50 to-transparent pointer-events-none" />

        {/* content */}
        <div className="relative z-10 h-full flex">
          <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-4 md:py-6 flex flex-col gap-4 md:gap-5">
            {/* Top: small label */}
            <div className="text-[11px] md:text-xs text-amber-800/80">
              Home · About
            </div>

            {/* Main two-column layout */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-1">
              {/* Left column: main intro */}
              <div className="md:w-[60%] bg-white/90 rounded-3xl border border-amber-100 shadow-md px-4 py-4 md:px-6 md:py-5 flex flex-col gap-3">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-amber-900 flex items-center gap-2">
                    {PROFILE.name}
                    <span className="text-base md:text-lg">🏡</span>
                  </h2>
                  <p className="mt-0.5 text-xs md:text-sm font-medium text-amber-800">
                    {PROFILE.title}
                  </p>
                </div>

                <p className="text-[11px] md:text-sm text-gray-800 leading-relaxed">
                  {PROFILE.tagline}
                </p>

                <div className="mt-1 space-y-1.5">
                  <p className="text-[11px] md:text-xs text-gray-700">
                    <span className="font-semibold text-amber-900">Currently:</span>{" "}
                    {PROFILE.currentFocus}
                  </p>
                  <p className="text-[11px] md:text-xs text-gray-700">
                    <span className="font-semibold text-amber-900">Based in:</span>{" "}
                    {PROFILE.location}
                  </p>
                </div>

                {/* Highlights list */}
                <div className="mt-2">
                  <p className="text-[11px] md:text-xs font-semibold text-amber-900 mb-1">
                    A few things about how I like to work:
                  </p>
                  <ul className="space-y-1.5">
                    {PROFILE.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-[11px] md:text-xs text-gray-800 flex gap-1.5"
                      >
                        <span className="mt-[3px] text-[9px]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right column: quick stats / chips */}
              <div className="md:w-[40%] flex flex-col gap-3 md:gap-4">
                {/* Focus areas */}
                <div className="bg-white/90 rounded-3xl border border-amber-100 shadow-sm px-4 py-3 md:px-5 md:py-4">
                  <p className="text-[11px] md:text-xs font-semibold text-amber-900 mb-1">
                    What I enjoy working on
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {PROFILE.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="text-[10px] md:text-xs px-2 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-900"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="bg-white/90 rounded-3xl border border-amber-100 shadow-sm px-4 py-3 md:px-5 md:py-4">
                  <p className="text-[11px] md:text-xs font-semibold text-amber-900 mb-1">
                    Tools & technologies I use often
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {PROFILE.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] md:text-xs px-2 py-1 rounded-full bg-white border border-amber-100 text-amber-900"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick links */}
                <div className="bg-white/90 rounded-3xl border border-amber-100 shadow-sm px-4 py-3 md:px-5 md:py-4 flex flex-col gap-2">
                  <p className="text-[11px] md:text-xs font-semibold text-amber-900">
                    Quick links
                  </p>
                  <div className="flex flex-wrap gap-2 text-[10px] md:text-xs">
                    <button
                      onClick={() => {
                        if (PROFILE.resumeUrl && PROFILE.resumeUrl !== "#") {
                          window.open(PROFILE.resumeUrl, "_blank");
                        }
                      }}
                      className="px-3 py-1 rounded-full border border-amber-200 bg-white/90 text-amber-900 hover:bg-amber-50 transition-colors disabled:opacity-50"
                      disabled={!PROFILE.resumeUrl || PROFILE.resumeUrl === "#"}
                    >
                      View resume
                    </button>
                    <button
                      onClick={() => onNavigate(SCENES.WORKSHOP)}
                      className="px-3 py-1 rounded-full border border-amber-200 bg-white/90 text-amber-900 hover:bg-amber-50 transition-colors"
                    >
                      See projects
                    </button>
                    <button
                      onClick={() => onNavigate(SCENES.POST_OFFICE)}
                      className="px-3 py-1 rounded-full border border-amber-200 bg-white/90 text-amber-900 hover:bg-amber-50 transition-colors"
                    >
                      Contact / links
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Back to village */}
            <div className="mt-1">
              <button
                onClick={() => onNavigate(SCENES.VILLAGE)}
                className="inline-flex items-center gap-1 text-[11px] md:text-xs px-3 py-1.5 rounded-full bg-white/90 border border-amber-200 text-amber-900 hover:bg-amber-50 transition-colors"
              >
                ⬅ Back to the Village Square
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
