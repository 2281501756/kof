import { login } from '../../store/user/userAsyncThunk'
import { useAppDispatch } from '../../hooks/redux'
import { LoginWrapper } from './Login.styles'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [form, setform] = useState({
    account: '',
    password: '',
  })
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target
    if (name === 'account') {
      setform({ ...form, account: value })
    } else {
      setform({ ...form, password: value })
    }
  }
  const handleLogin = () => {
    dispatch(login({ username: form.account, password: form.password }))
    navigate('/pk')
  }
  return (
    <LoginWrapper>
      <div>
        <h1>登录</h1>
        <div className="item">
          <span>账号：</span>
          <input type="text" onChange={handleChange} name="account" />
        </div>
        <div className="item">
          <span>密码：</span>
          <input type="password" onChange={handleChange} name="password" />
        </div>
        <div className="item">
          <button onClick={handleLogin}>登录</button>
        </div>
      </div>
    </LoginWrapper>
  )
}

export default Login
