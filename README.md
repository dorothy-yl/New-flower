# 慕尚微信小程序

## 项目简介

这是一个基于微信小程序框架开发的应用项目。

## 项目结构

```
慕尚/
├── app.js                 # 小程序入口文件
├── app.json              # 小程序全局配置
├── app.wxss              # 小程序全局样式
├── components/           # 自定义组件目录
├── pages/               # 页面目录
│   └── index/          # 首页
│       ├── index.js    # 页面逻辑
│       ├── index.json  # 页面配置
│       ├── index.wxml  # 页面结构
│       └── index.wxss  # 页面样式
├── utils/              # 工具函数目录
│   └── formatTime.js   # 时间格式化工具
├── project.config.json # 项目配置文件
├── project.private.config.json # 私有配置文件
└── sitemap.json        # 站点地图配置
```

## 开发环境

- 微信开发者工具
- Node.js (可选，用于包管理)

## 安装和运行

### 1. 克隆项目
```bash
git clone [项目地址]
cd 慕尚
```

### 2. 使用微信开发者工具
1. 下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 打开微信开发者工具
3. 选择"导入项目"
4. 选择项目目录
5. 输入你的小程序 AppID（如果没有，可以选择测试号）

### 3. 开发调试
- 在微信开发者工具中，项目会自动编译和预览
- 可以在模拟器中查看效果
- 支持真机调试

## 项目配置

### AppID 配置
在 `project.config.json` 中配置你的小程序 AppID：
```json
{
  "appid": "你的小程序AppID"
}
```

### 页面配置
在 `app.json` 中配置页面路由和全局设置：
```json
{
  "pages": [
    "pages/index/index"
  ],
  "window": {
    "navigationBarTextStyle": "black"
  }
}
```

## 开发规范

### 文件命名
- 页面文件夹使用小写字母
- 组件文件夹使用小写字母
- 工具函数使用驼峰命名

### 代码规范
- 使用 ES6+ 语法
- 遵循微信小程序开发规范
- 保持代码简洁和可读性

## 部署

### 上传代码
1. 在微信开发者工具中点击"上传"
2. 填写版本号和项目备注
3. 提交审核

### 发布
1. 登录微信公众平台
2. 进入小程序管理后台
3. 提交审核通过后发布

## 常见问题

### 1. npm 包管理
如果项目名称包含中文，npm 可能会报错。建议：
- 将项目文件夹重命名为英文
- 或在 package.json 中使用英文项目名

### 2. 编译错误
- 检查语法错误
- 确认文件路径正确
- 查看控制台错误信息

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证。

## 联系方式

如有问题或建议，请联系项目维护者。 