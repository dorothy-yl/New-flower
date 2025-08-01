//创建WXRequest的类，通过类的方法进行分装，更具有复用性；也可以方便添加新的属性和方法
class WXRequest {
  //定义实例属性，用来设置默认请求参数
  defaults = {
    baseURL: '', //请求基准地址
    url: '', //接口的请求路径
    data: null, //请求的参数
    method: 'GET', //请求的方法
    //请求头
    header: {
      'Content-type': 'application/json' //请求数据的交互格式
    },
    timeout: 60000 //小程序默认的超时时长是一分钟
  }

  //用于创建初始化和类的属性以及方法
  //用于实例化时传入的参数，会被constructor形参时进行接收
  constructor(params = {}) {
    //通过Object.assign方法合并请求参数，
    // 注意：传入的参数要覆盖默认的参数，
    // 因此传入的参数要放到最后
    this.defaults = Object.assign({}, this.defaults, params)
  }

  // request实例方法是接受一个对象类型的参数
  // 属性值和wx.request调用时传递的参数保持一致
  request(options) {
    // 需要先合并完整的请求地址（baseURL+url)
    // https://gmall-prod.atguigu.cn/mall-api'/index/findBanner
    options.url = this.defaults.baseURL + options.url

    // 合并请求参数
    options = { ...this.defaults, ...options }
    
    console.log(options)

    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }

  // 封装GET实例方法
  get(url, data = {}, config = {}) {
    // 需要调用request的方法发送请求，只需要组织好参数，发送给 request 请求方法即可
    // 当调用GET时,需要用到 request 方法的返回值 return 出去
    return this.request(Object.assign({ url, data, method: 'GET' }, config))
  }

  // 封装DELETE实例方法
  delete(url, data = {}, config = {}) {
    // 需要调用request的方法发送请求，只需要组织好参数，发送给 request 请求方法即可
    // 当调用DELETE时,需要用到 request 方法的返回值 return 出去
    return this.request(Object.assign({ url, data, method: 'DELETE' }, config))
  }

  // 封装POST实例方法
  post(url, data = {}, config = {}) {
    // 需要调用request的方法发送请求，只需要组织好参数，发送给 request 请求方法即可
    // 当调用POST时,需要用到 request 方法的返回值 return 出去
    return this.request(Object.assign({ url, data, method: 'POST' }, config))
  }

  // 封装PUT实例方法
  put(url, data = {}, config = {}) {
    // 需要调用request的方法发送请求，只需要组织好参数，发送给 request 请求方法即可
    // 当调用PUT时,需要用到 request 方法的返回值 return 出去
    return this.request(Object.assign({ url, data, method: 'PUT' }, config))
  }
}

//以下是实例化代码，目前写道同一个文件，为了方便进行测试，以后会提取多个文件
const instance = new WXRequest({
  baseURL: 'https://gmall-prod.atguigu.cn/mall-api',
  timeout: 15000
})

export default instance