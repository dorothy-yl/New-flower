// components/goods-card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 每一项商品的数据
    goods: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 商品点击事件
    onGoodsClick() {
      const goods = this.data.goods
      if (goods && goods.id) {
        wx.navigateTo({
          url: `/pages/goods/detail/detail?id=${goods.id}`
        })
      }
    }
  }
})
