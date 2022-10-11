import { Root, PlayGround } from './Pk.styles'
import { useEffect, useRef } from 'react'
import Map from '../../game/Map'
import { CLEAR_GAMERANDER_LIST } from '../../game/GameBase'

const Pk = () => {
  const playground = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (playground.current && canvas.current) {
      new Map(canvas.current.getContext('2d') as CanvasRenderingContext2D, playground.current)
    }
    return () => {
      CLEAR_GAMERANDER_LIST()
    }
  })

  return (
    <Root>
      <PlayGround ref={playground}>
        <canvas ref={canvas} tabIndex={0}></canvas>
      </PlayGround>
    </Root>
  )
}

export default Pk
