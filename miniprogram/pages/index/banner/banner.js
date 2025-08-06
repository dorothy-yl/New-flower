// pages/index/banner/banner.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 轮播图数据
    bannerList: {
      type: Array,
      value: [
        '/assets/banner/banner-1.jpg',
        '/assets/banner/banner-2.jpg',
        '/assets/banner/banner-3.jpg'
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getSwiprIndex(event) {
      const { current } = event.detail
      this.setData({
        activeIndex: current
      })
    }
  },

  /**
   * 监听属性变化
   */
  observers: {
    'bannerList': function(newBannerList) {
      // 当bannerList变化时，确保activeIndex不超出范围
      if (Array.isArray(newBannerList) && newBannerList.length > 0) {
        const maxIndex = newBannerList.length - 1
        if (this.data.activeIndex > maxIndex) {
          this.setData({
            activeIndex: 0
          })
        }
      } else {
        // 如果bannerList为空，重置activeIndex
        this.setData({
          activeIndex: 0
        })
      }
    }
  }
})
