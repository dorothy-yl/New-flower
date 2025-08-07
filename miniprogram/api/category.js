import http from '../utils/http'


export const getCategoryData = () => {
  return http.get('/index/findCategoryTree')
}
