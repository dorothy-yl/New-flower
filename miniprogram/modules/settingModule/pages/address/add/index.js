Page({
  // 页面的初始数据
  data: {
    "name": "",   // 收货人 
    "phone": "",  // 手机号码
    "provinceName": "广东省", // 省
    "provinceCode": "440000", // 省编码
    "cityName": "广州市", // 市
    "cityCode": "440100", // 市编码
    "districtName": "天河区", // 区
    "districtCode": "440106", // 市编码
    "address": "", // 详细地址
    "fullAddress": "", // 完整地址
    "isDefault": 0 // 是否默认 0 否 1 是
  },

  // 保存收货地址
  saveAddrssForm(event) {},

  // 省市区选择
  onAddressChange(event) {}
})
