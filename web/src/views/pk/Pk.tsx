import { Root, PlayGround } from './Pk.styles'
import { useEffect, useRef } from 'react'
import Map from '../../game/Map'

const Pk = () => {
  const playground = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (playground.current && canvas.current) {
      new Map(canvas.current.getContext('2d'), playground.current)
    }
  })
  
  return (
    <Root>
      <PlayGround ref={playground}>
        <canvas ref={canvas}></canvas>
      </PlayGround>
    </Root>
  )
}

export default Pk
