// pages/goods/list/index.js
import { getGoodsList } from '../../../api/index'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [], // 商品列表数据
    isFinish: false, // 判断数据是否加载完毕
    category2Id: null, // 二级分类ID
    page: 1, // 当前页码
    pageSize: 10 // 每页数量
  },

  // 获取商品列表
  async getGoodsList() {
    try {
      const params = {
        page: this.data.page,
        pageSize: this.data.pageSize
      }

      // 如果有分类ID，添加到参数中
      if (this.data.category2Id) {
        params.category2Id = this.data.category2Id
      }

      const res = await getGoodsList(params)
      console.log('商品列表数据:', res)

      if (res.code === 200) {
        const newGoodsList = this.data.page === 1 ? res.data.list : [...this.data.goodsList, ...res.data.list]

        this.setData({
          goodsList: newGoodsList,
          isFinish: res.data.list.length < this.data.pageSize
        })
      }
    } catch (error) {
      console.error('获取商品列表失败:', error)
    }
  },

  // 加载更多
  onLoadMore() {
    if (this.data.isFinish) return

    this.setData({
      page: this.data.page + 1
    }, () => {
      this.getGoodsList()
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      page: 1,
      goodsList: []
    }, () => {
      this.getGoodsList()
      wx.stopPullDownRefresh()
    })
  },

  // 上拉触底
  onReachBottom() {
    this.onLoadMore()
  },

  // 商品点击事件
  onGoodsClick(e) {
    const goodsId = e.currentTarget.dataset.goodsId
    if (goodsId) {
      wx.navigateTo({
        url: `/pages/goods/detail/detail?id=${goodsId}`
      })
    }
  },

  // 返回上一页
  gotoBack() {
    wx.navigateBack()
  },

  onLoad(options) {
    console.log('商品列表页面参数:', options)

    // 接收分类ID参数
    if (options.category2Id) {
      this.setData({
        category2Id: options.category2Id
      })
    }

    // 获取商品列表
    this.getGoodsList()
  }
})
