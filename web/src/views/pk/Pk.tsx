import { Root, PlayGround } from './Pk.styles'
import { useCallback, useEffect, useRef, useState } from 'react'
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
  }, [])
  const login = useCallback(async () => {
    let data = await axiox.post('/api/user/account/token/', {
      username: 'donghao',
      password: '123456',
    })
    setToken(data.data.token)
  }, [])
  useEffect(() => {
    login()
  }, [login])
  useEffect(() => {
    if (!token) return
    const info = () => {
      axiox
        .get('/api/user/account/info/', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          console.log(res.data)
        })
    }
    info()
  }, [token])

  return (
    <Root>
      <PlayGround ref={playground}>
        <canvas ref={canvas} tabIndex={0}></canvas>
      </PlayGround>
    </Root>
  )
}

export default Pk
