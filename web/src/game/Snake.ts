import {
  SnakeDirection,
  SnakeEyeDirection,
  SnakeEyeOffset,
  SnakeOffset,
  SnakeStatus,
} from '../enum/SnakeStatus'
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
  public eye_direction: SnakeEyeDirection
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
    if (id === 1) this.eye_direction = SnakeEyeDirection.up
    else this.eye_direction = SnakeEyeDirection.down
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
  check_delete_tail(): boolean {
    if (this.step < 10) return false
    else if (this.step % 3) return true
    return false
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
    if (!this.map.check_valid(this.nextCell)) this.status = SnakeStatus.die

    switch (d) {
      case SnakeDirection.up: {
        this.eye_direction = SnakeEyeDirection.up
        break
      }
      case SnakeDirection.right: {
        this.eye_direction = SnakeEyeDirection.right
        break
      }
      case SnakeDirection.down: {
        this.eye_direction = SnakeEyeDirection.down
        break
      }
      case SnakeDirection.left: {
        this.eye_direction = SnakeEyeDirection.left
        break
      }
    }
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
      if (this.check_delete_tail()) this.cells.pop()
    } else {
      const move_distance = (this.speed * this.time) / 1000 // 每两帧之间走的距离
      this.cells[0].x += (move_distance * dx) / distance
      this.cells[0].y += (move_distance * dy) / distance
    }
  }
  render(): void {
    const { ctx, L } = this.map
    ctx.fillStyle = this.color
    if (this.status === SnakeStatus.die) ctx.fillStyle = '#fff'
    for (const cell of this.cells) {
      ctx.beginPath()
      ctx.arc(cell.x * L, cell.y * L, (L / 2) * 0.8, 0, Math.PI * 2)
      ctx.fill()
    }

    for (let i = 1; i < this.cells.length; i++) {
      const a = this.cells[i - 1],
        b = this.cells[i]
      if (Math.abs(a.x - b.x) < 0.01 && Math.abs(a.y - b.y) < 0.01) continue
      if (Math.abs(a.x - b.x) < 0.01) {
        ctx.fillRect((a.x - 0.4) * L, Math.min(a.y, b.y) * L, L * 0.8, Math.abs(a.y - b.y) * L)
      } else {
        ctx.fillRect(Math.min(a.x, b.x) * L, (a.y - 0.4) * L, Math.abs(a.x - b.x) * L, L * 0.8)
      }
    }
    const h = this.cells[0]
    ctx.fillStyle = '#000'
    ctx.beginPath()

    ctx.arc(
      (h.x + SnakeEyeOffset[this.eye_direction].x1 * 0.2) * L,
      (h.y + SnakeEyeOffset[this.eye_direction].y1 * 0.2) * L,
      L * 0.06,
      0,
      Math.PI * 2
    )
    ctx.arc(
      (h.x + SnakeEyeOffset[this.eye_direction].x2 * 0.2) * L,
      (h.y + SnakeEyeOffset[this.eye_direction].y2 * 0.2) * L,
      L * 0.06,
      0,
      Math.PI * 2
    )
    ctx.fill()
  }
}

export default Snake
