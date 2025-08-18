import http from './http'



// goodsId商品  count购买数量  blessing祝福语
export const reqAddCart = (goodsId, count, ...data) => {
  return http.get(`/cart/addToCart/${goodsId}/${count}`, data)
}


// 购物车列表  returns Promise
export const reqCartList = () => {
  return http.get('/cart/getCartList')
}


// 更新商品的选择状态，goodsId 商品的ID，isChecked 是否选中
export const reqUpdateCheck = (goodsId, isChecked) => {
  return http.get(`/cart/checkCart/${goodsId}/${isChecked}`)
}



//实现全选和全不选功能
export const reqCheckAllStatus = (isChecked)=>{
  return http.get(`/cart/checkAllCart/${isChecked}`)
}


// 删除购物车中的商品，goodsId 商品的ID
export const reqDelCartGoods = (goodsId) => {
  return http.get(`/cart/delete/${goodsId}`)
}