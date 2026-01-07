export function getCameraPosition({
  targetX,
  targetY,
  viewportWidth,
  viewportHeight,
  worldWidth,
  worldHeight,
}) {
  let camX = targetX - viewportWidth / 2;
  let camY = targetY - viewportHeight / 2;

  // clamp camera to world bounds
  camX = Math.max(0, Math.min(camX, worldWidth - viewportWidth));
  camY = Math.max(0, Math.min(camY, worldHeight - viewportHeight));

  return { camX, camY };
}
