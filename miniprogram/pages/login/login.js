// pages/login/login.js

import { toast } from '../../utils/extendApi'
import { setStorage } from '../../utils/storage'
import { reqLogin } from '../../api/user'

Page({
  // 授权登录
  login() {
    wx.login({
      success: async ({ code }) => {
        if (code) {
          try {
            const { data } = await reqLogin(code)
            setStorage('token', data.token)
            setStorage('userInfo', data.userInfo)
            wx.switchTab({
              url: '/pages/index/index'
            })
          } catch (err) {
            // console.error('登录失败:', err)
            wx.showToast({
              title: '登录失败，请重试',
              icon: 'error'
            })
          }
        } else {
          toast({ title: '授权失败，请重新登录' })
        }
      }
    })
  }
})
