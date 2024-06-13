// //old approach

// // import playerL from "../public/images/blueL.png";
// // import playerR from "../public/images/blueR.png";
// // import { Player } from "./Models/Player";
// // import {
// //   CANVAS_DIMENSIONS,
// //   FRICTION,
// //   GRAVITY,
// //   PLATFORM,
// //   PLAYER_CONST,
// // } from "./constants";
// // import platformImg from "../public/images/platform.png";
// // import { Platform } from "./Models/Platform";
// // import { detectCollision, getRandomInt } from "./utils";

// // //some constants
// // // game physics constants
// // let velocityX = 0;
// // let velocityY = 0;
// // let initialVelocityY = -6;
// // // let gravity = 0.4;
// // // let friction = 0.98;
// // let platformArray: Platform[] = [];

// // let score = 0;
// // let gameOver = false;
// // let player = new Player(
// //   PLAYER_CONST.X,
// //   PLAYER_CONST.Y,
// //   PLAYER_CONST.WIDTH,
// //   PLAYER_CONST.HEIGHT,
// //   playerL
// // );
// // //game physics

// // window.onload = function () {
// //   const board = document.querySelector<HTMLCanvasElement>("canvas")!;
// //   board.width = CANVAS_DIMENSIONS.WIDTH;
// //   board.height = CANVAS_DIMENSIONS.HEIGHT;
// //   const context = board.getContext("2d")!;

// //   if (player.img.complete) {
// //     drawPlayer(context);
// //   } else {
// //     player.img.onload = () => {
// //       drawPlayer(context);
// //     };
// //   }
// //   velocityY = initialVelocityY;
// //   placePlatforms();
// //   requestAnimationFrame(update);
// //   document.addEventListener("keydown", moveDoddler);
// // };

// // function update() {
// //   requestAnimationFrame(update);
// //   if (gameOver) {
// //     return;
// //   }
// //   const board = document.querySelector<HTMLCanvasElement>("canvas")!;
// //   const context = board.getContext("2d")!;

// //   context.clearRect(0, 0, board.width, board.height);
// //   player.x += velocityX;
// //   velocityY += GRAVITY;
// //   player.y += velocityY;
// //   velocityX *= FRICTION;
// //   drawPlayer(context);
// //   if (player.x > board.width) {
// //     player.x = 0;
// //   } else if (player.x < 0) {
// //     player.x = board.width;
// //   }
// //   //for middle screen detection and move player downwards
// //   if (player.y < CANVAS_DIMENSIONS.HEIGHT / 2) {
// //     platformArray.forEach((platform) => {
// //       platform.y += -velocityY; // Move platforms downward
// //     });
// //     player.y = CANVAS_DIMENSIONS.HEIGHT / 2;
// //   }
// //   //for game over
// //   if (player.y > CANVAS_DIMENSIONS.HEIGHT) {
// //     gameOver = true;
// //   }
// //   //for painting platform
// //   for (let i = 0; i < platformArray.length; i++) {
// //     let platform = platformArray[i];
// //     if (velocityY < 0 && player.y < (CANVAS_DIMENSIONS.HEIGHT * 3) / 4) {
// //       platform.y -= initialVelocityY;
// //     }
// //     context.drawImage(
// //       platform.img,
// //       platform.x,
// //       platform.y,
// //       platform.width,
// //       platform.height
// //     );
// //     if (detectCollision(player, platform) && velocityY > 0) {
// //       velocityY = initialVelocityY; //to jump off from the platform
// //     }
// //     //clear platforms and add new platforms to compensate the fallen off platforms.
// //   }
// //   while (
// //     platformArray.length > 0 &&
// //     platformArray[0].y >= CANVAS_DIMENSIONS.HEIGHT
// //   ) {
// //     platformArray.shift();
// //     score++;
// //     newPlatform();
// //   }

// //   //score
// //   context.fillStyle = "black";
// //   context.font = "16px sans-serif";
// //   context.fillText(score.toString(), 5, 20);

