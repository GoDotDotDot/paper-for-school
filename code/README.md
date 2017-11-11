# ECO WEBSITE

eco 官网源码

## 说明

本项目采用`next.js` `ssr`框架。

项目整体用到的技术：

- next.js

  > 使用`next.js` 进行服务端渲染

- node.js

- express 4 

- mongodb 

- react 16

- nginx 

  > 主要做静态资源托管、请求转发

- ant design

  > `react` ui库

- ant motion

  > 动画库

其中`css` 预处理器采用`scss`，我们使用 [styled-jsx](https://github.com/zeit/styled-jsx)来支持模块化`css`。

**配置参考 https://github.com/zeit/next.js/tree/canary/examples/with-styled-jsx-scss**

## 如何使用
### 开发环境
`npm run dev`
### 生产环境
`npm run build`
### 静态导出
`npm run export`