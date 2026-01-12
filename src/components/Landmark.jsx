"use client";

export default function Landmark({
  name,
  x,
  y,
  width = 100,
  height = 70,
  playerPosition,
  onEnter,
}) {
  const isInside =
    Math.abs(playerPosition.x - x) < width / 2 &&
    Math.abs(playerPosition.y - y) < height / 2;

  if (isInside) {
    onEnter();
  }

  return (
    <div
      className="absolute pointer-events-none font-serif text-blue-600"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {name}
    </div>
  );
}
