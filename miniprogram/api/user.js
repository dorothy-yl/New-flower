import http from '../utils/http'

export const reqLogin = (code) => {
  return http.get(`/weixin/wxLogin/${code}`)
}