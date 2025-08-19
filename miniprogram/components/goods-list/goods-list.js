// components/goods-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 列表标题
    title: {
      type: String,
      value: ''
    },

    // 传递的列表数据
    list: {
      type: Array,
      value: [
        { id: 1, name: '亲爱的/情人节网红款/19枝', price: 399, marketPrice: 599, image: '/assets/images/floor.jpg' },
        { id: 2, name: '永生玫瑰礼盒', price: 299, marketPrice: 399, image: '/assets/images/floor.jpg' },
        { id: 3, name: '浪漫花束', price: 199, marketPrice: 299, image: '/assets/images/floor.jpg' }
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {}
})
