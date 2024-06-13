export interface IPlatform {
  x: number;
  y: number;
  width: number;
  height: number;
  img: HTMLImageElement;
}

export class Platform implements IPlatform {
  x: number;
  y: number;
  width: number;
  height: number;
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
    this.img = new Image();
    this.img.src = imgSrc;
  }
}
