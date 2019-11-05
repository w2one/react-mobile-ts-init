# core-js

- [core-js](https://github.com/zloirock/core-js)
- [babel-runtime-corejs3](https://github.com/babel/babel/tree/master/packages/babel-runtime-corejs3)

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": ["last 2 versions"],
          "chrome": "60",
          "firefox": "60",
          "safari": "10",
          "ie": "10",
          "edge": "17",
          "android": "4.0",
          "ios": "10"
        },
        "useBuiltIns": "usage",
        "corejs": "core-js@3",
        "debug": false
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
    "react-hot-loader/babel",
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ],
    [
      "import",
      {
        "libraryName": "antd-mobile",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
```
