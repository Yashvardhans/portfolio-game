"use client";

import mapData from "@/public/map/town-map.json";

export default function TownMap({ onEnterBuilding, onTalkToElder }) {
  return (
    <div className="relative w-full h-full">
      {/* Map image */}
      <img
        src="/map/town-map.png"
        alt="Village Map"
        className="w-full h-full object-contain"
      />

      {/* Elder */}
      <button
        className="absolute"
        style={{
          left: mapData.elder.x,
          top: mapData.elder.y,
          width: mapData.elder.width,
          height: mapData.elder.height
        }}
        onClick={onTalkToElder}
      >
        <img src="/sprites/elder.png" alt="Elder" />
      </button>

      {/* Buildings */}
      {["home", "workshop", "forest", "postOffice"].map((key) => {
        const spot = mapData[key];
        return (
          <button
            key={key}
            className="absolute"
            style={{
              left: spot.x,
              top: spot.y,
              width: spot.width,
              height: spot.height
            }}
            onClick={() => onEnterBuilding(key)}
          />
        );
      })}
    </div>
  );
}
