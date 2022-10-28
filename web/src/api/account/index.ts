import axiosImpl from '../../utils/request'

type token = {
  error_message: string
  token: string
}
type userInfo = {
  username: string
  nickname: string
  photo: string
}

export const getToken = async (username: string, password: string): Promise<token> => {
  return await axiosImpl.post('/user/account/token/', {
    username,
    password,
  })
}

export const getInfo = (token: string): Promise<userInfo> => {
  return axiosImpl.get('/user/account/info/', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
}

export const register = (
  username: string,
  password: string,
  confirmedPassword: string,
  nickname: string
) => {
  return axiosImpl.post('/user/account/register/', {
    username,
    password,
    confirmedPassword,
    nickname,
  })
}
