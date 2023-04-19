import axios from "axios"
import { message } from 'antd'
import { getToken } from '../utils/token'
import { Navigate } from "react-router-dom"

const heimaAxios = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 2000,
})

heimaAxios.interceptors.request.use(function (config) {
  const token = getToken()
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
    console.log('Token:', token)
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

heimaAxios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  switch (error.code) {
    case 401:
      <Navigate to='/login' replace={false} />
      message.error('未授权！请重新登录')
    case 500:
      message.error('服务器内部错误，请稍候重试')
      break
    default:
      break
  }
  Promise.reject(error)
})

export default heimaAxios

