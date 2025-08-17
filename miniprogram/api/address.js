import request from '../utils/http'

export const reqAddress = (data) => {
  return http.post('/userAddress/save', data)
}

  export const reqAddressList = (id) => {
  return http.get('/userAddress/findUserAddress')
}


    export const reqAddressInfo = (id) => {
      return http.get('/userAddress/${id}')
}


      export const reqUpdateAddress = (data) => {
        return http.post('/userAddress/update', data)
}

export const reqDeleteAddress = (id) => {
  return http.get('/userAddress/delete/${id}')
}