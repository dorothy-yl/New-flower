// pages/profile/profile.js
import { userBehavior } from './behavior'
import { reqUploadFile } from '../../../../api/user'

Page({
  // 注册behaviors
  behaviors: [userBehavior],
  // 页面的初始数据
  data: {
    isShowPopup: false // 控制更新用户昵称的弹框显示与否
  },

  // 更新用户头像
  onChooseAvatar(event) {
    // console.log('头像选择事件:', event)

    // 获取选择的头像临时路径
    const { avatarUrl } = event.detail

    // 检查是否成功选择头像
    if (!avatarUrl) {
      console.log('用户取消头像选择或选择失败')
      return
    }

    // 显示加载提示
    wx.showLoading({
      title: '上传中...',
      mask: true
    })

    // 使用统一的API上传头像
    reqUploadFile(avatarUrl, {
      baseURL: 'http://localhost:3000'
    }).then(res => {
      console.log('上传头像成功:', res)

      if (res.code === 200 && res.data) {
        // 上传成功，更新用户信息
        const newUserInfo = {
          ...this.data.userInfo,
          headimgurl: res.data.url || res.data
        }

        // 更新本地存储和状态
        this.setData({
          userInfo: newUserInfo
        })

        // 更新全局用户信息
        const { userStore } = require('../../../../stores/userStore')
        userStore.setUserInfo(newUserInfo)

        // 保存到本地存储
        wx.setStorageSync('userInfo', newUserInfo)

        wx.showToast({
          title: '头像更新成功',
          icon: 'success'
        })
      } else {
        throw new Error(res.message || '上传失败')
      }
    }).catch(err => {
      console.error('上传头像失败:', err)
      wx.showToast({
        title: '头像上传失败',
        icon: 'error'
      })
    }).finally(() => {
      // 隐藏加载提示
      wx.hideLoading()
    })
  },

  // 图片加载成功
  onImageLoad(event) {
    console.log('图片加载成功:', event)
  },

  // 图片加载失败
  onImageError(event) {
    console.log('图片加载失败:', event)

    // 如果头像加载失败，回退到默认头像
    if (this.data.userInfo.headimgurl && this.data.userInfo.headimgurl !== '/assets/images/avatar.png') {
      console.log('头像加载失败，回退到默认头像')

      const newUserInfo = {
        ...this.data.userInfo,
        headimgurl: '/assets/images/avatar.png'
      }

      this.setData({
        userInfo: newUserInfo
      })

      // 更新全局用户信息
      const { userStore } = require('../../../../stores/userStore')
      userStore.setUserInfo(newUserInfo)

      // 保存到本地存储
      wx.setStorageSync('userInfo', newUserInfo)

      wx.showToast({
        title: '头像加载失败，已使用默认头像',
        icon: 'none'
      })
    }
  },

  // 显示修改昵称弹框
  onUpdateNickName() {
    this.setData({
      isShowPopup: true
    })
  },

  // 弹框取消按钮
  cancelForm() {
    this.setData({
      isShowPopup: false
    })
  }
})