// //   if (gameOver) {
// //     context.fillText(
// //       "Game Over: Press 'R' to Restart",
// //       CANVAS_DIMENSIONS.WIDTH / 7,
// //       (CANVAS_DIMENSIONS.HEIGHT * 7) / 8
// //     );
// //   }
// // }
// // //for painting player
// // function drawPlayer(context: CanvasRenderingContext2D) {
// //   context.drawImage(
// //     player.img,
// //     player.x,
// //     player.y,
// //     player.width,
// //     player.height
// //   );
// // }

// // function moveDoddler(e: KeyboardEvent) {
// //   if (e.code == "ArrowRight" || e.code == "KeyD") {
// //     velocityX = 4;
// //     let newImg = new Image();
// //     newImg.src = playerR;
// //     newImg.onload = () => {
// //       player.img = newImg;
// //     };
// //   } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
// //     velocityX = -4;
// //     let newImg = new Image();
// //     newImg.src = playerL;
// //     newImg.onload = () => {
// //       player.img = newImg;
// //     };
// //   } else if (e.code == "KeyR" && gameOver) {
// //     player = new Player(
// //       PLAYER_CONST.X,
// //       PLAYER_CONST.Y,
// //       PLAYER_CONST.WIDTH,
// //       PLAYER_CONST.HEIGHT,
// //       playerL
// //     );
// //     velocityX = 0;
// //     velocityY = initialVelocityY;
// //     score = 0;
// //     gameOver = false;
// //     placePlatforms();
// //   }
// // }

// // function placePlatforms() {
// //   platformArray = [];

// //   // starting platforms
// //   let platform = new Platform(
// //     CANVAS_DIMENSIONS.WIDTH / 2 - PLAYER_CONST.WIDTH / 2,
// //     560,
// //     PLATFORM.WIDTH,
// //     PLATFORM.HEIGHT,
// //     platformImg
// //   );
// //   platformArray.push(platform);

// //   for (let i = 0; i < 6; i++) {
// //     let randomX = getRandomInt(0, (CANVAS_DIMENSIONS.WIDTH * 3) / 4);
// //     let randomY = getRandomInt(
// //       CANVAS_DIMENSIONS.HEIGHT / 2,
// //       CANVAS_DIMENSIONS.HEIGHT - 100
// //     );
// //     let platform = new Platform(
// //       randomX,
// //       CANVAS_DIMENSIONS.HEIGHT - getRandomInt(40, 80) * i - 150, //-150 width from the first platform, -60*i == additional space between each platform
// //       PLATFORM.WIDTH,
// //       PLATFORM.HEIGHT,
// //       platformImg
// //     );
// //     platformArray.push(platform);
// //   }
// // }

// // // to regenerate additional platform.
// // function newPlatform() {
// //   let randomX = getRandomInt(0, (CANVAS_DIMENSIONS.WIDTH * 3) / 4);
// //   let platform = new Platform(
// //     randomX,
// //     -PLATFORM.HEIGHT, //for y position
// //     PLATFORM.WIDTH,
// //     PLATFORM.HEIGHT,
// //     platformImg
// //   );
// //   platformArray.push(platform);
// // }

// import playerL from "../public/images/blueL.png";
// import playerR from "../public/images/blueR.png";
// import { Player } from "./Models/Player";
// import {
//   CANVAS_DIMENSIONS,
//   FRICTION,
//   GRAVITY,
//   PLATFORM,
//   PLAYER_CONST,
// } from "./constants";
// import platformImg from "../public/images/platform.png";
// import { Platform } from "./Models/Platform";
// import { detectCollision, getRandomInt } from "./utils";

// // Game physics constants
// let velocityX = 0;
// let velocityY = 0;
// let initialVelocityY = -6;
// let platformArray: Platform[] = [];
// let score = 0;
// let highScore = 0;
// let gameOver = false;
// let player = new Player(
//   PLAYER_CONST.X,
//   PLAYER_CONST.Y,
//   PLAYER_CONST.WIDTH,
//   PLAYER_CONST.HEIGHT,
//   playerL
// );

