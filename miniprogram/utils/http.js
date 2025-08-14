import request from './request'

// 直接使用request.js中导出的实例，不需要重新创建
const http = request

// 请求拦截器 - 添加token
http.interceptors.request = (config) => {
  const token = wx.getStorageSync('token')
  if (token) {
    config.header = config.header || {}
    config.header['token'] = token
  }
  return config
}

// 响应拦截器 - 处理响应数据
http.interceptors.response = (response) => {
  // 如果请求失败，返回错误信息
  if (!response.isSuccess) {
    return Promise.reject(response)
  }
  return response
}

export default http