// 导入封装的请求模块实例
import http from '../utils/http'

/*
*@description获取商品分类的数据
*@returns Promise

*/ 
export const getCategoryData = () => {
  return http.get('/index/findCategoryTree', {}, {
    baseURL: 'http://localhost:3000'
  })
}
