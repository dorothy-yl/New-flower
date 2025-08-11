Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeIndex: {
      type: Number,
      value: 0
    },
    // 分类列表
    cateList: {
      type: Array,
      value: [
        { id: 1, name: '鲜花玫瑰', icon: '/assets/images/cate/cate-1.png' },
        { id: 2, name: '永生玫瑰', icon: '/assets/images/cate/cate-2.png' },
        { id: 3, name: '玫瑰珠宝', icon: '/assets/images/cate/cate-3.png' },
        { id: 4, name: '礼品花束', icon: '/assets/images/cate/cate-4.png' },
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

