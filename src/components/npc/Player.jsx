"use client";

export default function Player({ position }) {
  return (
    <div
      className="absolute z-20"
      style={{
        left: position.x,
        top: position.y,
        width: 32,
        height: 32,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-black" />
    </div>
  );
}
