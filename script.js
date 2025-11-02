const canvas = document.getElementById("planetCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const planetTextLove = [
  "Te amo ❤",
  "Eres mi vida 🌙",
  "Mi reina 👑",
  "Eres preciosa 💕",
  "Me encantas 💫",
  "Mi diosa 💐",
  "Amor de mi vida 💖",
  "Contigo todo es mejor 💓",
  "Mi corazón te pertenece 💘",
  "Mis ojos brillan por ti😘"
];

let angle = 0;
const hearts = [];
const stars = [];

// 💗 Clase para los corazones flotantes
class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 8 + 2;
    this.speed = Math.random() * 0.5 + 0.2;
  }
  draw() {
    ctx.font = `${this.size * 2}px serif`;
    ctx.fillText("💖", this.x, this.y);
  }
  update() {
    this.y -= this.speed;
    if (this.y < -10) {
      this.y = canvas.height + 10;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

// 🌟 Clase para el polvo estelar de la galaxia
class Star {
  constructor(radius, speed, size) {
    this.angle = Math.random() * Math.PI * 2;
    this.radius = radius;
    this.speed = speed;
    this.size = size;
  }
  update() {
    this.angle += this.speed;
  }
  draw(x, y) {
    const px = x + Math.cos(this.angle) * this.radius;
    const py = y + Math.sin(this.angle) * this.radius;
    ctx.beginPath();
    ctx.arc(px, py, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fill();
  }
}

// Crear corazones iniciales
for (let i = 0; i < 50; i++) {
  hearts.push(new Heart());
}

// Crear estrellas de polvo galáctico
for (let i = 0; i < 120; i++) {
  const radius = Math.random() * 400 + 130; // distancia del centro
  const speed = (Math.random() * 0.002 + 0.001) * (Math.random() < 0.5 ? 1 : -1);
  const size = Math.random() * 1.5 + 0.3;
  stars.push(new Star(radius, speed, size));
}

function drawPlanet() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fondo con corazones flotando
  hearts.forEach(h => h.update());

  // 🌌 Centro del planeta/galaxia
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const radius = 120;

// 💖 Capa base en forma de corazón
ctx.save();
ctx.translate(x, y);
ctx.scale(1.3, 1.3); // tamaño del corazón

const gradient = ctx.createRadialGradient(-10, -10, 10, 0, 0, radius);
gradient.addColorStop(0, "#ffe6f9");
gradient.addColorStop(0.4, "#ff69b4");
gradient.addColorStop(1, "#c71585");
ctx.fillStyle = gradient;

ctx.beginPath();
ctx.moveTo(0, 0);
ctx.bezierCurveTo(-radius, -radius, -radius * 1.5, radius * 0.5, 0, radius * 1.3);
ctx.bezierCurveTo(radius * 1.5, radius * 0.5, radius, -radius, 0, 0);
ctx.fill();

ctx.restore();

// 🌠 Halo brillante en forma de corazón
ctx.save();
ctx.translate(x, y);
ctx.scale(1.4, 1.4);
const haloGradient = ctx.createRadialGradient(0, 0, radius * 0.3, 0, 0, radius * 1.6);
haloGradient.addColorStop(0, "rgba(255, 182, 193, 0.3)");
haloGradient.addColorStop(1, "rgba(255, 20, 147, 0)");
ctx.fillStyle = haloGradient;

ctx.beginPath();
ctx.moveTo(0, 0);
ctx.bezierCurveTo(-radius, -radius, -radius * 1.5, radius * 0.5, 0, radius * 1.3);
ctx.bezierCurveTo(radius * 1.5, radius * 0.5, radius, -radius, 0, 0);
ctx.fill();
ctx.restore();

// 💘 Flecha que atraviesa el corazón
ctx.save();
ctx.translate(x, y);
ctx.rotate(Math.PI / 4); // inclinación de la flecha
ctx.strokeStyle = "gold";
ctx.lineWidth = 4;
ctx.shadowColor = "rgba(255,215,0,0.8)";
ctx.shadowBlur = 15;

// Cuerpo de la flecha
ctx.beginPath();
ctx.moveTo(-radius * 1.5, 0);
ctx.lineTo(radius * 1.5, 0);
ctx.stroke();

// Punta de la flecha
ctx.beginPath();
ctx.moveTo(radius * 1.5, 0);
ctx.lineTo(radius * 1.3, -10);
ctx.lineTo(radius * 1.3, 10);
ctx.closePath();
ctx.fillStyle = "gold";
ctx.fill();

// Plumas traseras
ctx.beginPath();
ctx.moveTo(-radius * 1.5, 0);
ctx.lineTo(-radius * 1.7, -10);
ctx.lineTo(-radius * 1.7, 10);
ctx.closePath();
ctx.fill();
ctx.restore();

// 💫 Polvo estelar girando alrededor
stars.forEach(star => {
  star.update();
  star.draw(x, y);
});

  // ✴️ Efecto de brillo giratorio
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle * 2);
  ctx.strokeStyle = "rgba(255, 182, 193, 0.7)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < 100; i++) {
    const r = radius + Math.sin(i / 10 + angle) * 10;
    const px = Math.cos(i * 0.1) * r;
    const py = Math.sin(i * 0.1) * r;
    ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  // 💬 Frases orbitando alrededor del planeta
  for (let i = 0; i < planetTextLove.length; i++) {
    const orbitRadius = 250;
    const textAngle = angle + (i * (Math.PI * 2 / planetTextLove.length));
    const textX = x + Math.cos(textAngle) * orbitRadius;
    const textY = y + Math.sin(textAngle) * orbitRadius;

    ctx.font = "22px Poppins";
    ctx.fillStyle = "#fff";
    ctx.fillText(planetTextLove[i], textX - 60, textY);
  }

  angle += 0.01;
  requestAnimationFrame(drawPlanet);
}

drawPlanet();

// Ajustar tamaño del lienzo al cambiar la ventana
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});