// window.onload = function () {
//   const startButton = document.getElementById("start-button")!;
//   const restartButton = document.getElementById("restart-button")!;
//   const startScreen = document.getElementById("start-screen")!;
//   const gameOverScreen = document.getElementById("game-over-screen")!;
//   const gameScreen = document.getElementById("game-screen")!;
//   const canvasBoard = document.getElementById("canvas")!;
//   const liveScore = document.getElementById("live-score")!;
//   const highScoreDisplay = document.querySelector(".high-score span")!;
//   const scoreDisplay = document.getElementById("score-display")!;

//   // Add event listeners to the buttons
//   startButton.addEventListener("click", () => {
//     startScreen.classList.add("hidden");
//     gameScreen.classList.remove("hidden");
//     canvasBoard.classList.remove("hidden");
//     liveScore.classList.remove("hidden");

//     startGame();
//   });

//   restartButton.addEventListener("click", () => {
//     gameOverScreen.classList.add("hidden");
//     gameScreen.classList.remove("hidden");
//     liveScore.classList.remove("hidden");
//     resetGame();
//   });

//   document.addEventListener("keydown", moveDoddler);

//   // Load high score from local storage
//   highScore = parseInt(localStorage.getItem("highScore") || "0");
//   highScoreDisplay.textContent = highScore.toString();
// };

// // Start the game
// function startGame() {
//   const board = document.querySelector<HTMLCanvasElement>("canvas")!;
//   board.width = CANVAS_DIMENSIONS.WIDTH;
//   board.height = CANVAS_DIMENSIONS.HEIGHT;
//   const context = board.getContext("2d")!;

//   if (player.img.complete) {
//     drawPlayer(context);
//   } else {
//     player.img.onload = () => {
//       drawPlayer(context);
//     };
//   }
//   velocityY = initialVelocityY;
//   placePlatforms();
//   requestAnimationFrame(update);
// }

// // Game loop update function
// function update() {
//   requestAnimationFrame(update);

//   // Update live score
//   const scoreBoard = document.getElementById("live-score-value")!;
//   scoreBoard.textContent = score.toString();

//   if (gameOver) {
//     const finalScore = document.getElementById("final-score")!;
//     finalScore.textContent = `Your score is: ${score}`;
//     document.getElementById("game-screen")!.classList.add("hidden");
//     document.getElementById("live-score")!.classList.add("hidden");
//     document.getElementById("game-over-screen")!.classList.remove("hidden");

//     // Update high score if needed
//     if (score > highScore) {
//       highScore = score;
//       localStorage.setItem("highScore", highScore.toString());
//       const highScoreDisplay = document.querySelector(".high-score span")!;
//       highScoreDisplay.textContent = highScore.toString();
//     }
//     return;
//   }

//   const board = document.querySelector<HTMLCanvasElement>("canvas")!;
//   const context = board.getContext("2d")!;

//   context.clearRect(0, 0, board.width, board.height);
//   player.x += velocityX;
//   velocityY += GRAVITY;
//   player.y += velocityY;
//   velocityX *= FRICTION;
//   drawPlayer(context);

//   // Wrap player position horizontally
//   if (player.x > board.width) {
//     player.x = 0;
//   } else if (player.x < 0) {
//     player.x = board.width;
//   }

//   // Move player and platforms
//   if (player.y < CANVAS_DIMENSIONS.HEIGHT / 2) {
//     platformArray.forEach((platform) => {
//       platform.y += -velocityY;
//     });
//     player.y = CANVAS_DIMENSIONS.HEIGHT / 2;
//   }

//   // Check for game over
//   if (player.y > CANVAS_DIMENSIONS.HEIGHT) {
//     gameOver = true;
//   }

