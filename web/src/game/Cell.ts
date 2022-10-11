import Map from './Map'

class Cell {
  public x: number
  public y: number
  constructor(public row: number, public col: number, map: Map) {
    this.x = this.col + 0.5
    this.y = this.row + 0.5
  }
}

export default Cell
