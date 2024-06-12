interface ICar {
  x: number;
  y: number;
  img: HTMLImageElement;
  width: number;
  height: number;
}

export default class Car implements ICar {
  x: number;
  y: number;
  img: HTMLImageElement;
  width: number;
  height: number;

  constructor(
    x: number,
    y: number,
    imgSrc: string,
    width: number,
    height: number
  ) {
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = imgSrc;
    this.width = width;
    this.height = height;
  }
}
