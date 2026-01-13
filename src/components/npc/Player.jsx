"use client";

export default function Player({ x, y, isMoving }) {
  return (
    <div
      className="absolute z-20"
      style={{
        left: x,
        top: y,
        width: 32,
        height: 32,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className={`h-6 w-6 rounded-full border-2 border-black bg-blue-500 ${
          isMoving ? "animate-bounce" : ""
        }`}
      />
    </div>
  );
}
