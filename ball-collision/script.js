// bounding box
const box = document.getElementById("box");
const width = window.innerWidth;
const height = window.innerHeight;
// const width = 1000;
// const height = 800;
// box.style.backgroundColor = "#060017";
box.style.border = "solid 0.1px #00FFD4";
box.style.width = `${width}px`;
box.style.height = `${height}px`;
box.style.position = "relative";

// ball constants
const numberOfBalls = 300;
const minRadius = 4;
const maxRadius = 10;
const minSpeed = 1;
const maxSpeed = 3;
const balls = [];

// Ball class
class Ball {
  constructor(x = 0, y = 0, dx, dy, color, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.radius = radius;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.height = `${this.radius * 2}px`;
    this.element.style.width = `${this.radius * 2}px`;
    this.element.style.borderRadius = `50%`;
    this.element.style.backgroundColor = `${this.color}`;
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
    this.element.addEventListener("click", () => {
      console.log(this.element.style.left, this.element.style.top);
    });
    // append element=ball in box=bounding box
    box.appendChild(this.element);
  }

  move() {
    // to keep the ball within the bounding box and move back when it touches it
    if (this.x + this.dx < 0 || this.x + this.radius * 2 + this.dx > width) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy < 0 || this.y + this.radius * 2 + this.dy > height) {
      this.dy = -this.dy;
    }
    if (this.y < 0) {
      this.y = 1;
    }
    if (this.x < 0) {
      this.x = 1;
    }
    if (this.y + this.radius * 2 > height) {
      this.y = height - this.radius * 2 - 2;
    }
    if (this.x + this.radius * 2 >= width) {
      this.x = width - 2 * this.radius - 2;
    }

    // for normal motion
    this.x += this.dx;
    this.y += this.dy;

    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }
}

// Helper Functions
// get random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  // Array of light shades of colors for the given darker shade of background.
  const colors = [
    "#FFB6C1",
    "#FFD700",
    "#ADFF2F",
    "#7FFFD4",
    "#87CEFA",
    "#FF69B4",
    "#FFA07A",
    "#FF6347",
    "#EE82EE",
    "#98FB98",
    "#AFEEEE",
    "#F0E68C",
    "#D8BFD8",
    "#E6E6FA",
    "#F5DEB3",
  ];

  // Return a random color from the array
  return colors[Math.floor(Math.random() * colors.length)];
}

// function to initialize given number of balls
function getBalls() {
  for (let i = 0; i < numberOfBalls; i++) {
    const ball = new Ball(
      getRandomInt(maxRadius * 2, width - maxRadius * 2),
      getRandomInt(maxRadius * 2, height - maxRadius * 2),
      getRandomInt(minSpeed, maxSpeed) * (Math.random() < 0.5 ? -1 : 1),
      getRandomInt(minSpeed, maxSpeed) * (Math.random() < 0.5 ? -1 : 1),
      getRandomColor(),
      getRandomInt(minRadius, maxRadius)
    );

    balls.push(ball);
  }
}
getBalls();

// Helper function to check if any two balls have overlapped.
function ballOverlap(ball1, ball2) {
  let dx = ball1.x - ball2.x;
  let dy = ball1.y - ball2.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  return distance < ball1.radius + ball2.radius;
}

//function to solve the overlap problem. sometimes two ball overlap each other

// Handle ball collision
function handleBallCollision(ball1, ball2) {
  // Swap velocities of the colliding balls
  let tempDx = ball1.dx;
  let tempDy = ball1.dy;
  ball1.dx = ball2.dx;
  ball1.dy = ball2.dy;
  ball2.dx = tempDx;
  ball2.dy = tempDy;
}

function clearFixOverlap(ball1, ball2) {
  let dx = ball1.x - ball2.x;
  let dy = ball1.y - ball2.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  let overlap = ball1.radius + ball2.radius - distance;
  ball1.x += overlap;
  ball2.x -= overlap;
  ball1.y += overlap;
  ball2.y -= overlap;
}

// Collision detection
function moveBalls() {
  // moving each ball to check collision
  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    for (let j = i + 1; j < balls.length; j++) {
      if (ballOverlap(balls[i], balls[j])) {
        handleBallCollision(balls[i], balls[j]);
        clearFixOverlap(balls[i], balls[j]);
      }
    }
  }

  requestAnimationFrame(moveBalls);
}

moveBalls();
