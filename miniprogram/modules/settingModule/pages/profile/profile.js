// pages/profile/profile.js
import { userBehavior } from './behavior'
import { reqUploadFile, reqUpdateUserProfile } from '../../../../api/user'

Page({
  // 注册behaviors
  behaviors: [userBehavior],
  // 页面的初始数据
  data: {
    isShowPopup: false, // 控制更新用户昵称的弹框显示与否
    tempNickname: '' // 临时存储用户输入的昵称
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

  // 昵称输入事件处理
  onNicknameInput(e) {
    const { value } = e.detail
    this.setData({
      tempNickname: value
    })
  },

  // 获取昵称并处理表单提交
  getNickName(e) {
    console.log('昵称表单提交:', e)

    // 获取表单数据
    const formData = e.detail.value
    const nickname = formData.nickname || this.data.tempNickname

    // 验证昵称
    if (!nickname || nickname.trim() === '') {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      })
      return
    }

    // 检查昵称长度
    if (nickname.length > 20) {
      wx.showToast({
        title: '昵称不能超过20个字符',
        icon: 'none'
      })
      return
    }

    // 显示加载提示
    wx.showLoading({
      title: '更新中...',
      mask: true
    })

    try {
      // 更新用户信息
      const newUserInfo = {
        ...this.data.userInfo,
        nickname: nickname.trim()
      }

      // 更新本地状态
      this.setData({
        userInfo: newUserInfo,
        isShowPopup: false,
        tempNickname: ''
      })

      // 更新全局用户信息
      const { userStore } = require('../../../../stores/userStore')
      userStore.setUserInfo(newUserInfo)

      // 保存到本地存储
      wx.setStorageSync('userInfo', newUserInfo)

      // 调用API更新服务器端的用户信息，设置超时时间
      const updatePromise = reqUpdateUserProfile({
        nickname: nickname.trim()
      })

      // 设置超时处理
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('请求超时'))
        }, 10000) // 10秒超时
      })

      // 使用Promise.race来处理超时
      Promise.race([updatePromise, timeoutPromise])
        .then(() => {
          console.log('服务器端用户信息更新成功')
        })
        .catch(err => {
          console.error('服务器端用户信息更新失败:', err)
          if (err.message === '请求超时') {
            wx.showToast({
              title: '网络超时，但本地已更新',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '服务器更新失败，但本地已更新',
              icon: 'none',
              duration: 2000
            })
          }
          // 即使服务器更新失败，本地更新仍然有效
        })

      wx.showToast({
        title: '昵称更新成功',
        icon: 'success'
      })

    } catch (error) {
      console.error('更新昵称失败:', error)
      wx.showToast({
        title: '昵称更新失败',
        icon: 'error'
      })
    } finally {
      wx.hideLoading()
    }
  },

  // 显示修改昵称弹框
  onUpdateNickName() {
    // 设置临时昵称为当前昵称
    this.setData({
      isShowPopup: true,
      'userInfo.nickname': this.data.userInfo.nickname || ''
    })
  },

  // 弹框取消按钮
  cancelForm() {
    this.setData({
      isShowPopup: false,
      'userInfo.nickname': ''
    })
  }
})
