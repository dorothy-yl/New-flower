import { getCategoryData } from '../../api/category'
import formatImageUrl from '../../utils/formatImageUrl';

Page({
  data: {
    categoryList: [],
    subCategoryList: [],
    activeIndex: null
  },

  async getCategoryData() {
    const res = await getCategoryData()
    console.log("res", res);

    if (res.code === 200) {
      const subCategoryList = res.data[0].children.map(item => ({
        ...item,
        imageUrl: this.formatImageUrl(item.imageUrl)
      }))
      console.log("subCategoryList", res.data[0].children, subCategoryList);

      this.setData({
        categoryList: res.data,
        activeIndex: res.data[0].id,
        subCategoryList: subCategoryList
      })
    }

    // console.log(res);
  },

  formatImageUrl(imageUrl) {
    return formatImageUrl(imageUrl, 'cate')
  },

  onSwitchCategoryClick(e) {
    const id = e.currentTarget.dataset.id;
    console.log("id", id);

    // 设置当前选中的分类
    this.setData({
      activeIndex: id,
      subCategoryList: this.data.categoryList.find(item => item.id === id).children.map(item => ({
        ...item,
        imageUrl: this.formatImageUrl(item.imageUrl)
      }))
    });
  },

  onLoad() {
    // 调用获取商品数据
    this.getCategoryData()
  }
})
