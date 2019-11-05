# commit 代码校验

```
  "precommit": "lint-staged"
  },
  "lint-staged": {
    "src/**/*": [
      "prettier --write  \"./**/*.{js,jsx,css,less,md,json}\"",
      "eslint --fix",
      "git add"
    ]
  },
```

## REF

- https://github.com/typicode/husky
- https://github.com/okonet/lint-staged
