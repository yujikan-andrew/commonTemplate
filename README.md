# common tempalte

## 说明

> 路由配置：src/router

> 前端自测模拟数据：mock 

> 数据请求层：src/api

> 全局引入样式，一定要使用这里的范式：src/assets/style/params.less

> 缓存全局数据 vuex： src/store

> 数据请求层，只负责请求数据 src/api

> 数据模型层，只负责处理数据，把结构化数据给 views: src/models

> 页面，减少业务逻辑，尽量只负责渲染: src/views

> 整体布局： src/layout

> 项目通用组件： src/components

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
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

