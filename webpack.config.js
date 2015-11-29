require('dotenv').load();

var autoprefixer = require('autoprefixer'),
    path = require('path'),
    webpack = require('webpack'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  cache: true,
	context: path.resolve(__dirname, 'source'),
  resolve: {
    root: [path.join(__dirname, 'bower_components')]
  },
  entry: {
    application: './application.jsx',
    index: './index.html'
  },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
    publicPath: '/',
    sourceMapFilename: "map/[file].map"
	},
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'react-hot!babel?' + JSON.stringify({
          presets: ['react', 'es2015'],
          plugins: ['transform-runtime']
        })
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css!postcss' // Run both loaders
      },
      {
        test: /\.s?css$/,
        loader: 'style!css!sass!postcss'
      },
      {
        test: /\.(woff|svg|ttf|eot)([\?]?.*)$/,
        loader: "file?name=[name].[ext]"
      }
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  plugins: [
    new BrowserSyncPlugin({
      files: [
        "dist/**/*.html",
        "dist/**/*.php",
        "dist/**/*.js",
        "dist/**/*.css"
      ],
      proxy: "http://localhost:8080",
      host: 'localhost',
      port: process.env.PORT,
      snippetOptions: {
        // Inject the snippet at the end of the body tag.
        // this helps with issues related to IE conditional
        // comments getting in the way.
        rule: {
          match: /<\/body>/i,
          fn: function (snippet, match) {
            return snippet + match;
          }
        }
      }
    }, {
      reload: false
    }),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),
    new webpack.ProvidePlugin({
      React: "react",
      jQuery: "jquery",
      $: "jquery"
    })
  ]
};
