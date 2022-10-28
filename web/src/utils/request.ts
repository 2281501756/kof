import axios from 'axios'

const axiosImpl = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

axiosImpl.interceptors.response.use((res) => {
  return res.data
})

export default axiosImpl
