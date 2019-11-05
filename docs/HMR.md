# 热更新 HMR

```
import { hot } from "react-hot-loader/root";

export default hot(Index);
```

```
"plugins": [
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
    "react-hot-loader/babel",
```

```
 plugins: [
    new webpack.NamedModulesPlugin(),// 这两行貌似默认的
    new webpack.HotModuleReplacementPlugin()
    // new BundleAnalyzerPlugin({ analyzerPort: 8888 })
    // new MiniCssExtractPlugin({
    //   filename: "css/[name].[hash:5].css",
    //   publicPath: "/"
    // })
  ],
  devServer: {
    contentBase: "./dist",
    hot: true,// 这是重点
```
