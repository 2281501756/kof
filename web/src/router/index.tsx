import { Routes, Route } from 'react-router-dom'
import Pk from '../views/pk/Pk'
import TopList from '../views/toplist/TopList'
import MyBot from '../views/mybot/MyBot'
import Home from '../views/home/Home'
import Login from '../views/account/Login'
import Register from '../views/account/Register'

const RouterConfig = () => {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Home></Home>}></Route>
        <Route path="/pk" element={<Pk></Pk>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/top/list" element={<TopList></TopList>}></Route>
        <Route path="/my/bot" element={<MyBot></MyBot>}></Route>
      </Routes>
    </>
  )
}

export default RouterConfig
