# project init

## 初始化项目

```
mkdir react-init && cd react-init
touch README.md
npm init 生成package.json文件
```

## webpack

[webpack](https://webpack.js.org/concepts) is a static module bundler for modern JavaScript applications

- entry
- output
- loaders
- plugins
- resolve

```
安装
npm i webpack webpack-cli webpack-dev-server -D

创建项目目录
mkdir build src

build 中放置 webpack 的配置文件
src 中是源码

cd build && touch webpack.base.config.js

```

> plugins

[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
npm i html-webpack-plugin@next -D

[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)
npm install clean-webpack-plugin -D

常量定义
https://webpack.js.org/plugins/define-plugin

```
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify('5fa3b9'),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: '1+1',
  'typeof window': JSON.stringify('object'),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
});
```

cross-env

npm i cross-env -D

Run scripts that set and use environment variables across platforms

> 多个配置文件
> webpack-merge

## Babel

[Babel](https://babeljs.io/setup#installation) is a JavaScript compiler.Use next generation JavaScript, today.

```
1. 安装
npm install babel-loader @babel/core -D
npm install @babel/preset-env -D

2. webpack 配置
module: {
  rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
}

3. .babelrc配置

{
  "presets": ["@babel/preset-env"]
}
```

## 样式 css

```
npm i less less-loader css-loader style-loader -D

{
      test: /\.less$/,
      use: [{
        loader: 'style-loader' // creates style nodes from JS strings
      }, {
        loader: 'css-loader' // translates CSS into CommonJS
      }, {
        loader: 'less-loader' // compiles Less to CSS
      }]
    }]
```

## 图片文件

npm i file-loader url-loader -D

# 安装React

## React

[React](https://github.com/facebook/react) A declarative, efficient, and flexible JavaScript library for building user interfaces.

```

npm i react react-dom -S

babel 转译 react
npm install  @babel/preset-react -D

```

## react-router-dom

```

npm i react-router-dom -S

```

开发
https://webpack.js.org/configuration/dev-server/

## Redux

https://react-redux.js.org/api/provider

npm install redux react-redux redux-thunk -S

npm i redux-logger -D

redux-thunk 解决异步

## UI

ant mobile

npm i antd-mobile -S

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

cnpm install babel-plugin-import --save-dev

```

[
  "import",
  {
    "libraryName": "antd-mobile",
    "libraryDirectory": "es",
    "style": true
  }
]

```

# 打包优化

## Html 优化

```
new HtmlWebpackPlugin({
  filename: "index.html",
  template: "./src/index.html",
  inject: true,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true
  }
})

```

## css 分割

> [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin)

```
{
      loader: MiniCssExtractPlugin.loader,
      options: {
        // you can specify a publicPath here
        // by default it use publicPath in webpackOptions.output
        // publicPath: "../"
      }
    },
    // {
    //   loader: "style-loader" // creates style nodes from JS strings
    // },

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].css",
      chunkFilename: "[id].css"
    })

   optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }

},

```

## 图片优化

[url-loader](https://webpack.js.org/loaders/url-loader)

```
{
  test: /\.(png|jpg|gif|svg)\$/i,
  use: [
    {
      loader: "url-loader",
        options: {
        limit: 8192,
        name: "[name].[hash:6].[ext]",
        outputPath: "image/"
      }
    }
  ]
}
```

## js 代码分割

https://webpack.js.org/guides/code-splitting/

> webpack-bundle-analyzer 分析

https://reactjs.org/docs/code-splitting.html

```
重复打包
optimization: {
  splitChunks: {
    chunks: "all"
  }
}

```

## bandle 分析

[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

https://reactjs.org/docs/code-splitting.html

react lazy

动态 import
https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import/
npm install --save-dev @babel/plugin-syntax-dynamic-import

```

import React, { Suspense, lazy } from "react";

// import Home from "./containers/Home";
const Home = lazy(() =>
import(/_ webpackChunkName: "home" _/ "./containers/Home")
);

<Suspense fallback={<div>Loading...</div>}>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
</Suspense>
```

## 开发再次提速 dll

webpack.DllPlugin

https://www.npmjs.com/package/add-asset-html-webpack-plugin

## splict chunks

https://webpack.js.org/plugins/split-chunks-plugin/

## js 压缩

terser-webpack-plugin

https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions

## css 处理 todo

https://webpack.js.org/loaders/postcss-loader

https://www.npmjs.com/package/postcss-preset-env

https://github.com/cssnano/cssnano

## 打包压缩 zip

zip-webpack-plugin

## babel 的问题

在使用 babel 中还想减少代码，就需要引入 babel 的运行时：

npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime

cnpm install core-js@3 -D

## 持续升级

npm-check-updates 检查依赖包升级

## Ref

- [webpack](https://webpack.js.org/concepts)
- [babel](https://babeljs.io/)
- [react](https://reactjs.org/)
- [react-router](https://reacttraining.com/react-router/web/guides/quick-start)
- [redux](https://redux.js.org/introduction/getting-started)
- [ant design](https://mobile.ant.design/docs/react/introduce-cn)
- [参考文章](https://juejin.im/post/5bd2cf19f265da0a972e632c)
