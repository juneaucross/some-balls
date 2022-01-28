'use strict';

const canvas = document.getElementById('canvas');
const cw = window.innerWidth;
const ch = window.innerHeight;
const ctx = canvas.getContext('2d');

canvas.width = cw;
canvas.height = ch;
const floorHeight = ch - 30;

let frame = 0;
let amount = Math.floor(cw / 90);
let balls = [];

const GRAVITy = 0.4;
const FRICTION = 0.7;

class Ball {
  constructor() {
    this.size = 20;
    this.x = Math.random() * cw - this.size * 2;
    this.y = Math.random() * ch - 35 - this.size * 2;
    this.velocity = 0;
    this.dx = Math.random() > 0.5 ? 2 : -2;
  }

  // Наверное, не совсем верно. Возможно, правильнее было бы только определять сам факт столкновения, а непосредственно логику поведения определять в методе Апдейт().
  isCollide(otherBall) {
    let dx = this.x - otherBall.x;
    let dy = this.y - otherBall.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist <= this.size + otherBall.size) {
      this.dx = -this.dx * FRICTION;
      this.velocity = -this.velocity * FRICTION;
      if (this.x < otherBall.x) {
        this.dx -= 1.3;
        otherBall.dx += 1.3;
      } else if (this.x > otherBall.x) {
        this.dx += 1.3;
        otherBall.dx -= 1.3;
      }
    }
  }

  update() {
    this.velocity += GRAVITy;
    if (
      Math.floor(this.y + this.size) >= Math.floor(ch - 30) &&
      this.velocity > 0
    ) {
      this.velocity *= -FRICTION;
      this.dx *= 0.7;
      if (this.velocity < FRICTION * 2 && this.velocity > FRICTION * -2) {
        this.velocity = 0;
      }
    }

    if (this.x + this.size > cw || this.x - this.size < 0) {
      this.dx = -this.dx;
    }
    this.y += this.velocity;
    this.x += this.dx;
  }

  draw() {
    ctx.strokeStyle = 'blue';
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, Math.PI * 2, false);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
}

document.body.addEventListener('click', () => {
  balls = [];
  for (let i = 0; i < amount; i++) {
    balls.push(new Ball());
  }
});

ctx.font = '48px sans-serif';
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frame++;
  ctx.fillStyle = 'darkgreen';
  ctx.fillText('Click to drop some balls!', 70, 70);
  ctx.fillRect(0, floorHeight, cw, ch);
  balls.forEach((currentBall) => {
    balls
      .filter((otherBall) => {
        return otherBall !== currentBall;
      })
      .forEach((otherBall) => {
        if (frame % 5 === 0) {
          currentBall.isCollide(otherBall);
        }
      });
    currentBall.update();
    currentBall.draw();
  });

  requestAnimationFrame(animate);
}
animate();
