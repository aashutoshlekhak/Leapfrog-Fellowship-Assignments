export interface IPlayer {
  x: number;
  y: number;
  width: number;
  height: number;
  dx: number;
  dy: number;
  img: HTMLImageElement;
}

export class Player implements IPlayer {
  x: number;
  y: number;
  width: number;
  height: number;
  dx: number;
  dy: number;
  img: HTMLImageElement;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    imgSrc: string
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dx = 0;
    this.dy = 0;
    this.img = new Image();
    this.img.src = imgSrc;
  }
}
