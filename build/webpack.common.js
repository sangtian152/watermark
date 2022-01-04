const path = require('path');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const config = require('./config');

module.exports = {
  mode: 'production',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: 'html2pdf.common.js',
    chunkFilename: '[name].js',
    libraryExport: 'default',
    library: 'html2pdf',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  externals: config.externals,
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
        {
          test: /\.(jsx?|babel|es6)$/,
          include: process.cwd(),
          exclude: config.jsexclude,
          loader: 'babel-loader',
        }
      ]
  }
};
