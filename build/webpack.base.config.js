/**
 * webpack base config
 */

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ENV = process.env.NODE_ENV || "development";
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
// ant theme
const theme = require("../theme.json");

/**
 * px to rem
 */
const px2rem = require("postcss-pxtorem")({
  rootValue: 50, // 需要看根据设计稿计算设置
  propList: [
    "font",
    "font-size",
    "width",
    "max-width",
    "height",
    "max-height",
    "padding",
    "margin",
    "line-height",
    "letter-spacing"
  ]
});

/**
 * post css loader
 */
const postcssLoader =
  ENV === "production"
    ? {
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          plugins: [
            require("postcss-preset-env")({
              flexbox: "no-2009"
            }),
            px2rem,
            require("cssnano")({
              preset: "default"
            })
          ]
        }
      }
    : {
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          plugins: [
            require("postcss-preset-env")({
              flexbox: "no-2009"
            }),
            px2rem
          ]
        }
      };

/**
 * css loader
 */
const cssLoader = [
  {
    // ant-design
    test: /\.less|css$/,
    include: [/node_modules/],
    use: [
      ENV !== "production" // 生产分离出样式
        ? {
            loader: "style-loader"
          }
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
      {
        loader: "css-loader",
        options: {
          importLoaders: 1
        }
      },
      postcssLoader,
      {
        loader: "less-loader",
        options: {
          modifyVars: theme,
          javascriptEnabled: true
        }
      }
    ]
  },
  {
    // 公共样式
    test: /\.scss|css$/,
    include: [
      // path.resolve(__dirname, "../", "src/components/"),
      path.resolve(__dirname, "../", "src/styles/")
    ],
    use: [
      ENV !== "production"
        ? {
            loader: "style-loader"
          }
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
      {
        loader: "css-loader",
        options: {
          // modules: true
          importLoaders: 1
        } // translates CSS into CommonJS
      },
      postcssLoader,
      {
        loader: "sass-loader",
        // options: {
        //   javascriptEnabled: true
        // }
      }
    ]
  },
  {
    test: /\.scss$/,
    exclude: [
      /node_modules/,
      // path.resolve(__dirname, "../", "src/components/"),
      path.resolve(__dirname, "../", "src/styles/")
    ],
    use: [
      ENV !== "production"
        ? {
            loader: "style-loader"
          }
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[local]-[hash:base64:5]" // css模块化
          }
        }
      },
      postcssLoader,
      {
        loader: "sass-loader",
        // options: {
        //   javascriptEnabled: true
        // }
      }
    ]
  }
];

module.exports = {
  mode: ENV,
  entry: {
    index: "./src/index.tsx"
  },
  output: {
    filename: "js/[name].[hash:6].js",
    chunkFilename: "js/[name].[hash:6].js",
    path: path.resolve(__dirname, "../dist")
  },
  module: {
    // rules: [
    //   {
    //     enforce: "pre",
    //     test: /\.jsx?$/,
    //     exclude: /node_modules/,
    //     loader: "eslint-loader"
    //   },
    //   {
    //     test: /\.jsx?$/,
    //     exclude: /node_modules/,
    //     loader: "babel-loader",
    //     options: {
    //       cacheDirectory: true
    //     }
    //   },
      rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory({
                    libraryName: "antd-mobile",
                    libraryDirectory: "lib",
                    style: true
                  })
                ]
              }),
              compilerOptions: {
                module: "es2015"
              }
            }
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.tsx?$/,
        enforce: "pre",
        use: [
          {
            loader: "tslint-loader"
          }
        ]
      },
      ...cssLoader
    ]
  },
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "../src/"),
  //     "@component": path.resolve(__dirname, "../src/components/"),
  //     Styles: path.resolve(__dirname, "../src/style/"),
  //     "@image": path.resolve(__dirname, "../src/static/images/"),
  //     Utils: path.resolve(__dirname, "../src/utils/"),
  //     Components: path.resolve(__dirname, "../src/components/"),
  //     Context: path.resolve(__dirname, "../src/context/")
  //   },
  //   extensions: [".js", ".css", ".less",".scss"]
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
      "@styles": path.resolve(__dirname, "../src/styles/"),
      "@static": path.resolve(__dirname, "../src/static/"),
      "@utils": path.resolve(__dirname, "../src/utils/"),
      "@components": path.resolve(__dirname, "../src/components/"),
      "@containers": path.resolve(__dirname, "../src/containers/"),
      "@contexts": path.resolve(__dirname, "../src/contexts/")
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".scss", ".less"]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({
      // cleanOnceBeforeBuildPatterns: ["**/*", "!dll/**"]
    }),
    // new CopyPlugin([{ from: "static/", to: "static/" }]),
    new webpack.DllReferencePlugin({
      manifest: require("../dll/react.manifest.json")
      // context: __dirname
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      title: "React",
      favicon: "./src/static/images/favicon.ico",
      inject: true,
      minify: ENV === "production" && {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
      }
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, "../dll/*.dll.js"),
      outputPath: "dll",
      publicPath: "dll",
      includeSourcemap: false
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
      BUILD_VERSION: JSON.stringify(new Date().toString())
    })
  ]
};
