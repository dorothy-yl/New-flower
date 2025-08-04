import instance from '../../utils/http'

Page({
  async handler() {
    //第一种方法，通过.then的方法进行调试
    // instance.request({
    //   url:'https://gmall-prod.atguigu.cn/mall-api/index/findBanner',
    //   method:'GET'
    // })
    // .then((res) => {
    //   console.log(res)
    // })

    //第二种方法通过await和async
    try {
      const res = await instance.get('/index/findBanner')
      // console.log(res)
    } catch (error) {
      // console.error('请求失败:', error)
    }
  },

  handler1() {
    wx.request({
      url: 'https://gmall-prod.atguigu.cn/mall-api/index/findBanner',
      method: 'GET',
      success: (res) => {
        // console.log(res)
      },
      fail: (err) => {
        // console.log(err)
      }
    })
  },

  // 测试并发请求
  async allHandler() {
    // 演示通过async和await方式同时发起多个请求,在前一个请求结束后，才能够发下下一个请求，会造成堵塞，从而影响页面的渲染速度
    try {
      const res1 = await instance.get('/index/findBanner')
      const res2 = await instance.get('/index/findCategory1')
      const res3 = await instance.get('/index/findBanner')
      const res4 = await instance.get('/index/findCategory1')
      
      // console.log('并发请求结果:', { res1, res2, res3, res4 })
    } catch (error) {
      // console.error('并发请求失败:', error)
    }
  },

  // 真正的并发请求 - 使用Promise.all
  async concurrentHandler() {
    try {
      const results = await Promise.all([
        instance.get('/index/findBanner'),
        instance.get('/index/findCategory1'),
        instance.get('/index/findBanner'),
        instance.get('/index/findCategory1')
      ])
      
      // console.log('真正的并发请求结果:', results)
      return results
    } catch (error) {
      // console.error('并发请求失败:', error)
    }
  }
})