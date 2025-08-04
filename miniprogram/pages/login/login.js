// pages/login/login.js
import { reqLogin } from '../../api/user'

Page({
  login() {
    wx.login({
      success: ({ code }) => {
        if (code) {
          reqLogin(code).then(res => {
            // console.log(res)
          }).catch(err => {
            // console.error('登录失败:', err)
            wx.showToast({
              title: '登录失败，请重试',
              icon: 'error'
            })
          })
        } else {
          wx.showToast({
            title: '授权失败，请重新登录',
            icon: 'error'
          })
        }
      }
    })
  }
})
