import { getCategoryData } from '../../api/category'

Page({
  data: {
    categoryList: [], // 所有分类数据
    firstCategories: [], // 一级分类
    secondCategories: [], // 二级分类
    currentSecondCategories: [], // 当前显示的二级分类
    activeFirstCategory: 0, // 当前选中的一级分类索引
    activeFirstCategoryId: null // 当前选中的一级分类ID
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

  // 处理分类数据，分离一级和二级分类
  processCategoryData(data) {
    if (!data || !Array.isArray(data)) return

    console.log('开始处理分类数据:', data)

    // 提取一级分类
    const firstCategories = data.map(item => ({
      id: item.id,
      name: item.name,
      imageUrl: this.processImageUrl(item.imageUrl)
    }))

    // 提取二级分类
    const secondCategories = []
    data.forEach(firstCategory => {
      if (firstCategory.children && Array.isArray(firstCategory.children)) {
        firstCategory.children.forEach(secondCategory => {
          secondCategories.push({
            ...secondCategory,
            firstCategoryId: firstCategory.id, // 关联一级分类ID
            imageUrl: this.processImageUrl(secondCategory.imageUrl)
          })
        })
      }
    })

    console.log('处理完成 - 一级分类数量:', firstCategories.length)
    console.log('处理完成 - 二级分类数量:', secondCategories.length)
    console.log('一级分类:', firstCategories)
    console.log('二级分类:', secondCategories)

    this.setData({
      firstCategories,
      secondCategories,
      categoryList: data
    })

    // 默认选中第一个一级分类
    if (firstCategories.length > 0) {
      this.setActiveFirstCategory(0)
    }
  },

  // 设置选中的一级分类
  setActiveFirstCategory(index) {
    const firstCategory = this.data.firstCategories[index]
    if (!firstCategory) return

    // 获取当前一级分类下的二级分类
    const currentSecondCategories = this.data.secondCategories.filter(item =>
      item.firstCategoryId === firstCategory.id
    )

    console.log('设置一级分类:', firstCategory.name, 'ID:', firstCategory.id)
    console.log('对应的二级分类数量:', currentSecondCategories.length)
    console.log('二级分类数据:', currentSecondCategories)

    this.setData({
      activeFirstCategory: index,
      activeFirstCategoryId: firstCategory.id,
      currentSecondCategories
    })
  },

  // 获取当前选中一级分类下的二级分类
  getCurrentSecondCategories() {
    if (!this.data.activeFirstCategoryId) {
      // 如果没有选中的一级分类，返回第一个分类的二级分类
      if (this.data.firstCategories.length > 0) {
        const firstCategoryId = this.data.firstCategories[0].id
        return this.data.secondCategories.filter(item =>
          item.firstCategoryId === firstCategoryId
        )
      }
      return []
    }

    return this.data.secondCategories.filter(item =>
      item.firstCategoryId === this.data.activeFirstCategoryId
    )
  },

  // 点击一级分类
  onFirstCategoryClick(e) {
    const index = e.currentTarget.dataset.index
    this.setActiveFirstCategory(index)
  },

  // 获取测试数据
  getTestData() {
    const testData = [
      {
        id: 1,
        name: '爱礼精选',
        imageUrl: '/assets/images/cate/cate-1.png',
        children: [
          { id: 11, name: '情人节花束', imageUrl: '/assets/images/cate/cate-2.png' },
          { id: 12, name: '生日花束', imageUrl: '/assets/images/cate/cate-3.png' },
          { id: 13, name: '求婚花束', imageUrl: '/assets/images/cate/cate-4.png' }
        ]
      },
      {
        id: 2,
        name: '鲜花玫瑰',
        imageUrl: '/assets/images/cate/cate-5.png',
        children: [
          { id: 21, name: '红玫瑰', imageUrl: '/assets/images/cate/cate-6.png' },
          { id: 22, name: '粉玫瑰', imageUrl: '/assets/images/cate/cate-7.png' },
          { id: 23, name: '白玫瑰', imageUrl: '/assets/images/cate/cate-8.png' }
        ]
      },
      {
        id: 3,
        name: '永生玫瑰',
        imageUrl: '/assets/images/cate/cate-9.png',
        children: [
          { id: 31, name: '永生花盒', imageUrl: '/assets/images/cate/cate-10.png' },
          { id: 32, name: '永生花束', imageUrl: '/assets/images/cate/cate-1.png' }
        ]
      },
      {
        id: 4,
        name: '玫瑰珠宝',
        imageUrl: '/assets/images/cate/cate-2.png',
        children: [
          { id: 41, name: '玫瑰项链', imageUrl: '/assets/images/cate/cate-3.png' },
          { id: 42, name: '玫瑰手链', imageUrl: '/assets/images/cate/cate-4.png' }
        ]
      }
    ]

    this.processCategoryData(testData)
  },

  async getCategoryData() {
    try {
      const res = await getCategoryData()
      console.log('API返回数据:', res)

      if (res.code === 200) {
        this.processCategoryData(res.data)
      } else {
        // API失败时使用测试数据
        console.log('API调用失败，使用测试数据')
        this.getTestData()
      }
    } catch (error) {
      console.error('API调用异常，使用测试数据:', error)
      this.getTestData()
    }
  },

  onLoad() {
    this.getCategoryData()
  }
})
