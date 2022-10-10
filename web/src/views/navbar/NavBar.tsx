import { Navbar } from './NavBar.styles'
import { Link } from 'react-router-dom'

const NavBar = () => {
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
        <Link className="link" to={'/my/bot'}>
          my bot
        </Link>
      </div>
    </Navbar>
  )
}

export default NavBar
