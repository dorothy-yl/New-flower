// components/goods-card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 每一项商品的数据
    goodItem: {
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
    // 点击商品跳转到详情页
    onGoodsClick() {
      const { goodItem } = this.properties
      if (goodItem && goodItem.id) {
        wx.navigateTo({
          url: `/pages/goods/detail/detail?goodsId=${goodItem.id}`
        })
      }
    }
  }
})
