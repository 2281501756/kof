const GAME_RANDER_LIST: GameBase[] = []

class GameBase {
  public hasInit: boolean
  public time: number
  constructor() {
    GAME_RANDER_LIST.push(this)
    this.hasInit = false
    this.time = 0.007
  }

  start() {}
  update() {}
  ondestroy() {}
  destroy() {
    this.ondestroy()
    console.log()
    for (let i = 0; i < GAME_RANDER_LIST.length; i++) {
      if (GAME_RANDER_LIST[i] === this) {
        GAME_RANDER_LIST.splice(i, 1)
        break
      }
    }
  }
}

let lastTimestamp: number = 0
const rander = (timestamp: number) => {
  for (let i of GAME_RANDER_LIST) {
    if (!i.hasInit) {
      i.hasInit = true
      i.start()
    } else {
      i.update()
      i.time = timestamp - lastTimestamp
    }
  }
  lastTimestamp = timestamp
  requestAnimationFrame(rander)
}

requestAnimationFrame(rander)

export const CLEAR_GAMERANDER_LIST = () => {
  while (GAME_RANDER_LIST.length) GAME_RANDER_LIST.pop()
}

export default GameBase
