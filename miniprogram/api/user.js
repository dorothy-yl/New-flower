import http from '../utils/http'

export const reqLogin = (code) => {
  // 优雅地指定这个接口的 base URL
  return http.get(`/weixin/wxLogin/${code}`, {}, {
    baseURL: 'http://localhost:3000'
  })
}

// 封装接口API函数
export const reqUserInfo = () => {
  return http.get('/weixin/getuserInfo', {}, {
    baseURL: 'http://localhost:3000'
  })
}


export const reqUploadFile = (filePath) => {
  return http.upload('/weixin/uploadFile', {
    filePath
  }, {
    baseURL: 'http://localhost:3000'
  })
}


export const reqUpdateUserInfo = (userInfo) => {
  return http.post('/api/upload/single', userInfo, {
    baseURL: 'http://localhost:3000'
  })
}
