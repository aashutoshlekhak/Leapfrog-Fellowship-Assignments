export const DIMENSIONS = {
  CANVAS_WIDTH: 450,
  CANVAS_HEIGHT: 800,
};

export const CAR_DIMENSIONS = {
  CAR_WIDTH: 50,
  CAR_HEIGHT: 80,
};

export const LINE = {
  WIDTH: 10,
  HEIGHT: 60
};
export const CAR_POSITION = {
  CENTER: (DIMENSIONS.CANVAS_WIDTH - CAR_DIMENSIONS.CAR_WIDTH - LINE.WIDTH) / 2,

  RELOCATE: DIMENSIONS.CANVAS_WIDTH / 3,
  LEFT: 45,
  RIGHT: DIMENSIONS.CANVAS_WIDTH - 105,
};

export const BOUNDARY_LINE = {
  WIDTH: 10,
  HEIGHT: 20,
};

export const GAME_SPEED=5;
export const GAME_SPEED_INCREMENT_FACTOR=1.02

export const MIN_DISTANCE_BETWEEN_CARS = 1;
