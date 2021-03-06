# 💻 프론트엔드 개발환경의 이해(webpack, babel, eslint, prettier)

<br />

## ✅ README 정리

- [NPM](https://github.com/ssi02014/front_development_environment/tree/master/npm)
- [웹팩(Webpack) - 기본편](https://github.com/ssi02014/front_development_environment/tree/master/webpack-basic)
  - Loader
    1. css-loader
    2. style-loader
    3. file-loader (webpack5 이후 assets로 대체)
    4. url-loader (webpack5 이후 assets로 대체)
    5. asset-modules
       <br />
  - Plugin
    1. BannerPlugin
    2. DefinePlugin
    3. EnvironmentPlugin
    4. HtmlTemplatePlugin
    5. CleanWebpackPlugin
    6. MiniCssExtractPlugin
- [웹팩(Webpack) - 심화편](https://github.com/ssi02014/front_development_environment/tree/master/webpack-deep)
  - webpack-dev-server
  - HMR
- [바벨(Babel)](https://github.com/ssi02014/front_development_environment/tree/master/babel)
- [ESlint, Prettier](https://github.com/ssi02014/front_development_environment/tree/master/eslint-prettier)

<br />

## 👀 React v18 + webpack v5 + babel + eslint + prettier 실습 저장소

- [React v18 + webpack v5 + babel + eslint + prettier 보일러 플레이트](https://github.com/ssi02014/React_Init_Boilerplate)

<br />

## 👀 참고 사이트

- [📖 김정환님 블로그](https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html)

<br />

## 👀 폴더 참고 사항

1. `lecture-example`: 강의 실습
2. `sample`: 각 폴더 README에 작성된 예제
3. `npm`: npm 관련 README 정리
4. `webpack-basic`: webpack 기본편 README 정리
5. `webpack-deep`: webpack 심화편 README 정리
6. `babel`: babel README 정리
7. `eslint-prettier`: eslint, prettier README 정리
8. `server`: 테스트용 node server 폴더

<br />

## 🔖 Webpack, Babel 버전 관련 참고 사항

### 1. asset-modules

- [asset-modules webpack 공식 사이트 참고](https://webpack.js.org/guides/asset-modules)
- webpack v5 이후부터는 `file-loader`와 `url-loader`는 기본 모듈로 채택되면서 더이상 호환되지 않는다.
- file-loader와 url-loader는 각각 `asset/resource`, `asset/inline`로 대체되었다.
- asset/resource와 asset/inline을 조건 상태에따라서 자동으로 선택하는 `asset`도 있다.
- 자세한 내용은 [웹팩(Webpack) - 기본편](https://github.com/ssi02014/front_development_environment/tree/master/webpack-basic) 참고

```js
// webpack.config.js asset-modules 예제
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 40 * 1024,
          },
        },
      },
    ],
  },
};
```

<br />

### 2. babel-loader와 core-js 버전3 호환

- `core-js` v2는 아래 예제로 제대로 빌드가 진행된다.

```js
// webpack.config.js babel-loader + core-js v2 예제
module.exports = {
  // ...
  module: {
    rules: [
      // ... css-loader
      // ... asset
      {
        test: /\.js$/,
        exclude: /node_modules/, // 바벨 로더가 처리하지 않는 폴더 설정
        loader: "babel-loader", // 바벨 로더를 추가한다
      },
    ],
  },
  plugins: [
    // ...
  ],
```

- 하지만 core-js v3가 설치된 경우에는 위 예제는 제대로 작동하지 않고 아래 예제처럼 작성해야 동작한다. 자세한 내용은 [바벨(Babel) - 기본편](https://github.com/ssi02014/front_development_environment/tree/master/babel) 참고

```js
// webpack.config.js babel-loader + core-js v3 예제
module.exports = {
  // ...
  module: {
    rules: [
      // ... css-loader
      // ... asset
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // 사용할 로더 이름
          options: { // 로더 옵션
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  plugins: [
    // ...
  ],
```

<br />

### 3. Babel async/await 문법 적용

- 바벨 적용 시에 async/await 문법 오류를 해결하려면 `@babel/plugin-transform-runtime`을 설치하고 셋팅해주면 해결할 수 있다.
- 기존에는 `@babel/polyfill`을 설치하거나 `regenerator-runtime`을 설치해서 해결했지만 `babel 7.4.0`부터 @babel/polyfill이 deprecated되면서 @babel/plugin-transform-runtime 을 설치하고 해결해야 한다.

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      // ... css-loader
      // ... asset
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-runtime"
            ],
          },
        },
      },
    ],
  },
  plugins: [
    // ...
  ],
```

<br />
