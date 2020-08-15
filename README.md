# common tempalte

## 说明

> 路由配置：src/router

> 前端自测模拟数据：mock 

> 数据请求层，只负责请求数据 src/api

> 全局引入样式，**一定要使用这里的范式来减少工作量和沟通成本**：src/assets/style/params.less

> 缓存全局数据 vuex： src/store

> 数据模型层，只负责处理数据（把结构化数据返回给 views）: src/models

> 页面，减少业务逻辑，尽量只负责渲染: src/views

> 整体布局： src/layout

> 项目通用组件： src/components

> **规范化命名**：js "驼峰"，html "-"，css "-"，文件命名用 _ 来避免大小写带来的问题

> elementUI 按需加载：src/elementui 

> echarts 按需加载： src/echarts


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve/dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

