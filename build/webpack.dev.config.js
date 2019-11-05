/**
 * webpack dev config
 */

const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.base.config.js");

module.exports = merge(common, {
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(ttf|woff)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [new webpack.ProgressPlugin()],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    host: "0.0.0.0",
    port: 9000,
    useLocalIp: true,
    hot: true,
    hotOnly: true,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true
  }
});
