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
