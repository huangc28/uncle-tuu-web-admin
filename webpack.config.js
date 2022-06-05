const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
require('dotenv').config()

const { NODE_ENV } = process.env

module.exports = {
  mode: NODE_ENV,
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: NODE_ENV === 'development'
      ? '/'
      : './',
    clean: true,
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      Atuu: path.resolve(__dirname, 'src')
    },
    fallback: {
      // 'url': require.resolve('url'),
      'fs': false,
      'tls': false,
      'net': false,
      'path': false,
      'zlib': false,
      'http': false,
      'https': false,
      'stream': false,
      'crypto': false,
      'crypto-browserify': false,
      'buffer': false,
      'util': false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new WebpackManifestPlugin({}),

    new HtmlWebpackPlugin({
      title: 'atuu',
      template: path.resolve(__dirname, './index.html'),
      favicon: path.resolve(__dirname, './src/static/favicons/favicon.ico'),
    }),

    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),

    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'SERVER_HOST',
    ]),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

}
