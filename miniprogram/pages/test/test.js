import instance from '../../utils/request'

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

//     //第二种方法通过await和async
//     try {
//       const res = await instance.get('/index/findBanner')
//       console.log(res)
//     } catch (error) {
//       console.error('请求失败:', error)
//     }
//   }
// })

const res = await instance.get('/index/findBanner',{test:111},{timeout:20000})

console.log(res)
}
})


