const canvas = document.createElement("canvas");
canvas.id = "effectCanvas";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// Make canvas cover entire viewport
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Particle class for emojis
class Particle {
  constructor(x, y, emoji) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 10; // horizontal spread
    this.vy = Math.random() * -8 - 2; // upward
    this.alpha = 1;
    this.size = Math.random() * 24 + 24;
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

function fireworkRandom(emoji) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const count = 20 + Math.floor(Math.random() * 10);
  for (let i = 0; i < count; i++) {
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

// Connect utensils to fireworks
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
  cuttingBoard: "🟫",
  knife: "🔪",
};

document.querySelectorAll(".utensil").forEach((el) => {
  el.addEventListener("click", () => {
    const emoji = utensilEmojis[el.dataset.id] || "✨";
    fireworkRandom(emoji);
  });
});
