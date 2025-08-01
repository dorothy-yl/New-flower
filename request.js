class Request {
  // 封装GET实例方法
  get(url, data = {}, config = {}) {
    // 需要调用request的方法发送请求，只需要组织好参数，发送给 request 请求方法即可
    // 当调用GET时,需要用到 request 方法的返回值 return 出去
    return this.request(Object.assign({ url, data, method: 'GET' }, config));
  }

  // 封装DELETE实例方法
  delete(url, data = {}, config = {}) {
    // 需要调用request的方法发送请求，只需要组织好参数，发送给 request 请求方法即可
    // 当调用DELETE时,需要用到 request 方法的返回值 return 出去
    return this.request(Object.assign({ url, data, method: 'DELETE' }, config));
  }

  // 封装POST实例方法
  post(url, data = {}, config = {}) {
    // 需要调用request的方法发送请求，只需要组织好参数，发送给 request 请求方法即可
    // 当调用POST时,需要用到 request 方法的返回值 return 出去
    return this.request(Object.assign({ url, data, method: 'POST' }, config));
  }

  // 封装PUT实例方法
  put(url, data = {}, config = {}) {
    // 需要调用request的方法发送请求，只需要组织好参数，发送给 request 请求方法即可
    // 当调用PUT时,需要用到 request 方法的返回值 return 出去
    return this.request(Object.assign({ url, data, method: 'PUT' }, config));
  }

  // 核心请求方法
  request(config) {
    // 这里实现具体的请求逻辑
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.url,
        method: config.method,
        data: config.data,
        header: config.header || {},
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  }
}

// 导出实例
module.exports = new Request(); 