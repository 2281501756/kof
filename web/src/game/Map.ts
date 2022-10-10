import GameBase from './GameBase'

class Map extends GameBase {
  public row: number
  public col: number
  public L: number
  constructor(public ctx: CanvasRenderingContext2D | null, public parent: HTMLElement) {
    super()
    this.row = 13
    this.col = 13
    this.L = this.get_L()
  }
  start(): void {}
  update(): void {
    this.updata_size()
    this.render()
  }
  updata_size(): void {
    if (!this.ctx) return
    this.L = this.get_L()
    this.ctx.canvas.width = this.L * this.col
    this.ctx.canvas.height = this.L * this.row
  }
  get_L(): number {
    if (!this.ctx) return 0
    let res: number = Math.min(
      this.parent.clientWidth / this.col,
      this.parent.clientHeight / this.row
    )
    return res
  }

  render(): void {
    this.ctx?.fillRect(0, 0, this.L * this.col, this.L * this.row)
  }
}

export default Map
