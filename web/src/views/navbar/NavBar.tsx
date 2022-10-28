import { Navbar } from './NavBar.styles'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'

const NavBar = () => {
  const user = useAppSelector((store) => store.user)
  return (
    <Navbar>
      <div className="left">
        <Link className="link" to={'/pk'}>
          pk
        </Link>
        <Link className="link" to={'/top/list'}>
          topList
        </Link>
      </div>
      <div className="right">
        {!user.isLogin ? (
          <>
            <Link className="link" to={'/login'}>
              登录
            </Link>
            <Link className="link" to={'/register'}>
              注册
            </Link>
          </>
        ) : (
          <Link className="link" to={'/my/bot'}>
            {user.nickname}
          </Link>
        )}
      </div>
    </Navbar>
  )
}

export default NavBar
