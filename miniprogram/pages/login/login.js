// pages/login/login.js

import { toast } from '../../utils/extendApi'
import { setStorage } from '../../utils/storage'
import { reqLogin, reqUserInfo } from '../../api/user'
import { userStore } from '../../stores/userstore'

// 导入ComponentWithStore方法
import { ComponentWithStore } from 'mobx-miniprogram-bindings'

ComponentWithStore({
  // 让页面的数据和store中的数据绑定
  storeBindings: {
    store: userStore,
    fields: ['token', 'userInfo'],
    actions: ['setToken', 'setUserInfo']
  },
  methods: {
    // 授权登录
    login() {
      wx.login({
        success: async ({ code }) => {
          if (code) {

            const { data } = await reqLogin(code)
            setStorage('token', data.token)
            this.setToken(data.token)


            // 获取用户信息
            this.getUserInfo()
          } else {
            toast({ title: '授权失败，请重新登录' })
          }
        }
      })
    },

// 获取用户信息
    async getUserInfo() {
      // 调用接口，获取用户信息
      const { data } = await reqUserInfo()
      // 将用户信息存储到本地
      setStorage('userInfo', data)
      // 将用户信息存储到store中
      this.setUserInfo(data)
    }
  }
})
