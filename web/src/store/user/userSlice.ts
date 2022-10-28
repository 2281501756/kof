import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import store from '..'
import { login, info } from './userAsyncThunk'

export interface UserState {
  isLogin: boolean
  username: string
  nickname: string
  photo: string
  token: string
}

const userStateInit: UserState = {
  isLogin: false,
  username: '未登录',
  nickname: '',
  photo: '',
  token: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: userStateInit,
  reducers: {
    userSetToekn: (state, actions: PayloadAction<{ token: string }>) => {
      state.isLogin = true
      state.token = actions.payload.token
      localStorage.setItem('token', actions.payload.token)
    },
    userSetInfo: (
      state,
      actions: PayloadAction<{ username: string; nickname: string; photo: string }>
    ) => {
      state.username = actions.payload.username
      state.nickname = actions.payload.nickname
      state.photo = actions.payload.photo
    },
  },
  extraReducers: (build) => {
    build.addCase(info.fulfilled, (state, actions) => {
      const { photo, username, nickname } = actions.payload
      state.photo = photo
      state.username = username
      state.nickname = nickname
    })
  },
})

export const { userSetToekn, userSetInfo } = userSlice.actions
export default userSlice.reducer
