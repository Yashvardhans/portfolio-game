"use client";

import Image from "next/image";

export default function DialogueBox({
  dialogue, // ELDER_DIALOGUE
  currentNodeId, // "intro"
  isOpen,
  onChoice, // handleDialogueChoice
}) {
  if (!isOpen || !currentNodeId) return null;

  const node = dialogue[currentNodeId];
  if (!node) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center">
      <div
        className="relative mb-4 w-[96%] max-w-6xl rounded-xl border-4 border-[#8f7a4a] shadow-[0_12px_0_#000]"
        style={{
          background: "linear-gradient(180deg, #1e2b2f 0%, #182327 100%)",
        }}
      >
        {/* INNER FRAME */}
        <div
          className="flex gap-6 rounded-lg border-2 border-[#8f7a4a] p-5"
          style={{
            background: "linear-gradient(180deg, #22363b 0%, #1a2a2e 100%)",
          }}
        >
          {/* PORTRAIT */}
          <div className="relative h-[120px] w-[120px] shrink-0 rounded-lg border-2 border-[#8a6a48] bg-black">
            <Image
              src="/npc/elder.png"
              alt={node.speakerName}
              fill
              className="object-cover rounded-md"
            />
          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-between w-full">
            {/* HEADER */}
            <div className="mb-2">
              <div className="text-sm uppercase tracking-wide text-[#caa56a]">
                {node.speakerName}
              </div>
              <div className="text-xs italic text-[#9c8664]">{node.title}</div>
            </div>

            {/* TEXT */}
           <p
  className="font-serif text-[20px] leading-relaxed text-[#f5e6c8]"
  style={{ textShadow: "0 1px 0 #000" }}
>

              {node.text}
            </p>

            {/* CHOICES */}
            <div className="mt-4 flex flex-wrap gap-4">
              {node.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => onChoice(choice)}
                  className="
                    flex items-center gap-2
                    rounded-md border-2 border-[#6b4b2a]
                    bg-[#1c120b]
                    px-4 py-2
                    font-serif text-[16px] text-[#f0dca8]
                    shadow-[inset_0_-2px_0_#000]
                    hover:bg-[#2b1a12]
                    active:translate-y-[1px]
                  "
                >
                  <span className="text-[#caa56a]">▶</span>
                  {choice.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
