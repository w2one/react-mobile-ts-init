/* eslint-disable no-unused-vars */
/**
 * webpack prod config
 */

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const ZipPlugin = require("zip-webpack-plugin");
const CloudStorageWebpackPlugin = require("cloud-storage-webpack-plugin");
const common = require("./webpack.base.config.js");

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "image/[name].[hash:6].[ext]"
              // outputPath: "image/",
              // publicPath: ".."
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "font/[name].[ext]",
              publicPath: ".."
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:6].css",
      chunkFilename: "css/[name].[hash:6].css"
    }),
    // Analyzer bundle
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 8889
    // }),
    new webpack.BannerPlugin("Build in " + new Date().toLocaleString())
    // zip
    // new ZipPlugin({
    //   // path: "../",
    //   // pathPrefix: "www",
    //   filename: "dist.zip"
    // }),
    // cloud storage
    // new CloudStorageWebpackPlugin({
    //   prefix: "react",
    //   cos: {
    //     SecretId: "",
    //     SecretKey: "",
    //     Bucket: "",
    //     Region: ""
    //   }
    // })
  ],
  optimization: {
    runtimeChunk: {
      name: "runtime"
    },
    minimizer: [
      // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
      new TerserPlugin({
        terserOptions: {
          parallel: true,
          cache: true,
          compress: { warnings: false, drop_console: true },
          output: {
            // comments: false
            comments: /Build in/i
          }
        },
        extractComments: false
      })
    ],
    splitChunks: {
      chunks: "all",
      minChunks: 3,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        },
        // packaged css in one file
        styles: {
          name: "styles",
          test: /\.(less|css|scss)$/,
          chunks: "all",
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
    // mobile: {
    //   test: /node_modules\/antd-mobile/,
    //   chunks: "initial",
    //   name: "mobile",
    //   priority: 10,
    //   enforce: true
    // }
  }
});
