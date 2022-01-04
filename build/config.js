const path = require('path');
const fs = require('fs');
// 告诉 Webpack 不要捆绑这些模块或其任何子模块。
const nodeExternals = require('webpack-node-externals');
let externals = {};

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;

exports.alias = {
  src: path.resolve(__dirname, '../src'),
  html2pdf: path.resolve(__dirname, '../'),
};

exports.html2canvas = {
  root: 'html2canvas',
  commonjs: 'html2canvas',
  commonjs2: 'html2canvas',
  amd: 'html2canvas'
};
exports.jspdf = {
  root: 'jspdf',
  commonjs: 'jspdf',
  commonjs2: 'jspdf',
  amd: 'jspdf'
};
exports.dev = {
  host: 'localhost', // can be overwritten by process.env.HOST
  port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  autoOpenBrowser: true,
  notifyOnErrors: false,
}

exports.jsexclude = /node_modules/;
