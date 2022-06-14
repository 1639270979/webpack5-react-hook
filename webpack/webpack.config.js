/**
 * webpack 配置
 * dev/dep 环境
 */
const path = require('path')
const process = require('process')
const Webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const Chalk = require("chalk")
const ProgressBarPlugin = require("progress-bar-webpack-plugin") // 进度条，不好看

// dep 导出文件配置
const appDir = path.resolve(process.cwd(), 'src')
const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const assestPathName = 'static' // 静态文件目录

// postcss loader 配置
const postCssLoader = {
  loader: 'postcss-loader',
  options: { postcssOptions: { plugins: [['autoprefixer']] } }
}
// ts/js rule
const presets = [
  "@babel/preset-react",
  [
    "@babel/preset-env",
    {
      "useBuiltIns": "usage",
      "corejs": "3.0.0"
    }
  ]
]
const typeScriptRule = {
  test: /\.ts(x?)$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        "@babel/preset-typescript",
        ...presets
      ],
      plugins: ["@babel/plugin-proposal-class-properties"]
    }
  },
  include: [appDir, path.resolve(process.cwd(), 'node_modules')]
}
const javaScriptRule = {
  test: /\.js(x?)$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets,
      plugins: ["@babel/plugin-proposal-class-properties"]
    }
  },
  include: [appDir, path.resolve(process.cwd(), 'node_modules/recoil/es')],
}

const isJsDev = process.env.NODE_ENV !== 'production'
const isWebpackDev = process.env.NODE_ENV === 'development'
// webpack mode 设置
const mode = isWebpackDev ? 'development' : 'production'
// 根据 isDev 配置 css / file 的 Rule
const cssModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      // 开发环境 local name 需要展示出来才方便调试
      localIdentName: isWebpackDev ? '[local]_[hash:base64:5]' : '[hash:base64]',
    },
  }
}
const modulesStyleRule = {
  test: /(\.module)?.(sass|scss)$/,
  use: [
    isWebpackDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    cssModuleLoader,
    postCssLoader,
    'sass-loader'
  ],
  include: [appDir]
}
const commonStyleRule = {
  test: /\.(css|scss)$/,
  use: [
    isWebpackDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    postCssLoader,
    'sass-loader'
  ],
  include: [appDir],
  exclude: [/(\.module)?.(sass|scss)$/],
}

const fileRule = {
  test: /\.(png|svg|jpg|gif|woff|woff2)$/,
  use: [{
    loader: 'url-loader',
    options: isWebpackDev ?
      { limit: 2500 } :
      { limit: 2500, outputPath: assestPathName, publicPath: `/${assestPathName}` }
  }],
  include: [appDir],
  exclude: [nodeModuleDir]
}

const eslintRule = {
  test: /\.(jsx|js|ts|tsx)$/,
  enforce: 'pre',
  use: [
    {
    loader: 'eslint-loader',
    options: {
      //加上下面这一句，run eject暴露的文件没有下面这句，加上这句自定义.eslintrc.js文件就起作用了
      useEslintrc: true,
      fix: true
    },
  }],
  include: [
    appDir,
  ],
  exclude: [/node_modules/],
}

// 基础配置
const baseConfig = {
  mode,
  entry: { 'app': [path.resolve(__dirname,'../src/index.tsx')] },
  resolve: {
    extensions: [".ts", ".tsx", '.js', 'jsx'],
    alias: { '@': appDir }
  },
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js|ts|tsx)$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
      },
      eslintRule,
      typeScriptRule,
      javaScriptRule,
      modulesStyleRule,
      commonStyleRule,
      fileRule
    ]
  },
  plugins:[
  new Webpack.DefinePlugin({ __DEV__: isJsDev }),
  new FriendlyErrorsWebpackPlugin(),
  // 进度条 不好看
  new ProgressBarPlugin({
    format: `:msg [:bar] ${Chalk.green.bold(":percent")} (:elapsed s)`,
  })
  ]
}

module.exports = baseConfig