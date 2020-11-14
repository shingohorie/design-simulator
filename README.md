# design-simulator

> My world-class Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Environment 
### Heroku
アプリのデプロイ先。以下の環境変数を設定
| KEY | VALUE |
| ------------- | ------------- |
| BASIC_AUTH_ID | 任意の値（BASIC認証ID） |
| BASIC_AUTH_PW | 任意の値（BASIC認証PW） |
| BASIC_ENABLED | true |
| HOST | 0.0.0.0 |
| NODE_ENV | production |
| NPM_CONFIG_PRODUCTION | false |

### Firebase
設定値の初期値をRealtime Databaseで管理。
