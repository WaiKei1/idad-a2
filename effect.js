const canvas = document.createElement("canvas");
canvas.id = "effectCanvas";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// Canvas setup
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Particle class
class Particle {
  constructor(x, y, emoji) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 8; // side spread
    this.vy = Math.random() * -6 - 2; // upward motion
    this.alpha = 1;
    this.size = Math.random() * 18 + 18;
    this.emoji = emoji;
    this.gravity = 0.2;
  }

  update() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.015;
  }

  draw(ctx) {
    ctx.globalAlpha = this.alpha;
    ctx.font = `${this.size}px serif`;
    ctx.fillText(this.emoji, this.x, this.y);
    ctx.globalAlpha = 1;
  }

  isAlive() {
    return this.alpha > 0;
  }
}

let particles = [];

// fireworks localized near utensil
function sparkleAtUtensil(el, emoji, pitch = 0) {
  const rect = el.getBoundingClientRect(); // get utensil position
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // number of sparkles linked to pitch intensity
  // higher pitch -> more sparkles
  // More dramatic sparkle scaling
  const baseCount = 12;
  const extra = Math.pow(Math.abs(pitch), 1.5) * 2; // nonlinear scaling
  const count = Math.floor(baseCount + extra);

  // particle size also changes with pitch
  const pitchScale = 1 + Math.abs(pitch) / 20; // 1 to ~2.2

  for (let i = 0; i < count; i++) {
    const x = centerX + (Math.random() - 0.5) * rect.width; // slightly spread near utensil
    const y = centerY + (Math.random() - 0.5) * rect.height;
    particles.push(new Particle(x, y, emoji));
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw(ctx);
    if (!p.isAlive()) particles.splice(i, 1);
  }
  requestAnimationFrame(animate);
}
animate();

// Emoji map
const utensilEmojis = {
  teapot: "🫖",
  teaCup: "☕️",
  salt: "🧂",
  pepper: "🌶️",
  vinegar: "🍾",
  pan: "🍳",
  panLid: "⚫️",
  bowl: "🥣",
  glass: "🫙",
  spoon: "🥄",
  chopsticks: "🥢",
  cuttingBoard: "🪵",
  knife: "🔪",
};

// main script can trigger sparkle with pitch
window.sparkleAtUtensil = sparkleAtUtensil;
