import { Platform } from "./Models/Platform";
import { Player } from "./Models/Player";

//detects collision between two rectangles
export function detectCollision(a: Player, b: Platform) {
  return (
    a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
    a.x + a.width > b.x && //a's top right corner passes b's top left corner
    a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
    a.y + a.height > b.y //a's bottom left corner passes b's top left cornerl
  );
}

export function getRandomInt(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
