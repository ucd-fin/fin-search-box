const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'fin-search-box.js'),
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  target : 'web',
  resolve : {
    modules: [path.resolve(__dirname, 'node_modules')]
  },
  module : {
    rules: [
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: false
            }
          }
        }
    ]
  }
};