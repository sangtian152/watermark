const path = require('path');
const portfinder = require('portfinder');
const { merge } = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv').config()

const config = require('./config')
const webpackConfig = require('./webpack.conf')

if (dotenv.error) {
  throw dotenv.error
}

const resolve = (dir) => path.join(__dirname, dir)

const HOST = process.env.HOST

const devWebpackConfig = merge(webpackConfig, {
  mode: 'development',
  entry: {
    app: './demo/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // 配置打包输出环境，不使用箭头函数
    environment: {
      arrowFunction: false
    }
  },
  devServer: {
    hot: true,
    host: HOST || config.dev.host,
  },
  resolve:{
    modules: ['node_modules', resolve('lib')]
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'demo/index.html',
      inject: true,
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port)=>{
    if(err){
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port
      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${
                devWebpackConfig.devServer.host
              }:${port}`
            ]
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
        })
      )

      resolve(devWebpackConfig)
    }
  })
})