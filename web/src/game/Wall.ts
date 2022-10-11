import GameBase from './GameBase'
import Map from './Map'

class Wall extends GameBase {
  public color: string
  constructor(public row: number, public col: number, public map: Map) {
    super()
    this.color = '#b47225'
  }
  update(): void {
    this.rander()
  }
  rander(): void {
    const ctx = this.map.ctx
    const L = this.map.L
    ctx.fillStyle = this.color
    ctx.fillRect(this.col * L, this.row * L, L, L)
  }
}

export default Wall
