// 导入封装的网络请求模块实例
import http from '../utils/http'

export const reqIndexData = () => {
  // 提供默认数据，确保页面能正常显示
  const defaultData = [
    {
      data: [
        '/assets/banner/banner-1.jpg',
        '/assets/banner/banner-2.jpg',
        '/assets/banner/banner-3.jpg'
      ]
    },
    {
      data: [
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
      ]
    },
    {
      data: [
        { id: 1, image: '/assets/images/love.jpg' },
        { id: 2, image: '/assets/images/elder.jpg' },
        { id: 3, image: '/assets/images/friend.jpg' }
      ]
    },
    {
      data: [
        { id: 1, name: '真情告白', price: 99, image: '/assets/images/cate-1.png' },
        { id: 2, name: '浪漫求婚', price: 199, image: '/assets/images/cate-1.png' },
        { id: 3, name: '生日祝福', price: 159, image: '/assets/images/cate-1.png' }
      ]
    },
    {
      data: [
        { id: 4, name: '节日礼物', price: 129, image: '/assets/images/cate-1.png' },
        { id: 5, name: '商务花篮', price: 299, image: '/assets/images/cate-1.png' },
        { id: 6, name: '开业庆典', price: 399, image: '/assets/images/cate-1.png' }
      ]
    }
  ]

  // 尝试调用API，如果失败则返回默认数据
  return http.all([
    http.get('/index/findBanner'),
    http.get('/index/findCategory1'),
    http.get('/index/advertisement'),
    http.get('/index/findListGoods'),
    http.get('/index/findRecommendGoods')
  ]).catch(error => {
    console.log('API调用失败，使用默认数据:', error)
    return defaultData
  })
}