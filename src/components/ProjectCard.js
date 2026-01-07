"use client";

export default function ProjectCard({
  title,
  role,
  timeframe,
  shortDescription,
  tech = [],
  highlights = [],
  githubUrl,
  liveUrl,
}) {
  return (
    <article className="group relative w-full rounded-3xl border border-slate-200 bg-white/95 shadow-sm px-4 py-4 md:px-5 md:py-5 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Soft decorative strip */}
      <div className="absolute inset-x-4 top-0 h-1 rounded-b-full bg-gradient-to-r from-emerald-300/70 via-sky-300/70 to-amber-300/70 pointer-events-none" />

      <div className="relative space-y-2">
        {/* Title & meta */}
        <header className="flex flex-wrap items-baseline justify-between gap-1.5">
          <h3 className="text-sm md:text-base font-semibold text-slate-900">
            {title}
          </h3>
          {timeframe && (
            <span className="text-[10px] md:text-[11px] text-slate-500">
              {timeframe}
            </span>
          )}
        </header>

        {(role || tech.length > 0) && (
          <p className="text-[10px] md:text-[11px] text-slate-600">
            {role && <span className="font-medium text-slate-800">{role}</span>}
            {role && tech.length > 0 && <span> · </span>}
            {tech.length > 0 && <span>{tech.join(" · ")}</span>}
          </p>
        )}

        {shortDescription && (
          <p className="text-[11px] md:text-xs text-slate-800 leading-relaxed">
            {shortDescription}
          </p>
        )}

        {highlights && highlights.length > 0 && (
          <ul className="mt-1 space-y-1">
            {highlights.map((item, idx) => (
              <li
                key={idx}
                className="text-[10px] md:text-[11px] text-slate-700 flex gap-1.5"
              >
                <span className="mt-[2px] text-[8px]">◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Links */}
        <div className="mt-3 flex flex-wrap gap-2 text-[10px] md:text-xs">
          {liveUrl && liveUrl !== "#" && (
            <button
              type="button"
              onClick={() => window.open(liveUrl, "_blank")}
              className="px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50/80 text-emerald-900 hover:bg-emerald-100 transition-colors"
            >
              View live demo ↗
            </button>
          )}
          {githubUrl && githubUrl !== "#" && (
            <button
              type="button"
              onClick={() => window.open(githubUrl, "_blank")}
              className="px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 transition-colors"
            >
              View code on GitHub
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
