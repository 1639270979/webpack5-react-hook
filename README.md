## 目前存在问题
* 统一指定环境： session 指定一套环境 / 业务代码指定一套环境
* 统一指定版本： gulp 打包出去了 react/react-router &  项目又依赖一套 react/react-router
* 简化开发/测试，保证代码一致性（js-sdk 配置 / 微信支付 需要指定域名）
  * 局域网 IP 访问
  * 测试环境访问 
  * 正式环境访问

## 环境
* 业务代码:
  * 测试环境 API
  * 正式环境 API
* webpack: 
  * dev-server
  * 打包

* dev: dev-server + 测试环境 API
* production: 打包 + 正式环境 API + mode production


## webpack 配置
1. 和手脚架的区别
  1. 手脚架底层使用大部分都是使用 webpack。不同产品的内部结构/用法 差异比较大
    * Create React App ：`.env` 文件 定义变量的时候：REACT_APP_DEV
    * Vue Cli : `.env` 文件 VUE_APP_DEV
  2. 中间少了一层手脚架的依赖。无论是 vue / react / 小程序 都能使用同一套
2. 迁移
  1. 只要 src 文件存在，中间编译层替换是没有问题
  2. 内部 inject 参数需要找出来重新设置
