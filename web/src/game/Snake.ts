import { SnakeDirection, SnakeOffset, SnakeStatus } from '../enum/SnakeStatus'
import Cell from './Cell'
import GameBase from './GameBase'
import Map from './Map'

class Snake extends GameBase {
  public status: SnakeStatus
  public direction: SnakeDirection
  public cells: Cell[]
  public nextCell: Cell | null
  public step: number
  public speed: number
  constructor(
    public id: number,
    public row: number,
    public col: number,
    public map: Map,
    public color: string
  ) {
    super()
    this.status = SnakeStatus.idle
    this.direction = SnakeDirection.never
    this.cells = []
    this.nextCell = null
    this.step = 0
    this.speed = 5
  }
  start(): void {
    this.init()
  }
  init(): void {
    this.cells.push(new Cell(this.row, this.col, this.map))
  }
  update(): void {
    if (this.status === SnakeStatus.move) this.update_move()
    this.render()
  }
  set_next_step(d: SnakeDirection): void {
    this.direction = d
  }
  next_step(): void {
    const d = this.direction
    this.direction = SnakeDirection.never
    this.status = SnakeStatus.move
    this.nextCell = new Cell(
      this.cells[0].row + SnakeOffset[d].y,
      this.cells[0].col + SnakeOffset[d].x,
      this.map
    )
    for (let i = this.cells.length; i > 0; i--)
      this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]))
    this.step++
  }
  update_move(): void {
    if (!this.nextCell) return
    const dx = this.nextCell.x - this.cells[0].x,
      dy = this.nextCell.y - this.cells[0].y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < 0.01) {
      this.status = SnakeStatus.idle
      this.cells[0] = this.nextCell
      this.nextCell = null
    } else {
      const move_distance = (this.speed * this.time) / 1000 // 每两帧之间走的距离
      this.cells[0].x += (move_distance * dx) / distance
      this.cells[0].y += (move_distance * dy) / distance
    }
  }
  render(): void {
    const { ctx, L } = this.map
    ctx.fillStyle = this.color
    for (const cell of this.cells) {
      ctx.beginPath()
      ctx.arc(cell.x * L, cell.y * L, (L / 2) * 0.8, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

export default Snake
