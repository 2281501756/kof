import { SnakeDirection, SnakeStatus } from '../enum/SnakeStatus'
import GameBase from './GameBase'
import Snake from './Snake'
import Wall from './Wall'

class Map extends GameBase {
  public row: number
  public col: number
  public L: number
  public walls: Wall[]
  public g: boolean[][]
  public colorOdd: string
  public colorEven: string
  public wallNumber: number
  public snakes: Snake[]
  constructor(public ctx: CanvasRenderingContext2D, public parent: HTMLElement) {
    super()
    this.row = 13
    this.col = 14
    this.L = this.get_L()
    this.walls = []
    this.g = Array.from(new Array(this.col), (_) => new Array(this.row).fill(false))
    this.colorEven = '#9254de'
    this.colorOdd = '#722ed1'
    this.wallNumber = 15
    this.snakes = [
      new Snake(1, this.row - 2, 1, this, '#1890ff'),
      new Snake(2, 1, this.col - 2, this, '#cf1322'),
    ]
  }
  wallInit(): void {
    // 四边的墙
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (i === 0 || i === this.row - 1 || j === 0 || j === this.col - 1) {
          this.g[i][j] = true
          this.walls.push(new Wall(i, j, this))
        }
      }
    }
    let t = 0
    while (t < this.wallNumber) if (this.set_wall_in_map()) t++
    let copy_g: boolean[][] = JSON.parse(JSON.stringify(this.g))
    while (!this.start_and_end_link(this.row - 2, 1, 1, this.col - 2, copy_g)) {
      console.log('不连通从新渲染')
      for (let i = 0; i < this.wallNumber * 2; i++) {
        let endWall = this.walls.pop() as Wall
        this.g[endWall.row][endWall.col] = false
        endWall.destroy()
      }
      let t = 0
      while (t < this.wallNumber) if (this.set_wall_in_map()) t++
      copy_g = JSON.parse(JSON.stringify(this.g))
    }
  }
  set_wall_in_map(): boolean {
    let x = Math.floor(Math.random() * (this.row - 2)) + 1,
      y = Math.floor(Math.random() * (this.col - 2)) + 1
    if (this.g[x][y]) return false
    if ((x === this.row - 2 && y === 1) || (x === 1 && y === this.col - 2)) return false
    this.g[x][y] = true
    this.g[this.row - x - 1][this.col - y - 1] = true
    this.walls.push(new Wall(x, y, this))
    this.walls.push(new Wall(this.row - x - 1, this.col - y - 1, this))
    return true
  }
  start_and_end_link(sx: number, sy: number, ex: number, ey: number, g: boolean[][]): boolean {
    if (sx === ex && sy === ey) return true
    g[sx][sy] = true
    let dx: number[] = [-1, 0, 1, 0],
      dy: number[] = [0, 1, 0, -1]
    for (let i = 0; i < 4; i++) {
      let x = sx + dx[i],
        y = sy + dy[i]
      if (!g[x][y] && this.start_and_end_link(x, y, ex, ey, g)) return true
    }
    return false
  }
  add_listening_event(): void {
    this.ctx.canvas.focus()
    this.ctx.canvas.addEventListener('keydown', (e) => {
      const key = e.key
      if (key === 'w') this.snakes[0].set_next_step(SnakeDirection.up)
      else if (key === 'd') this.snakes[0].set_next_step(SnakeDirection.right)
      else if (key === 's') this.snakes[0].set_next_step(SnakeDirection.down)
      else if (key === 'a') this.snakes[0].set_next_step(SnakeDirection.left)
      else if (key === 'ArrowUp') this.snakes[1].set_next_step(SnakeDirection.up)
      else if (key === 'ArrowRight') this.snakes[1].set_next_step(SnakeDirection.right)
      else if (key === 'ArrowDown') this.snakes[1].set_next_step(SnakeDirection.down)
      else if (key === 'ArrowLeft') this.snakes[1].set_next_step(SnakeDirection.left)
    })
  }
  chect_snake_valid(): boolean {
    for (const snake of this.snakes) {
      if (snake.status !== SnakeStatus.idle) return false
      if (snake.direction === SnakeDirection.never) return false
    }
    return true
  }
  next_step(): void {
    for (const snake of this.snakes) {
      snake.next_step()
    }
  }
  start(): void {
    this.wallInit()
    this.add_listening_event()
  }
  update(): void {
    this.updata_size()
    if (this.chect_snake_valid()) {
      console.log('开始动')
      this.next_step()
    }
    this.render()
  }
  updata_size(): void {
    this.L = this.get_L()
    this.ctx.canvas.width = this.L * this.col
    this.ctx.canvas.height = this.L * this.row
  }
  get_L(): number {
    if (!this.ctx) return 0
    let res: number = Math.floor(
      Math.min(this.parent.clientWidth / this.col, this.parent.clientHeight / this.row)
    )
    return res
  }
  render(): void {
    for (let i = 1; i < this.row - 1; i++) {
      for (let j = 1; j < this.col - 1; j++) {
        if ((i + j) % 2) this.ctx.fillStyle = this.colorOdd
        else this.ctx.fillStyle = this.colorEven
        this.ctx.fillRect(j * this.L, i * this.L, this.L, this.L)
      }
    }
  }
}

export default Map
