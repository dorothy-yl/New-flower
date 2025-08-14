import http from '../utils/http'

export const reqLogin = (code) => {
  // 优雅地指定这个接口的 base URL
  return http.get(`/weixin/wxLogin/${code}`, {}, {
    baseURL: 'http://localhost:3000'
  })
}