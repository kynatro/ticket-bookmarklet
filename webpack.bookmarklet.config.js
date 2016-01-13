/* eslint semi: false */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'source'),
  entry: {
    "bookmarklet": './bookmarklet-snippet.js',
    "bookmarklet.min": './bookmarklet-snippet.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      HOST: JSON.stringify(process.env.HOST || "localhost:5000")
    }),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: {
        warnings: false
      },
      comments: false,
      enclose: true,
      minimize: true,
      mangle: true,
      sourceMap: false
    })
  ]
};
