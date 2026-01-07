"use client";

import { useEffect } from "react";
import { useProgress } from "@/state/ProgressContext";
import { SCENES } from "@/constants/scenes";
import { CONTACT } from "@/data/contact";

export default function PostOfficeScene({ onNavigate }) {
  const { markVisited } = useProgress();

  useEffect(() => {
    markVisited("postOffice");
  }, [markVisited]);

  const handleOpen = (url) => {
    if (!url || url === "#") return;
    window.open(url, "_blank");
  };

  const handleEmailClick = () => {
    if (!CONTACT.email || CONTACT.email === "youremail@example.com") return;
    window.location.href = `mailto:${CONTACT.email}`;
  };

  return (
    <section
      className="
        h-full w-full rounded-3xl md:rounded-4xl overflow-hidden
        bg-linear-to-b from-[#E0F2FE] via-[#BFDBFE] to-[#93C5FD]
        border border-sky-200 shadow-[0_18px_40px_rgba(37,99,235,0.22)]
      "
    >
      <div className="relative h-full w-full">
        {/* sky / floor glow */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-sky-700/70 via-sky-500/40 to-transparent pointer-events-none" />

        <div className="relative z-10 h-full flex">
          <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-4 md:py-6 flex flex-col gap-4 md:gap-5">
            {/* breadcrumb */}
            <div className="text-[11px] md:text-xs text-sky-900/85">
              Post Office · Contact & Links
            </div>

            {/* header */}
            <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-3">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-sky-950 flex items-center gap-2">
                  Post Office 🐦
                </h2>
                <p className="mt-1 text-[11px] md:text-sm text-sky-950/90 max-w-xl">
                  A small, peaceful post office where messages take flight. Here
                  are the best ways to reach me or explore more of my work.
                </p>
              </div>

              <button
                onClick={() => onNavigate(SCENES.VILLAGE)}
                className="self-start md:self-auto text-[11px] md:text-xs px-3 py-1.5 rounded-full bg-sky-900/70 border border-sky-700 text-sky-50 hover:bg-sky-800 transition-colors"
              >
                ⬅ Back to the Village Square
              </button>
            </header>

            {/* main layout */}
            <div className="mt-2 grid grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3 md:gap-4 flex-1">
              {/* Left: main message & primary action */}
              <div className="bg-white/95 rounded-3xl border border-sky-100 shadow-sm px-4 py-4 md:px-5 md:py-5 flex flex-col justify-between gap-3">
                <div>
                  <p className="text-xs md:text-sm font-semibold text-sky-950 flex items-center gap-1.5">
                    Send a message
                  </p>
                  <p className="mt-1 text-[11px] md:text-sm text-sky-900/90">
                    Whether it&apos;s about a role, a project idea, or just a
                    quick question, feel free to reach out. I usually respond
                    best by email.
                  </p>

                  {CONTACT.note && (
                    <p className="mt-2 text-[10px] md:text-[11px] text-sky-900/85">
                      {CONTACT.note}
                    </p>
                  )}
                </div>

                <div className="mt-2 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleEmailClick}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-sky-600 text-sky-50 text-xs md:text-sm font-medium shadow-sm hover:bg-sky-700 transition-colors disabled:opacity-60"
                    disabled={
                      !CONTACT.email ||
                      CONTACT.email === "youremail@example.com"
                    }
                  >
                    ✉️ Email me
                    {CONTACT.email &&
                      CONTACT.email !== "youremail@example.com" && (
                        <span className="text-[10px] md:text-[11px] font-normal text-sky-100/90">
                          {CONTACT.email}
                        </span>
                      )}
                  </button>
                </div>
              </div>

              {/* Right: link cards */}
              <div className="flex flex-col gap-3 md:gap-4">
                {/* GitHub */}
                <div className="bg-white/95 rounded-3xl border border-sky-100 shadow-sm px-4 py-3 md:px-5 md:py-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-sky-950">
                      GitHub
                    </p>
                    <p className="mt-0.5 text-[10px] md:text-[11px] text-sky-900/85">
                      See the repos behind my projects, experiments, and
                      learning.
                    </p>
                    {CONTACT.github && CONTACT.github !== "#" && (
                      <p className="mt-1 text-[10px] md:text-[11px] text-sky-700/90 truncate max-w-[14rem]">
                        {CONTACT.github}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpen(CONTACT.github)}
                    className="text-[10px] md:text-[11px] px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-900 hover:bg-sky-100 transition-colors"
                    disabled={!CONTACT.github || CONTACT.github === "#"}
                  >
                    Open GitHub ↗
                  </button>
                </div>

                {/* LinkedIn */}
                <div className="bg-white/95 rounded-3xl border border-sky-100 shadow-sm px-4 py-3 md:px-5 md:py-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-sky-950">
                      LinkedIn
                    </p>
                    <p className="mt-0.5 text-[10px] md:text-[11px] text-sky-900/85">
                      For roles, background, and updates on what I&apos;m
                      working on.
                    </p>
                    {CONTACT.linkedin && CONTACT.linkedin !== "#" && (
                      <p className="mt-1 text-[10px] md:text-[11px] text-sky-700/90 truncate max-w-[14rem]">
                        {CONTACT.linkedin}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpen(CONTACT.linkedin)}
                    className="text-[10px] md:text-[11px] px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-900 hover:bg-sky-100 transition-colors"
                    disabled={!CONTACT.linkedin || CONTACT.linkedin === "#"}
                  >
                    Open LinkedIn ↗
                  </button>
                </div>

                {/* Resume */}
                <div className="bg-white/95 rounded-3xl border border-sky-100 shadow-sm px-4 py-3 md:px-5 md:py-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-sky-950">
                      Resume
                    </p>
                    <p className="mt-0.5 text-[10px] md:text-[11px] text-sky-900/85">
                      A concise snapshot of my experience, skills, and projects.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpen(CONTACT.resumeUrl)}
                    className="text-[10px] md:text-[11px] px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-900 hover:bg-sky-100 transition-colors"
                    disabled={!CONTACT.resumeUrl || CONTACT.resumeUrl === "#"}
                  >
                    View resume ↗
                  </button>
                </div>
              </div>
            </div>

            {/* tiny note */}
            <p className="mt-1 text-[10px] md:text-[11px] text-sky-900/80">
              Update your email, links, and resume URL in{" "}
              <code className="bg-sky-900/10 px-1 py-0.5 rounded text-[9px]">
                src/data/contact.js
              </code>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
