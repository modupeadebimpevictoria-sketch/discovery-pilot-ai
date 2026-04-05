export interface WorldColorConfig {
  bg: string;
  g1: string;
  g2: string;
  dark: string;
  mid: string;
  light: string;
  rowBorder: string;
  bentoBg: string;
  vibe: string;
  icon: string;
  tag: string;
  desc: string;
}

export const worldColors: Record<string, WorldColorConfig> = {
  "creating-expressing": {
    bg: "#E8DEFF", g1: "#7F77DD", g2: "#AFA9EC",
    dark: "#26215C", mid: "#534AB7", light: "#EEEDFE",
    rowBorder: "#D5D0F5", bentoBg: "#F7F5FF",
    vibe: "Bold. Visual. Making people feel things.",
    icon: "🎨", tag: "#StoryArchitect",
    desc: "I see the world differently — and I have the urge to show everyone what I see.",
  },
  "business-leading": {
    bg: "#C8F7E8", g1: "#1D9E75", g2: "#5DCAA5",
    dark: "#04342C", mid: "#0F6E56", light: "#E1F5EE",
    rowBorder: "#B8EDD8", bentoBg: "#F0FDF7",
    vibe: "Hungry. Visionary. Building from day one.",
    icon: "🚀", tag: "#FutureBuilder",
    desc: "I see problems as opportunities — and I'm building something that didn't exist before.",
  },
  "discovering-understanding": {
    bg: "#C8E4FF", g1: "#378ADD", g2: "#85B7EB",
    dark: "#042C53", mid: "#185FA5", light: "#E6F1FB",
    rowBorder: "#B5D4F4", bentoBg: "#F0F7FF",
    vibe: "Curious. Deep. Always asking why.",
    icon: "🔬", tag: "#KnowledgeBuilder",
    desc: "I'm driven by questions — and I won't stop until I find the answers.",
  },
  "people-community": {
    bg: "#FFE8B0", g1: "#BA7517", g2: "#EF9F27",
    dark: "#412402", mid: "#633806", light: "#FAEEDA",
    rowBorder: "#F5DFA0", bentoBg: "#FFFBF0",
    vibe: "Warm. Purpose-driven. Here for people.",
    icon: "🤝", tag: "#ChangeAgent",
    desc: "I'm at my best when I'm making life better for the people around me.",
  },
  "building-making": {
    bg: "#FFD4C2", g1: "#D85A30", g2: "#F0997B",
    dark: "#4A1B0C", mid: "#712B13", light: "#FAECE7",
    rowBorder: "#F5C4B3", bentoBg: "#FFF5F2",
    vibe: "Precise. Hands-on. Built different.",
    icon: "🔨", tag: "#CoreBuilder",
    desc: "I love turning ideas into real things people can see and touch.",
  },
  "systems-order": {
    bg: "#E0DDD8", g1: "#5F5E5A", g2: "#888780",
    dark: "#2C2C2A", mid: "#444441", light: "#F1EFE8",
    rowBorder: "#D3D1C7", bentoBg: "#F8F7F5",
    vibe: "Sharp. Logical. Zero wasted moves.",
    icon: "⚙️", tag: "#TechNative",
    desc: "I make sense of complexity — and I love it when everything works as it should.",
  },
  "planet-protector": {
    bg: "#C8F0CC", g1: "#3B6D11", g2: "#97C459",
    dark: "#173404", mid: "#27500A", light: "#EAF3DE",
    rowBorder: "#C0DD97", bentoBg: "#F3FDF0",
    vibe: "Grounded. Global. On a real mission.",
    icon: "🌱", tag: "#PlanetProtector",
    desc: "I feel the responsibility to protect this world — and I have the skills to do it.",
  },
  "body-hacker": {
    bg: "#FFD0D0", g1: "#E24B4A", g2: "#F09595",
    dark: "#501313", mid: "#791F1F", light: "#FCEBEB",
    rowBorder: "#F7C1C1", bentoBg: "#FFF2F2",
    vibe: "Driven. Disciplined. No limits.",
    icon: "💪", tag: "#BodyHacker",
    desc: "I understand what the human body can do — and I want to push it further.",
  },
};
