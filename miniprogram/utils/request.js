//创建WXRequest的类，通过类的方法进行分装，更具有复用性；也可以方便添加新的属性和方法
class WXRequest {
  //定义实例属性，用来设置默认请求参数
  defaults = {
    baseURL: 'http://localhost:3000', //请求基准地址
    url: '', //接口的请求路径
    data: null, //请求的参数
    method: 'GET', //请求的方法
    //请求头
    header: {
      'Content-type': 'application/json' //请求数据的交互格式
    },
    timeout: 60000 //小程序默认的超时时长是一分钟
  }

  // 定义拦截器对象，需要包含请求拦截器和响应拦截器，方便在请求之前以及响应拦截器进行逻辑处理
  interceptors = {
    // 请求拦截器
    // 对请求内容进行新增和修改
    request: (config) => config,

    // 响应拦截器
    // 在服务器响应数据以后，对服务器响应的数据进行逻辑处理
    response: (response) => response
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
    // console.log(options)

    // 在请求发送之前，请求和调用拦截器，新增和修改请求参数
    options = this.interceptors.request(options)

    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        // 当接口调用成功时会触发success回调函数
        success: (res) => {
          // 不管成功响应还是失败响应，都需要调用响应拦截器；响应拦截器需要接受服务器响应的数据，处理好之后进行返回，通过resolve将返回来的数据抛出去

          // 在响应拦截器传递参数时，需要将请求的参数也一起传递;方便进行代码的调试和逻辑的处理，需要先合并参数，再将合并的参数传递给拦截器
          const mergeRes = Object.assign({}, res.data, { config: options, isSuccess: true })
          resolve(this.interceptors.response(mergeRes))
        },

        fail: (err) => {
          // 不管成功响应还是失败响应，都需要调用响应拦截器；
          const mergeErr = Object.assign({}, err, { config: options, isSuccess: false })
          reject(this.interceptors.response(mergeErr))
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

  // 封装并发请求方法
  all(requests) {
    // 使用Promise.all进行并发请求
    return Promise.all(requests)
  }
}

//以下是实例化代码，目前写道同一个文件，为了方便进行测试，以后会提取多个文件
const instance = new WXRequest({
  baseURL: 'https://gmall-prod.atguigu.cn/mall-api',
  timeout: 15000
})

// 配置请求拦截器
instance.interceptors.request = (config) => {
  // 在请求之前做点什么...
  return config
}

// 配置响应拦截器
instance.interceptors.response = (response) => {
  // console.log('响应拦截器:', response)
  
  // 直接返回响应数据，不做额外处理
  return response
}

export default instance