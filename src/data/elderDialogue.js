import { SCENES } from "@/constants/scenes";

export const ELDER_DIALOGUE = {
  intro: {
    id: "intro",
    speakerName: "The Elder",
    title: "A gentle welcome",
    text: "Welcome, traveler. This town holds pieces of Yash's journey. Where would you like to go?",
    choices: [
      { id: "go_home", label: "Tell me about Yash", type: "scene", sceneKey: SCENES.HOME },
      { id: "go_workshop", label: "Show me his projects", type: "scene", sceneKey: SCENES.WORKSHOP },
      { id: "go_forest", label: "What skills does he have?", type: "scene", sceneKey: SCENES.FOREST },
      { id: "go_post", label: "How can I contact him?", type: "scene", sceneKey: SCENES.POST_OFFICE },
      { id: "close", label: "I'll explore on my own", type: "close" },
    ],
  },
};
