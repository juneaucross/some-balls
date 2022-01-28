'use strict';

// Инициализацию канваса можно вынести в отдельный модуль
const canvas = document.getElementById('canvas');
const cw = window.innerWidth;
const ch = window.innerHeight;
const ctx = canvas.getContext('2d');

canvas.width = cw;
canvas.height = ch;

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Классы тоже можно было бы поместить в отдельные файлы
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.initX = this.x;
    this.initY = this.y;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.size = 10;
    this.speed = Math.random() * 1 + 0.5;
  }

  getDistance(mouse) {
    let dx = this.x + this.size / 2 - mouse.x;
    let dy = this.y + this.size / 2 - mouse.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= 100) {

      // Эту простыню было бы здорово разделить на функции
      if (this.x < mouse.x) {
        this.xSpeed = -this.speed;
      } else {
        this.xSpeed = this.speed;
      }

      if (this.y < mouse.y) {
        this.ySpeed = -this.speed;
      } else {
        this.ySpeed = this.speed;
      }

    } else if (dist > 100) {
      if (this.initX < this.x) {
        this.xSpeed = -this.speed;
      } else if (this.initX > this.x) {
        this.xSpeed = this.speed;
      } else {
        this.xSpeed = 0;
      }

      if (this.initY < this.y) {
        this.ySpeed = -this.speed;
      } else if (this.initY > this.y) {
        this.ySpeed = this.speed;
      } else {
        this.ySpeed = 0;
      }
    }
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  draw() {
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

const amount = 100;
const particles = [];
for (let i = 0; i < amount; i++) {
  for (let j = 0; j < amount; j++) {
    particles.push(new Particle(i * 30, j * 30));
  }
}

ctx.fillStyle = 'red';
function animate() {
  ctx.clearRect(0, 0, cw, ch);

  particles.forEach((p) => {
    p.getDistance(mouse);
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}
animate();