//   // Draw platforms and check for collisions
//   for (let i = 0; i < platformArray.length; i++) {
//     let platform = platformArray[i];
//     if (velocityY < 0 && player.y < (CANVAS_DIMENSIONS.HEIGHT * 3) / 4) {
//       platform.y -= initialVelocityY;
//     }
//     context.drawImage(
//       platform.img,
//       platform.x,
//       platform.y,
//       platform.width,
//       platform.height
//     );
//     if (detectCollision(player, platform) && velocityY > 0) {
//       velocityY = initialVelocityY;
//     }
//   }

//   // Remove platforms that have fallen off the screen and add new ones
//   while (
//     platformArray.length > 0 &&
//     platformArray[0].y >= CANVAS_DIMENSIONS.HEIGHT
//   ) {
//     platformArray.shift();
//     score++;
//     newPlatform();
//   }

//   // Draw score on canvas
//   context.fillStyle = "black";
//   context.font = "16px sans-serif";
//   context.fillText(score.toString(), 5, 20);

//   // Show game over message
//   if (gameOver) {
//     context.fillText(
//       "Game Over: Press 'R' to Restart",
//       CANVAS_DIMENSIONS.WIDTH / 7,
//       (CANVAS_DIMENSIONS.HEIGHT * 7) / 8
//     );
//   }
// }

// // Draw the player on the canvas
// function drawPlayer(context: CanvasRenderingContext2D) {
//   context.drawImage(
//     player.img,
//     player.x,
//     player.y,
//     player.width,
//     player.height
//   );
// }

// // Handle player movement
// function moveDoddler(e: KeyboardEvent) {
//   if (e.code == "ArrowRight" || e.code == "KeyD") {
//     velocityX = 4;
//     let newImg = new Image();
//     newImg.src = playerR;
//     newImg.onload = () => {
//       player.img = newImg;
//     };
//   } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
//     velocityX = -4;
//     let newImg = new Image();
//     newImg.src = playerL;
//     newImg.onload = () => {
//       player.img = newImg;
//     };
//   } else if (e.code == "KeyR" && gameOver) {
//     resetGame();
//   }
// }

// // Reset the game state
// function resetGame() {
//   player = new Player(
//     PLAYER_CONST.X,
//     PLAYER_CONST.Y,
//     PLAYER_CONST.WIDTH,
//     PLAYER_CONST.HEIGHT,
//     playerL
//   );
//   velocityX = 0;
//   velocityY = initialVelocityY;
//   score = 0;
//   gameOver = false;
//   placePlatforms();
// }

// // Place initial platforms on the screen
// function placePlatforms() {
//   platformArray = [];

//   let platform = new Platform(
//     CANVAS_DIMENSIONS.WIDTH / 2 - PLAYER_CONST.WIDTH / 2,
//     560,
//     PLATFORM.WIDTH,
//     PLATFORM.HEIGHT,
//     platformImg
//   );
//   platformArray.push(platform);

//   for (let i = 0; i < 6; i++) {
//     let randomX = getRandomInt(0, (CANVAS_DIMENSIONS.WIDTH * 3) / 4);
//     let randomY = getRandomInt(
//       CANVAS_DIMENSIONS.HEIGHT / 2,
//       CANVAS_DIMENSIONS.HEIGHT - 100
//     );
//     let platform = new Platform(
//       randomX,
//       CANVAS_DIMENSIONS.HEIGHT - getRandomInt(40, 80) * i - 150,
//       PLATFORM.WIDTH,
//       PLATFORM.HEIGHT,
//       platformImg
//     );
//     platformArray.push(platform);
//   }
// }

// // Generate a new platform
// function newPlatform() {
//   let randomX = getRandomInt(0, (CANVAS_DIMENSIONS.WIDTH * 3) / 4);
//   let platform = new Platform(
//     randomX,
//     -PLATFORM.HEIGHT,
//     PLATFORM.WIDTH,
//     PLATFORM.HEIGHT,
//     platformImg
//   );
//   platformArray.push(platform);
// }
