require('dotenv').load();

var autoprefixer = require('autoprefixer'),
    path = require('path'),
    webpack = require('webpack'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var WebpackConfig = {
  cache: true,
	context: path.resolve(__dirname, 'source'),
  resolve: {
    root: [path.join(__dirname, 'bower_components')]
  },
  entry: {
    application: './application.jsx',
    "index.html": './index.html',
    demo: './demo.js',
    "demo.html": './demo.html',
    vendor: ['jquery', 'react']
  },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
    chunkFilename: '[id].js',
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
        exclude: /bower_components|node_modules/,
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
      },
      {
        test: /jquery\.js$/,
        loader: 'expose?jQuery!expose?$'
      }
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  plugins: [
    // Configure BrowserSync with WebpackDevServer
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
    // Resolve Bower managed packages
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),
    // Expose some modules globally to every module (so you
    // don't have to explicitly require them)
    new webpack.ProvidePlugin({
      React: "react"
    }),
    // Define some global variables
    // NOTE: Variables are evaluated, so must be passed in as though they
    // are defined statically in-line.
    new webpack.DefinePlugin({
      HOST: JSON.stringify(process.env.HOST || "localhost:5000"),
      APP_NAME: JSON.stringify("Trello Ticket Bookmarklet"),
      TRELLO_API_KEY: JSON.stringify(process.env.TRELLO_API_KEY)
    }),
    // Vendor file chunking
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js", Infinity)
  ]
};

if(process.env.BUILD) {
  // Uglify only specific library files
  WebpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      include: /(application|demo|vendor)\.js$/,
      exclude: /html\.js$/,
      compress: {
        warnings: false
      },
      comments: false,
      enclose: true,
      minimize: true,
      mangle: true
    })
  )
}

module.exports = WebpackConfig;
