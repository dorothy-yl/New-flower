export const reqGoodsInfo = (goodsId) => {
  return wx.request({
    url: 'https://www.baidu.com',
    method: 'GET',
    data: {
      goodsId
    }
  })
}