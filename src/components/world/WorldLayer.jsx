import Image from "next/image";
import townMap from "@/assets/map/town-map.png";

export default function WorldLayer({ cameraX, cameraY, children }) {
  return (
    <div
      className="absolute top-0 left-0"
      style={{
        width: 2400,
        height: 2400,
        transform: `translate(${-cameraX}px, ${-cameraY}px)`,
        imageRendering: "pixelated",
      }}
    >
      <Image
        src={townMap}
        alt="Village Map"
        fill
        className="select-none pointer-events-none"
        draggable={false}
        priority
      />

      {children}
    </div>
  );
}
