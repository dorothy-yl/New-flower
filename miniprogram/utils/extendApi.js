// 微信小程序工具函数

// toast提示函数
export const toast = ({ title, icon = 'none', duration = 2000 }) => {
  wx.showToast({
    title,
    icon,
    duration
  })
}

// modal弹窗函数
export const modal = ({ title, content, showCancel = true, success }) => {
  wx.showModal({
    title,
    content,
    showCancel,
    success
  })
}