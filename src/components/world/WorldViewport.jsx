"use client";

export default function WorldViewport({ children }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-[28px] bg-[#0f1f17] "
    >
      {/* GAME WORLD */}
      {children}

      {/* VIGNETTE */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: `
            inset 0 0 120px rgba(0,0,0,0.85),
            inset 0 0 40px rgba(0,0,0,0.5)
          `,
        }}
      />

      {/* SUBTLE FRAME LINE */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        style={{
          boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.06)",
        }}
      />
    </div>
  );
}

