import { RegisterWrapper } from './Register.styles'
import { useState } from 'react'
import { register } from '../../api/account'

const Register = () => {
  const [form, setform] = useState({
    account: '',
    password: '',
    confirmedPassword: '',
    nickname: '',
  })
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target
    if (name === 'account') {
      setform({ ...form, account: value })
    } else if (name === 'password') {
      setform({ ...form, password: value })
    } else if (name === 'confirmedPassword') {
      setform({ ...form, confirmedPassword: value })
    } else {
      setform({ ...form, nickname: value })
    }
  }
  const handleRegister = async () => {
    const res = await register(form.account, form.password, form.confirmedPassword, form.nickname)
    console.log(res)
  }
  return (
    <RegisterWrapper>
      <div>
        <h1>注册</h1>
        <div className="item">
          <span>账号：</span>
          <input type="text" onChange={handleChange} name="account" />
        </div>
        <div className="item">
          <span>密码：</span>
          <input type="password" onChange={handleChange} name="password" />
        </div>
        <div className="item">
          <span>确认密码：</span>
          <input type="password" onChange={handleChange} name="confirmedPassword" />
        </div>
        <div className="item">
          <span>昵称：</span>
          <input type="text" onChange={handleChange} name="nickname" />
        </div>
        <div className="item">
          <button onClick={handleRegister}>注册</button>
        </div>
      </div>
    </RegisterWrapper>
  )
}

export default Register
