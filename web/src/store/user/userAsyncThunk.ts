import { createAsyncThunk } from '@reduxjs/toolkit'
import { getInfo, getToken } from '../../api/account'
import { userSetToekn, userSetInfo } from './userSlice'

export const login = createAsyncThunk(
  'user/login',
  async (data: { username: string; password: string }, thunkAPI) => {
    let { token } = await getToken(data.username, data.password)
    thunkAPI.dispatch(userSetToekn({ token }))
    thunkAPI.dispatch(info({ token }))
  }
)

export const info = createAsyncThunk('user/info', async (data: { token: string }, thunkAPI) => {
  return await getInfo(data.token)
})
