const path = require('path');
// 告诉 Webpack 不要捆绑这些模块或其任何子模块。
const nodeExternals = require('webpack-node-externals');
let externals = {};

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;

exports.alias = {
  '@': path.resolve(__dirname, '../src'),
  src: path.resolve(__dirname, '../src'),
  watermark: path.resolve(__dirname, '../'),
};

exports.dev = {
  host: 'localhost', // can be overwritten by process.env.HOST
  port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  autoOpenBrowser: true,
  notifyOnErrors: false,
}

exports.jsexclude = /node_modules/;
