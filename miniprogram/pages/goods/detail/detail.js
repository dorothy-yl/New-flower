// pages/goods/detail/index.js
import { reqAddCart } from '../../../api/cart'
import { userBehavior } from '../../../assets/behaviors/userBehavior'
import { reqGoodsInfo } from '../../../api/goods'

Page({
  behaviors: [userBehavior],

  // 页面的初始数据
  data: {
    goodsInfo: {}, // 商品详情
    show: false, // 控制加入购物车和立即购买弹框的显示
    count: 1, // 商品购买数量，默认是 1
    blessing: '', // 祝福语
    buyNow: 0 // 0 立即购买 1 加入购物车
  },

  // 加入购物车
  handleAddcart() {
    this.setData({
      show: true,
      buyNow: 0
    })
  },

  // 立即购买
  handeGotoBuy() {
    this.setData({
      show: true,
      buyNow: 1
    })
  },

  // 点击关闭弹框时触发的回调
  onClose() {
    this.setData({ show: false })
  },

  // 页面加载时获取商品详情
  onLoad(options) {
    console.log('页面参数:', options)
    // 从页面参数中获取商品ID
    const { goodsId } = options
    if (goodsId) {
      this.setData({
        goodsInfo: { goodsId }
      })
      console.log('设置商品信息:', this.data.goodsInfo)
    } else {
      console.log('未获取到商品ID')
    }
  },

  // 监听是否更改了购买数量
  onChangeGoodsCount(event) {
    this.setData({
      count: Number(event.detail)
    })
  },

  // 弹窗的确定按钮触发的事件处理函数
  async handleSubmit() {
    // 解构相关的数据
    const { token, count,blessing, buyNow } = this.data
    // 获取商品的ID
    const  goodsId = this.goodsId

    if (!goodsId) {
      wx.showToast({
        title: '商品信息获取失败',
        icon: 'none'
      })
      return
    }

    // 判断用户是否登录
      // const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return
    }
// 区分立即购买和加入购物车
    if (buyNow === 0) {
      // 加入购物车
      const res = await reqAddCart({goodsId, count, blessing})


  if(res.code === 200){
     wx.toast({title: '加入购物车成功'})

     this.setData({
      show: false
    })
  }
  }else{
    wx.navigateTo({
      url: `pages/order/detail/detail?goodsId=${goodsId}&count=${count}&blessing=${blessing}`
    })
  }
}
})
