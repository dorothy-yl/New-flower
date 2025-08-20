// pages/cart/component/cart.js
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { userStore } from '../../stores/userStore'
import { reqCartList } from '../../api/cart'

ComponentWithStore({
  // 让页面和Store对象进行关联
  storeBindings: {
    store: userStore,
    fields: ['token'],
  },

  // 组件的初始数据
  data: {
    cartList: [1, 2, 3, 4],
    emptyDes: '还没有添加商品，快去添加吧～'
  },

  // 组件的方法列表
  methods: {
    async showTipGoLogin() {
      const { token } = this.data

      if (!token) {
        this.setData({
          emptyDes: '您尚未登录，点击登录获取更多利益',
          cartList: []
        })
        return
      }

      const res = await reqCartList()
      console.log(res)
    },

    onShow() {
      this.showTipGoLogin()
    }
  }
})
