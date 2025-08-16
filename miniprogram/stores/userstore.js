// observable用于创建一个被监测的对象，对象的属性是应用对的状态，状态会被自动
import { observable, action } from 'mobx-miniprogram'
import { getStorage, setStorage } from '../utils/storage'

export const userStore = observable({
  token: getStorage('token') || '',
  userInfo: getStorage('userInfo') || {},

  // 定义action
  // setToken用来修改，更新token
  setToken: action(function (token) {
    this.token = token
  }),

  // 用户信息进行赋值
  setUserInfo: action(function (userInfo) {
    this.userInfo = userInfo
  })
})

