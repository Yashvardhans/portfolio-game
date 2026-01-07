"use client";

export default function SkillVineBar({ name, level }) {
  const clampedLevel = Math.max(0, Math.min(level ?? 0, 100));

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] md:text-xs text-emerald-950">
          {name}
        </span>
        <span className="text-[10px] md:text-[11px] text-emerald-700/90">
          {clampedLevel}%
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-emerald-100/80 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-lime-300 transition-[width] duration-500 ease-out"
          style={{ width: `${clampedLevel}%` }}
        />
      </div>
    </div>
  );
}
