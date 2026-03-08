import confetti from "canvas-confetti";

export function fireConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ["#4ade80", "#22d3ee", "#f97316", "#a78bfa", "#f472b6"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ["#4ade80", "#22d3ee", "#f97316", "#a78bfa", "#f472b6"],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

export function fireBurst() {
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors: ["#4ade80", "#22d3ee", "#f97316", "#a78bfa", "#f472b6"],
  });
}
