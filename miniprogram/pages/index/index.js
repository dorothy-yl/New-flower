import { reqIndexData } from '../../api/index'

Page({
  // 初始化数据
  data: {
    bannerList: [
      '/assets/banner/banner-1.jpg',
      '/assets/banner/banner-2.jpg',
      '/assets/banner/banner-3.jpg'
    ],
    categoryList: [
      { id: 1, name: '鲜花玫瑰', icon: '/assets/images/cate-1.png' },
      { id: 2, name: '永生玫瑰', icon: '/assets/images/cate-1.png' },
      { id: 3, name: '玫瑰珠宝', icon: '/assets/images/cate-1.png' },
      { id: 4, name: '礼品花束', icon: '/assets/images/cate-1.png' },
      { id: 5, name: '节日鲜花', icon: '/assets/images/cate-1.png' },
      { id: 6, name: '商务花篮', icon: '/assets/images/cate-1.png' },
      { id: 7, name: '开业庆典', icon: '/assets/images/cate-1.png' },
      { id: 8, name: '生日祝福', icon: '/assets/images/cate-1.png' },
      { id: 9, name: '求婚花束', icon: '/assets/images/cate-1.png' },
      { id: 10, name: '道歉花束', icon: '/assets/images/cate-1.png' }
    ],
    activeList: [],
    hotList: [],
    guessList: []
  },

  // 获取首页数据
  async getIndexData() {
    try {
      const res = await reqIndexData()

      // 数据验证和格式化
      const bannerData = res[0]?.data || []
      const categoryData = res[1]?.data || []
      const activeData = res[2]?.data || []
      const guessData = res[3]?.data || []
      const hotData = res[4]?.data || []

      

      this.setData({
        bannerList: Array.isArray(validBannerList) ? validBannerList : [],
        categoryList: Array.isArray(validCategoryList) ? validCategoryList : [],
        activeList: Array.isArray(activeData) ? activeData : [],
        guessList: Array.isArray(guessData) ? guessData : [],
        hotList: Array.isArray(hotData) ? hotData : []
      })

      console.log('首页数据加载成功')
    } catch (error) {
      console.error('获取首页数据失败:', error)
      // 保持默认数据不变
    }
  },

  // 监听页面加载
  onLoad() {
    this.getIndexData()
  }
})
