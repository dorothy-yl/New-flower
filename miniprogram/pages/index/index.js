import { reqIndexData } from '../../api/index'

Page({
  // 初始化数据
  data: {
    bannerList: [],
    categoryList: [],
    activeList: [],
    hotList: [],
    guessList: []
  },

  // 获取首页数据
  async getIndexData() {
    try {
      const res = await reqIndexData()
      
      this.setData({
        bannerList: res[0].data,
        categoryList: res[1].data,
        activeList: res[2].data,
        hotList: res[3].data,
        guessList: res[4].data
      })
      
      // console.log('首页数据:', res)
    } catch (error) {
      // console.error('获取首页数据失败:', error)
    }
  },

  // 监听页面加载
  onLoad() {
    this.getIndexData()
  }
})
