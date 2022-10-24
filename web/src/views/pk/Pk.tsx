import { Root, PlayGround } from './Pk.styles'
import { useEffect, useRef, useState } from 'react'
import Map from '../../game/Map'
import { CLEAR_GAMERANDER_LIST } from '../../game/GameBase'
import axiox from 'axios'

const Pk = () => {
  const playground = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [token, setToken] = useState('')
  useEffect(() => {
    if (playground.current && canvas.current) {
      new Map(canvas.current.getContext('2d') as CanvasRenderingContext2D, playground.current)
    }
    return () => {
      CLEAR_GAMERANDER_LIST()
    }
  })

  useEffect(() => {
    axiox({
      url: '/api/user/account/token/',
      method: 'post',
      data: {
        username: 'donghao',
        password: '123456',
      },
    }).then((res) => {
      console.log(res.data)
      setToken(res.data.token)
    })
    axiox({
      url: '/api/user/info/',
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => {
      console.log(res)
    })
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
