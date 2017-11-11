/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-26 18:00:56
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-09 10:47:05
 */

const path = require('path')
const glob = require('glob')

module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      }
    ,
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      }
    )
    return config
  },
  exportPathMap: function () {
    return {
      '/login': { page: '/login' }
    }
  }
}
