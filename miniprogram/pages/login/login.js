// pages/login/login.js

import { toast } from '../../utils/extendApi'
import { setStorage } from '../../utils/storage'
import { reqLogin } from '../../api/user'
import { userStore } from '../../stores/userstore'

// 导入ComponentWithStore方法
import { ComponentWithStore } from 'mobx-miniprogram-bindings'

ComponentWithStore({
  // 让页面的数据和store中的数据绑定
  storeBindings: {
    store: userStore,
    fields: ['token'],
    actions: ['setToken']
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
          } else {
            toast({ title: '授权失败，请重新登录' })
          }
        }
      })
    },
  }
})
