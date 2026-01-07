"use client";

import { SPRITES } from "@/assets/village/icons";

function MapTileCard({
  emoji,
  title,
  subtitle,
  description,
  actionLabel,
  onClick,
  spriteType,
}) {
  const sprite = spriteType ? SPRITES[spriteType] : null;

  return (
    <button
      onClick={onClick}
      className="group relative w-full text-center rounded-2xl border border-emerald-200/70 bg-white/90 shadow-md px-3 py-3 md:px-4 md:py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400/70"
    >
      {/* Pixel building sprite */}
      {sprite && (
        <div className="mb-2 flex justify-center">
          <img
            src={sprite.src}
            alt={sprite.alt}
            className="image-pixelated h-10 md:h-12 drop-shadow-[0_4px_6px_rgba(0,0,0,0.18)]"
          />
        </div>
      )}

      {/* Pixel-style signpost label */}
      <div className="flex flex-col items-center mb-1">
        <div className="inline-flex items-center gap-1 rounded-md border border-amber-300 bg-amber-50 px-3 py-1 shadow-[0_2px_0_rgba(146,64,14,0.4)]">
          {emoji && (
            <span className="text-[13px] md:text-sm leading-none">{emoji}</span>
          )}
          <span className="text-[11px] md:text-xs font-semibold text-amber-900 uppercase tracking-wide">
            {title}
          </span>
        </div>
        {/* sign post stem */}
        <div className="w-[2px] h-2 bg-amber-700/80 rounded-full mt-[2px]" />
      </div>

      {/* Subtitle (small, like a hint) */}
      {subtitle && (
        <p className="text-[10px] md:text-[11px] text-emerald-700 mb-1">
          {subtitle}
        </p>
      )}

      {/* Short description – keep very light so it still feels like a map */}
      {description && (
        <p className="text-[10px] md:text-[11px] text-gray-700 leading-snug">
          {description}
        </p>
      )}

      {/* Action label */}
      {actionLabel && (
        <p className="mt-2 inline-flex items-center justify-center gap-1 text-[10px] md:text-[11px] font-medium text-emerald-700">
          {actionLabel}
          <span className="translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200">
            ↗
          </span>
        </p>
      )}
    </button>
  );
}

function DefaultCard({
  emoji,
  title,
  subtitle,
  description,
  actionLabel,
  onClick,
}) {
  // fallback layout if you ever use this component elsewhere
  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left rounded-2xl border border-emerald-200/70 bg-white/85 shadow-md px-3 py-3 md:px-4 md:py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-emerald-400/70"
    >
      <div className="relative flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            {emoji && <span className="text-2xl md:text-3xl">{emoji}</span>}
            <h3 className="text-sm md:text-base font-semibold text-emerald-900">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="text-[11px] md:text-xs text-emerald-700 mb-1">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-[11px] md:text-xs text-gray-700 leading-relaxed">
              {description}
            </p>
          )}
          {actionLabel && (
            <p className="mt-2 inline-flex items-center gap-1 text-[11px] md:text-xs font-medium text-emerald-700">
              {actionLabel}
              <span className="translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200">
                ↗
              </span>
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

export default function TownLocationCard(props) {
  const { variant = "map" } = props; // default to map variant for now

  if (variant === "map") {
    return <MapTileCard {...props} />;
  }

  return <DefaultCard {...props} />;
}
