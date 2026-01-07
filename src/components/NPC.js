"use client";

export default function NPC({
  emoji,
  name,
  role,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-1 focus:outline-none"
    >
      {/* Character avatar */}
      <div className="relative">
        <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:bg-emerald-200/80 transition-all duration-200">
          <span className="text-3xl md:text-4xl">
            {emoji}
          </span>
        </div>
        {/* Small glow on hover */}
        <div className="absolute inset-0 blur-md rounded-full bg-emerald-300/30 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200" />
      </div>

      {/* Name & role */}
      <div className="text-center">
        <p className="text-xs md:text-sm font-semibold text-emerald-900">
          {name}
        </p>
        {role && (
          <p className="text-[10px] md:text-xs text-emerald-700">
            {role}
          </p>
        )}
        {description && (
          <p className="mt-1 text-[10px] md:text-[11px] text-gray-600 max-w-48">
            {description}
          </p>
        )}
        <p className="mt-1 text-[10px] md:text-[11px] text-emerald-700 font-medium opacity-80 group-hover:opacity-100">
          Click to talk 💬
        </p>
      </div>
    </button>
  );
}
