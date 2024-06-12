import Car from "./Models/Car";
import {
  CAR_DIMENSIONS,
  CAR_POSITION,
  DIMENSIONS,
  GAME_SPEED,
  GAME_SPEED_INCREMENT_FACTOR,
  LINE,
} from "./constants";
import carBlue from "../public/carBlue.png";
import carGrey from "../public/carGrey.png";
import carRed from "../public/carRed.png";
import carWhite from "../public/carWhite.png";
import carYellow from "../public/carYellow.png";
import { collisionDetected, getRandomInt } from "./utils";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas?.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

// Car images array
const carImages = [carRed, carBlue, carGrey, carWhite, carYellow];
let gameSpeed = GAME_SPEED;
// Lane positions
const lanes = [CAR_POSITION.LEFT, CAR_POSITION.CENTER, CAR_POSITION.RIGHT];

const enemyCar1 = new Car(
  lanes[0],
  getRandomInt(-1000, -0),
  carImages[getRandomInt(0, carImages.length)],
  CAR_DIMENSIONS.CAR_WIDTH,
  CAR_DIMENSIONS.CAR_HEIGHT
);
const enemyCar2 = new Car(
  lanes[1],
  getRandomInt(-1200, 0),
  carImages[getRandomInt(0, carImages.length)],
  CAR_DIMENSIONS.CAR_WIDTH,
  CAR_DIMENSIONS.CAR_HEIGHT
);
const enemyCar3 = new Car(
  lanes[2],
  getRandomInt(-1200, 0),
  carImages[getRandomInt(0, carImages.length)],
  CAR_DIMENSIONS.CAR_WIDTH,
  CAR_DIMENSIONS.CAR_HEIGHT
);

//@ts-ignore
const enemyCar4 = new Car(
  lanes[getRandomInt(0, lanes.length)],
  getRandomInt(-1200, -500),
  carImages[getRandomInt(0, carImages.length)],
  CAR_DIMENSIONS.CAR_WIDTH,
  CAR_DIMENSIONS.CAR_HEIGHT
);

const enemyCars = [enemyCar1, enemyCar2, enemyCar3];

const playerCar = new Car(
  CAR_POSITION.CENTER,
  650,
  carRed,
  CAR_DIMENSIONS.CAR_WIDTH,
  CAR_DIMENSIONS.CAR_HEIGHT
);

const lines = [
  { x: 145, y: 0 },
  { x: 145, y: 200 },
  { x: 145, y: 400 },
  { x: 145, y: 600 },
  { x: 295, y: 0 },
  { x: 295, y: 200 },
  { x: 295, y: 400 },
  { x: 295, y: 600 },
];

let score = 0;

function updateScore() {
  enemyCars.forEach((car) => {
    if (car.y >= playerCar.y + playerCar.height) {
      score++;
      gameSpeed *= GAME_SPEED_INCREMENT_FACTOR;
      //to move car outside of screent and prevent multiple scorre increments.
      car.y = getRandomInt(-500, 0);
    }
  });
}

function drawScores() {
  const currentScoreElement = document.getElementById("current-score");
  const highScoreElement = document.getElementById("high-score");

  if (currentScoreElement) {
    currentScoreElement.textContent = score.toString();
  }

  const highScore = Number(localStorage.getItem("highScore")) || 0;
  if (highScoreElement) {
    highScoreElement.textContent = highScore.toString();
  }
}

function draw() {
  ctx?.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillStyle = "black";
  ctx?.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  if (playerCar.img.complete) {
    ctx.drawImage(
      playerCar.img,
      playerCar.x,
      playerCar.y,
      playerCar.width,
      playerCar.height
    );
  }

  // Draw enemy cars
  enemyCars.forEach((car) => {
    if (car.img.complete) {
      ctx.drawImage(car.img, car.x, car.y, car.width, car.height);
    }
    car.y += gameSpeed;
    console.log(playerCar.x);
    if (collisionDetected(playerCar.y, car.y) && playerCar.x === car.x) {
      gameSpeed = 0;
      const highScore = Number(localStorage.getItem("highScore")) || 0;
      if (score > highScore) {
        localStorage.setItem("highScore", String(score));
      }
      window.location.href = `./gameOver.html?score=${score}`;
    }
    if (car.y > DIMENSIONS.CANVAS_HEIGHT) {
      car.y = getRandomInt(-500, 0);
      car.img.src = carImages[getRandomInt(0, carImages.length)];
    }
  });

  // Draw road lines
  ctx.fillStyle = "white";
  for (let line of lines) {
    ctx.fillRect(line.x, line.y, LINE.WIDTH, LINE.HEIGHT);
    line.y += gameSpeed;
    if (line.y >= DIMENSIONS.CANVAS_HEIGHT) {
      line.y = -LINE.HEIGHT + 35;
    }
  }

  // Update and draw the score
  updateScore();
  drawScores();

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

document.addEventListener("keydown", (event) => {
  const key = event.key.toLocaleLowerCase();
  console.log(key);
  if (key === "a" || key === "arrowleft") {
    if (playerCar.x > CAR_POSITION.LEFT) {
      playerCar.x -= CAR_POSITION.RELOCATE;
    }
  }

  if (key === "d" || key === "arrowright") {
    if (playerCar.x < CAR_POSITION.RIGHT) {
      playerCar.x += CAR_POSITION.RELOCATE;
    }
  }
});
