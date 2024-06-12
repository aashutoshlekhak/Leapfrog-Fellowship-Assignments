import { CAR_DIMENSIONS } from "./constants";

export function getRandomInt(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min));
}

export function collisionDetected(
  playerPosition: number,
  enemyPosition: number
) {
  return (
    Math.abs(playerPosition - enemyPosition) < CAR_DIMENSIONS.CAR_HEIGHT - 5
  );
}
