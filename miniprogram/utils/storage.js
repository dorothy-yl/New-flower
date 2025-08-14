// 微信小程序存储工具函数

// 设置存储
export const setStorage = (key, value) => {
  try {
    wx.setStorageSync(key, value)
    return true
  } catch (error) {
    console.error('设置存储失败:', error)
    return false
  }
}

// 获取存储
export const getStorage = (key) => {
  try {
    return wx.getStorageSync(key)
  } catch (error) {
    console.error('获取存储失败:', error)
    return null
  }
}

// 移除存储
export const removeStorage = (key) => {
  try {
    wx.removeStorageSync(key)
    return true
  } catch (error) {
    console.error('移除存储失败:', error)
    return false
  }
}

// 清空所有存储
export const clearStorage = () => {
  try {
    wx.clearStorageSync()
    return true
  } catch (error) {
    console.error('清空存储失败:', error)
    return false
  }
}

// 检查存储是否存在
export const hasStorage = (key) => {
  try {
    const value = wx.getStorageSync(key)
    return value !== '' && value !== null && value !== undefined
  } catch (error) {
    return false
  }
}
