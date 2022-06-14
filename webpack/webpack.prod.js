/*
 * @Description: 
 * @Author: ShuaiBi
 * @Date: 2022-06-13 17:01:31
 * @LastEditTime: 2022-06-14 13:24:27
 * @LastEditors:  
 */
// 开发环境
// webpack中引入的path[require('path')]是node.js内置的package，用来处理路径的。
const path = require('path')
const WebpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackConfig = require('./webpack.config.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const InlineChunkHtmlPlugin = require('./InlineChunkHtmlPlugin')

const smp = new SpeedMeasurePlugin()

// Webpack-merge 提供了一个函数，该函数将数组串联并合并创建新对象的对象。如果遇到函数，它将执行它们，通过算法运行结果，然后再次将返回的值包装在函数中。
const outputPathName = '../build'// 打包目录
const assestPathName = 'static' // 静态文件目录
const outputPath = path.resolve(process.cwd(), outputPathName)
const isWebpackDev = process.env.NODE_ENV === 'development'

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
    output: {
      path: outputPath,
      chunkFilename: assestPathName + `/[name].[chunkhash:5].js`,
      publicPath: '../',
      filename: assestPathName + `/[name].[chunkhash:5].js`
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          parallel: true,
          terserOptions: {
            format: {
              comments: false,
            },
            compress: {
              drop_console: !isWebpackDev,
              drop_debugger: !isWebpackDev,
            },
          }
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
      runtimeChunk: { name: 'runtime' },
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: {
            name: 'default',
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          }
        }
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({ 
        filename: assestPathName + `/css/[name].[chunkhash:5].css`,
        ignoreOrder: true
      }),
      new HtmlWebpackPlugin({
        ...baseHtmlWebpackPluginConfig,
        minify: true,
        chunks: ['default', 'app']
      }),
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/]),

    ]
  })