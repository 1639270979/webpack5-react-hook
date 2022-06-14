/*
 * @Description: 
 * @Author: ShuaiBi
 * @Date: 2022-06-13 17:01:16
 * @LastEditTime: 2022-06-14 13:29:59
 * @LastEditors:  
 */
// 开发环境
// webpack中引入的path[require('path')]是node.js内置的package，用来处理路径的。
const path = require('path')
const WebpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const webpackConfig = require('./webpack.config.js')

const smp = new SpeedMeasurePlugin()

// Webpack-merge 提供了一个函数，该函数将数组串联并合并创建新对象的对象。如果遇到函数，它将执行它们，通过算法运行结果，然后再次将返回的值包装在函数中。
const ip = require('ip')
const port = 8080
const host = ip.address()

// html Plugin 配置
const baseHtmlWebpackPluginConfig = {
  filename: `index.html`,
  title: 'title',
  template: path.resolve(__dirname,'../public/index.html'),
  inject: true,
  templateParameters: {
    isDev: ''
  }
}

module.exports = WebpackMerge.merge(webpackConfig,{
  devtool: 'source-map',
  output:{
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname,'../build')
  },
  stats: 'errors-only',  //加上这一行, 代表: 只打印错误日志
  devServer:{
    port, 
    host: host,
    open: true,
    hot: true,
    compress: true,
    client: {
      logging: 'error',
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    // onListening: function (devServer) {
    //   if (!devServer) {
    //     throw new Error('webpack-dev-server is not defined');
    //   }
    //   console.log('Project is running at:', 'http://' + ip.address()+":"+port + '/');
    // },
    // contentBase: path.resolve(process.cwd(), 'build'),
    historyApiFallback: true,
  },
  plugins:[
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      ...baseHtmlWebpackPluginConfig,
      chunks: ['app']
    }),
  ]
})