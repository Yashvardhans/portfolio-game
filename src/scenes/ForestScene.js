"use client";

import { useEffect } from "react";
import { useProgress } from "@/state/ProgressContext";
import { SCENES } from "@/constants/scenes";
import { SKILL_GROUPS } from "@/data/skills";
import SkillVineBar from "@/components/SkillVineBar";

export default function ForestScene({ onNavigate }) {
  const { markVisited } = useProgress();

  useEffect(() => {
    markVisited("forest");
  }, [markVisited]);

  return (
    <section
      className="
        h-full w-full rounded-3xl md:rounded-4xl overflow-hidden
        bg-linear-to-b from-[#DCFCE7] via-[#BBF7D0] to-[#4ADE80]
        border border-emerald-200 shadow-[0_18px_40px_rgba(21,128,61,0.25)]
      "
    >
      <div className="relative h-full w-full">
        {/* canopy */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-emerald-900/55 via-emerald-700/25 to-transparent pointer-events-none" />

        <div className="relative z-10 h-full flex">
          <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-4 md:py-6 flex flex-col gap-4 md:gap-5">
            {/* breadcrumb */}
            <div className="text-[11px] md:text-xs text-emerald-900/85">
              Forest · Skills & Growth
            </div>

            {/* header row */}
            <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-3">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-emerald-950 flex items-center gap-2">
                  Forest of Skills 🌲
                </h2>
                <p className="mt-1 text-[11px] md:text-sm text-emerald-950/90 max-w-xl">
                  Each path in this forest is a skill you&apos;ve been growing
                  over time. Some vines are already strong, others are still
                  winding their way upward.
                </p>
              </div>

              <button
                onClick={() => onNavigate(SCENES.VILLAGE)}
                className="self-start md:self-auto text-[11px] md:text-xs px-3 py-1.5 rounded-full bg-emerald-900/70 border border-emerald-700 text-emerald-50 hover:bg-emerald-800 transition-colors"
              >
                ⬅ Back to the Village Square
              </button>
            </header>

            {/* groups grid */}
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 flex-1">
              {SKILL_GROUPS.map((group) => (
                <div
                  key={group.id}
                  className="bg-white/90 rounded-3xl border border-emerald-100 shadow-sm px-4 py-3 md:px-5 md:py-4 flex flex-col gap-2"
                >
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-emerald-950 flex items-center gap-1.5">
                      {group.label}
                    </p>
                    {group.description && (
                      <p className="mt-0.5 text-[10px] md:text-[11px] text-emerald-800">
                        {group.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-1 space-y-2">
                    {group.skills.map((skill) => (
                      <SkillVineBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* small note */}
            {/* <p className="mt-1 text-[10px] md:text-[11px] text-emerald-900/80">
              You can adjust skills, groups, and levels in{" "}
              <code className="bg-emerald-900/10 px-1 py-0.5 rounded text-[9px]">
                src/data/skills.js
              </code>
              .
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
