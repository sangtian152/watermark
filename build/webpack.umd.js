const path = require('path');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.conf')
const config = require('./config');

const umdWebpackConfig = merge(webpackConfig, {
  mode: 'production',
  output: {
    clean: true, // 在生成文件之前清空 output 目录
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: 'watermark.umd.js',
    // chunkFilename: '[name].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'watermark',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
 
  externals: {
    html2canvas: config.html2canvas,
    jspdf: config.jspdf
  },
})

module.exports = umdWebpackConfig
