import { getCategoryData } from '../../api/category'

Page({
  data: {
    categoryList: []
  },

  // 处理图片路径的方法
  processImageUrl(imageUrl) {
    if (!imageUrl) return ''

    // 如果是完整的URL，直接替换为本地路径
    if (imageUrl.includes('http://39.98.123.211:8300/images')) {
      console.log('原始imageUrl', imageUrl)
      // 直接替换服务器地址为本地assets路径
      const localPath = imageUrl.replace('http://39.98.123.211:8300/images', '/assets/images/cate')
      console.log('替换后的路径', localPath)
      return localPath
    }

    return imageUrl
  },

  async getCategoryData() {
    const res = await getCategoryData()
    console.log('API返回数据:', res)

    if (res.code === 200) {
      // 处理每个分类项的图片路径
      const processedData = res.data.map(item => ({
        ...item,
        imageUrl: this.processImageUrl(item.imageUrl)
      }))

      console.log('处理后的数据:', processedData)

      this.setData({
        categoryList: processedData
      })
    }
  },

  onLoad() {
    this.getCategoryData()
  }
})
