# ๐ป ํ๋ก ํธ์๋ ๊ฐ๋ฐํ๊ฒฝ์ ์ดํด(webpack, babel, eslint, prettier)

<br />

## โ README ์ ๋ฆฌ

- [NPM](https://github.com/ssi02014/front_development_environment/tree/master/npm)
- [์นํฉ(Webpack) - ๊ธฐ๋ณธํธ](https://github.com/ssi02014/front_development_environment/tree/master/webpack-basic)
  - Loader
    1. css-loader
    2. style-loader
    3. file-loader (webpack5 ์ดํ assets๋ก ๋์ฒด)
    4. url-loader (webpack5 ์ดํ assets๋ก ๋์ฒด)
    5. asset-modules
       <br />
  - Plugin
    1. BannerPlugin
    2. DefinePlugin
    3. EnvironmentPlugin
    4. HtmlTemplatePlugin
    5. CleanWebpackPlugin
    6. MiniCssExtractPlugin
- [์นํฉ(Webpack) - ์ฌํํธ](https://github.com/ssi02014/front_development_environment/tree/master/webpack-deep)
  - webpack-dev-server
  - HMR
- [๋ฐ๋ฒจ(Babel)](https://github.com/ssi02014/front_development_environment/tree/master/babel)
- [ESlint, Prettier](https://github.com/ssi02014/front_development_environment/tree/master/eslint-prettier)

<br />

## ๐ React v18 + webpack v5 + babel + eslint + prettier ์ค์ต ์ ์ฅ์

- [React v18 + webpack v5 + babel + eslint + prettier ๋ณด์ผ๋ฌ ํ๋ ์ดํธ](https://github.com/ssi02014/React_Init_Boilerplate)

<br />

## ๐ ์ฐธ๊ณ  ์ฌ์ดํธ

- [๐ ๊น์ ํ๋ ๋ธ๋ก๊ทธ](https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html)

<br />

## ๐ ํด๋ ์ฐธ๊ณ  ์ฌํญ

1. `lecture-example`: ๊ฐ์ ์ค์ต
2. `sample`: ๊ฐ ํด๋ README์ ์์ฑ๋ ์์ 
3. `npm`: npm ๊ด๋ จ README ์ ๋ฆฌ
4. `webpack-basic`: webpack ๊ธฐ๋ณธํธ README ์ ๋ฆฌ
5. `webpack-deep`: webpack ์ฌํํธ README ์ ๋ฆฌ
6. `babel`: babel README ์ ๋ฆฌ
7. `eslint-prettier`: eslint, prettier README ์ ๋ฆฌ
8. `server`: ํ์คํธ์ฉ node server ํด๋

<br />

## ๐ Webpack, Babel ๋ฒ์  ๊ด๋ จ ์ฐธ๊ณ  ์ฌํญ

### 1. asset-modules

- [asset-modules webpack ๊ณต์ ์ฌ์ดํธ ์ฐธ๊ณ ](https://webpack.js.org/guides/asset-modules)
- webpack v5 ์ดํ๋ถํฐ๋ `file-loader`์ `url-loader`๋ ๊ธฐ๋ณธ ๋ชจ๋๋ก ์ฑํ๋๋ฉด์ ๋์ด์ ํธํ๋์ง ์๋๋ค.
- file-loader์ url-loader๋ ๊ฐ๊ฐ `asset/resource`, `asset/inline`๋ก ๋์ฒด๋์๋ค.
- asset/resource์ asset/inline์ ์กฐ๊ฑด ์ํ์๋ฐ๋ผ์ ์๋์ผ๋ก ์ ํํ๋ `asset`๋ ์๋ค.
- ์์ธํ ๋ด์ฉ์ [์นํฉ(Webpack) - ๊ธฐ๋ณธํธ](https://github.com/ssi02014/front_development_environment/tree/master/webpack-basic) ์ฐธ๊ณ 

```js
// webpack.config.js asset-modules ์์ 
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

### 2. babel-loader์ core-js ๋ฒ์ 3 ํธํ

- `core-js` v2๋ ์๋ ์์ ๋ก ์ ๋๋ก ๋น๋๊ฐ ์งํ๋๋ค.

```js
// webpack.config.js babel-loader + core-js v2 ์์ 
module.exports = {
  // ...
  module: {
    rules: [
      // ... css-loader
      // ... asset
      {
        test: /\.js$/,
        exclude: /node_modules/, // ๋ฐ๋ฒจ ๋ก๋๊ฐ ์ฒ๋ฆฌํ์ง ์๋ ํด๋ ์ค์ 
        loader: "babel-loader", // ๋ฐ๋ฒจ ๋ก๋๋ฅผ ์ถ๊ฐํ๋ค
      },
    ],
  },
  plugins: [
    // ...
  ],
```

- ํ์ง๋ง core-js v3๊ฐ ์ค์น๋ ๊ฒฝ์ฐ์๋ ์ ์์ ๋ ์ ๋๋ก ์๋ํ์ง ์๊ณ  ์๋ ์์ ์ฒ๋ผ ์์ฑํด์ผ ๋์ํ๋ค. ์์ธํ ๋ด์ฉ์ [๋ฐ๋ฒจ(Babel) - ๊ธฐ๋ณธํธ](https://github.com/ssi02014/front_development_environment/tree/master/babel) ์ฐธ๊ณ 

```js
// webpack.config.js babel-loader + core-js v3 ์์ 
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
          loader: "babel-loader", // ์ฌ์ฉํ  ๋ก๋ ์ด๋ฆ
          options: { // ๋ก๋ ์ต์
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

### 3. Babel async/await ๋ฌธ๋ฒ ์ ์ฉ

- ๋ฐ๋ฒจ ์ ์ฉ ์์ async/await ๋ฌธ๋ฒ ์ค๋ฅ๋ฅผ ํด๊ฒฐํ๋ ค๋ฉด `@babel/plugin-transform-runtime`์ ์ค์นํ๊ณ  ์ํํด์ฃผ๋ฉด ํด๊ฒฐํ  ์ ์๋ค.
- ๊ธฐ์กด์๋ `@babel/polyfill`์ ์ค์นํ๊ฑฐ๋ `regenerator-runtime`์ ์ค์นํด์ ํด๊ฒฐํ์ง๋ง `babel 7.4.0`๋ถํฐ @babel/polyfill์ด deprecated๋๋ฉด์ @babel/plugin-transform-runtime ์ ์ค์นํ๊ณ  ํด๊ฒฐํด์ผ ํ๋ค.

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
