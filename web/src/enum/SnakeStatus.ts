export enum SnakeDirection {
  up,
  right,
  down,
  left,
  never,
}

export enum SnakeStatus {
  idle = 'idle',
  move = 'move',
  die = 'die',
}

export const SnakeOffset = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
]

export enum SnakeEyeDirection {
  up,
  right,
  down,
  left,
}

export const SnakeEyeOffset = [
  { x1: -1, y1: -1, x2: 1, y2: -1 },
  { x1: 1, y1: -1, x2: 1, y2: 1 },
  { x1: 1, y1: 1, x2: -1, y2: 1 },
  { x1: -1, y1: 1, x2: -1, y2: -1 },
]
