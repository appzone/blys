const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, './dist')
const APP_DIR = path.resolve(__dirname, './src')
const PUBLIC_DIR = path.resolve(__dirname, './public')

module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['./src/app.tsx'],
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: process.env.PORT || 3000,
    historyApiFallback: true,
    hot: true,
    open: true
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './assets/[name]-[hash:8].[ext]',
            },
          },
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PUBLIC_DIR, '/index.html'),
      filename: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BASE_API_URL': JSON.stringify(process.env.BASE_API_URL)
    })
  ],
  resolve: {
    alias: { '@': path.resolve('./src') },
    modules: [APP_DIR, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  }
}