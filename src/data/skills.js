// src/data/skills.js

export const SKILL_GROUPS = [
  {
    id: "frontend",
    label: "Frontend & UI",
    description: "Making interfaces feel clear, calm, and responsive.",
    skills: [
      { name: "JavaScript (ES6+)", level: 80 },
      { name: "React / Next.js", level: 80 },
      { name: "CSS / Tailwind", level: 75 },
      { name: "Responsive design", level: 75 },
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    description: "Structuring data, APIs, and server-side logic.",
    skills: [
      { name: "Node.js", level: 70 },
      { name: "REST APIs", level: 70 },
      { name: "Authentication basics", level: 60 },
    ],
  },
  {
    id: "craft",
    label: "Engineering Craft",
    description: "How I like to build and ship things.",
    skills: [
      { name: "Clean, readable code", level: 80 },
      { name: "Problem solving", level: 80 },
      { name: "Debugging", level: 75 },
      { name: "Collaboration & communication", level: 80 },
    ],
  },
  {
    id: "learning",
    label: "Learning & Next Steps",
    description: "Things I’m actively improving.",
    skills: [
      { name: "Deeper backend architecture", level: 55 },
      { name: "Testing (unit/integration)", level: 50 },
      { name: "DevOps basics", level: 45 },
    ],
  },
];
