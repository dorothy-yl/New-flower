import { observable, action } from 'mobx-miniprogram'
import { getStorage } from '../utils/storage'

export const userStore = observable({
  token: getStorage('token') || '',

  // 定义action
  // setToken用来修改，更新token
  setToken: action(function(token) {
    this.token = token
  getStorage('token', token)
  })
})

