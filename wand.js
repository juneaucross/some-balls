'use strict';

const canvas = document.getElementById('canvas');
const cw = window.innerWidth;
const ch = window.innerHeight;
const ctx = canvas.getContext('2d');

canvas.width = cw;
canvas.height = ch;

let amount = 500;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 7 + 7;
    this.speed = Math.random() * 5 + 3;
  }

  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.speed);
    if (this.size > 0.5) {
      this.size -= this.size / 40;
    }
    this.color = `hsl(${this.x + this.y / this.speed}, 100%, 50%)`;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  delete(i, arr) {
    if (this.y + this.size < 0) {
      arr.splice(i, 1);
    }
  }
}

const particles = [];
canvas.addEventListener('mousemove', ({ clientX, clientY }) => {
  particles.unshift(new Particle(clientX, clientY));
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, i, arr) => {
    particle.draw();
    particle.update();
  });

  if (particles.length > amount) {
    for (let i = 0; i < 200; i++) {
      particles.pop();
    }
  }

  requestAnimationFrame(animate);
}
animate();
