/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-26 18:00:56
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-25 16:30:09
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
    ,
      {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          { loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    )
    return config
  },
  distDir: 'build',
  exportPathMap: function () {
    return {
      '/': {page: '/'},
      '/login.html': { page: '/login' },
      '/reset.html': { page: '/reset' },
      '/students/index.html': {page: '/students/index'},
      '/students/actionmanager/myselection.html': {page: '/students/actionmanager/myselection'},
      '/students/actionmanager/select.html': {page: '/students/actionmanager/select'},
      '/teachers/index.html': {page: '/teachers/index'},
      '/teachers/actionmanager/publish.html': {page: '/teachers/actionmanager/publish'},
      '/teachers/actionmanager/export.html': {page: '/teachers/actionmanager/export'},
      '/teachers/actionmanager/status.html': {page: '/teachers/actionmanager/status'},
      '/teachers/papermanager/addpaper.html': {page: '/teachers/papermanager/addpaper'},
      '/teachers/papermanager/mypaper.html': {page: '/teachers/papermanager/mypaper'},
      '/teachers/stumanager/addstu.html': {page: '/teachers/stumanager/addstu'},
      '/teachers/stumanager/mystu.html': {page: '/teachers/stumanager/mystu'}
    }
  }
}
