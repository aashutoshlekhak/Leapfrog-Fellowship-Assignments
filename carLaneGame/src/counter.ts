import Car from "./Models/Car";
import {
  CAR_DIMENSIONS,
  CAR_POSITION,
  DIMENSIONS,
  GAME_SPEED,
  LINE,
} from "./constants";
import carBlue from "../public/carBlue.png";
import carGrey from "../public/carGrey.png";
import carRed from "../public/carRed.png";
import carWhite from "../public/carWhite.png";
import carYellow from "../public/carYellow.png";
import { collisionDetected, getRandomInt } from "./utils";
import { GameState } from "./enums";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas?.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

let gameState: GameState = GameState.StartScreen;

// Car images array
const carImages = [carRed, carBlue, carGrey, carWhite, carYellow];

// Lane positions
const lanes = [CAR_POSITION.LEFT, CAR_POSITION.CENTER, CAR_POSITION.RIGHT];

const enemyCar1 = new Car(
  lanes[0],
  getRandomInt(-500, -200),
  carImages[getRandomInt(0, carImages.length)],
  CAR_DIMENSIONS.CAR_WIDTH,
  CAR_DIMENSIONS.CAR_HEIGHT
);
const enemyCar2 = new Car(
  lanes[1],
  getRandomInt(-400, -100),
  carImages[getRandomInt(0, carImages.length)],
  CAR_DIMENSIONS.CAR_WIDTH,
  CAR_DIMENSIONS.CAR_HEIGHT
);
const enemyCar3 = new Car(
  lanes[2],
  getRandomInt(-300, -0),
  carImages[getRandomInt(0, carImages.length)],
  CAR_DIMENSIONS.CAR_WIDTH,
  CAR_DIMENSIONS.CAR_HEIGHT
);

const enemyCar4 = new Car(
  lanes[getRandomInt(0, lanes.length)],
  getRandomInt(-1000, -500),
  carImages[getRandomInt(0, carImages.length)],
  CAR_DIMENSIONS.CAR_WIDTH,
  CAR_DIMENSIONS.CAR_HEIGHT
);

// const enemyCar5 = new Car(
//   lanes[getRandomInt(0, lanes.length)],
//   getRandomInt(-1200, -800),
//   carImages[getRandomInt(0, carImages.length)],
//   CAR_DIMENSIONS.CAR_WIDTH,
//   CAR_DIMENSIONS.CAR_HEIGHT
// );

const enemyCars = [enemyCar1, enemyCar2, enemyCar3, enemyCar4];

const playerCar = new Car(
  CAR_POSITION.CENTER,
  600,
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
function resetGame() {
  score = 0;
  playerCar.x = CAR_POSITION.CENTER;
}

function draw() {
  ctx?.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillStyle = "black";
  ctx?.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  switch (gameState) {
    case GameState.StartScreen:
      ctx.fillStyle = "white";
      ctx.font = "40px sans-serif";
      ctx.fillText(
        "Press Enter to Start",
        DIMENSIONS.CANVAS_WIDTH / 2 - 180,
        DIMENSIONS.CANVAS_HEIGHT / 2
      );
      break;

    case GameState.Running:
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
        car.y += GAME_SPEED;
        console.log(playerCar.x);
        if (collisionDetected(playerCar.y, car.y) && playerCar.x === car.x) {
          console.log("collision detected");
          gameState = GameState.GameOver;
        }
        if (car.y > DIMENSIONS.CANVAS_HEIGHT) {
          car.y = getRandomInt(-200, 0);
          car.img.src = carImages[getRandomInt(0, carImages.length)];
          if (gameState === GameState.Running) {
            score++;
          }
        }
      });
      //Draw road lines
      ctx.fillStyle = "white";
      for (let line of lines) {
        ctx.fillRect(line.x, line.y, LINE.WIDTH, LINE.HEIGHT);
        line.y += GAME_SPEED;
        if (line.y >= DIMENSIONS.CANVAS_HEIGHT) {
          line.y = -LINE.HEIGHT + 35;
        }
      }
      break;

    case GameState.GameOver:
      ctx.fillStyle = "red";
      ctx.font = "48px sans-serif";
      ctx.fillText(
        "Game Over",
        DIMENSIONS.CANVAS_WIDTH / 2 - 100,
        DIMENSIONS.CANVAS_HEIGHT / 2 - 40
      );
      ctx.font = "24px sans-serif";
      ctx.fillText(
        // `Score: ${score}`,
        `Score: 1`,
        DIMENSIONS.CANVAS_WIDTH / 2 - 40,
        DIMENSIONS.CANVAS_HEIGHT / 2
      );
      ctx.fillStyle = "white";
      ctx.fillText(
        "Press R to Restart",
        DIMENSIONS.CANVAS_WIDTH / 2 - 100,
        DIMENSIONS.CANVAS_HEIGHT / 2 + 40
      );
      break;
  }
  if (gameState !== GameState.GameOver) {
    requestAnimationFrame(draw);
  }
}

function startGame() {
  resetGame();
  gameState = GameState.Running;
  requestAnimationFrame(draw);
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toLocaleLowerCase();
  console.log(key);
  if (gameState === GameState.StartScreen && key === "enter") {
    startGame();
  } else if (gameState === GameState.GameOver && key === "r") {
    startGame();
  } else if (gameState === GameState.Running) {
    if (key === "a" || key === "arrowleft") {
      playerCar.x -= CAR_POSITION.RELOCATE;
    }
    if (key === "d" || key === "arrowright") {
      playerCar.x += CAR_POSITION.RELOCATE;
    }
  }
});

draw();
