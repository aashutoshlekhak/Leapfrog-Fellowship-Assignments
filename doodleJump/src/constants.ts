export const CANVAS_DIMENSIONS = {
  WIDTH: 360,
  HEIGHT: 576,
};
export const PLAYER_CONST = {
  WIDTH: 46,
  HEIGHT: 46,
  X: (CANVAS_DIMENSIONS.WIDTH - 46) / 2,
  Y: (CANVAS_DIMENSIONS.HEIGHT * 6) / 8 - 46,
};

export const PLATFORM = {
  WIDTH: 60,
  HEIGHT: 18,
};

// game physics
export let GRAVITY = 0.2;
export let FRICTION = 0.95;
