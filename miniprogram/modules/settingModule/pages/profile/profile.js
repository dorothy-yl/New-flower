// pages/profile/profile.js
import { userBehavior } from './behavior'


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
    wx.uploadFile({
      url: 'http://localhost:3000/api/upload/wechat',
      filePath: avatarUrl,
      name: 'file',
      formData: {
        type: 'image'
      },
      success: (res) => {
        console.log('上传头像成功:', res)
      },
      fail: (err) => {
        console.log('上传头像失败:', err)
      }
    })
    this.setData({
      'userInfo.headimgurl': avatarUrl
    })


    // 检查是否成功选择头像
    if (event.detail && event.detail.avatarUrl) {
      // 用户选择了头像
      console.log('选择的头像URL:', event.detail.avatarUrl)
      // 这里可以调用API更新用户头像
      // this.updateUserAvatar(event.detail.avatarUrl)
    } else {
      // 用户取消选择或选择失败
      console.log('用户取消头像选择或选择失败')
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
