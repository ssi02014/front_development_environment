# ๐ป ESLint, Prettier

## ๐ ๋ชฉ์ฐจ

1. [ESLint์ ๋ฐฐ๊ฒฝ](#eslint-๋ฐฐ๊ฒฝ)
2. [๋ฆฐํธ(Lint)๊ฐ ํ์ํ ์ํฉ](#๋ฆฐํธ๊ฐ-ํ์ํ-์ํฉ)
3. [ESLint ๊ธฐ๋ณธ ๊ฐ๋](#๊ธฐ๋ณธ-๊ฐ๋)
4. [ESLint ์ค์น ๋ฐ ์ฌ์ฉ๋ฒ](#eslint-์ค์น-๋ฐ-์ฌ์ฉ๋ฒ)
5. [ESLint ๊ท์น](#๊ท์น)
6. [์๋์ผ๋ก ์์ ํ  ์ ์๋ ๊ท์น](#์๋์ผ๋ก-์์ ํ -์-์๋-๊ท์น)
7. [Extensible Config(recommended, airbnb, standard)](#extensible-config)
8. [ESLint ์ค์  ์ด๊ธฐํ --init](#์ด๊ธฐํ)
9. [ESLint ์ค์  eslint-webpack-plugin](#eslint-webpack-plugin)
10. [Prettier์ ๋ฐฐ๊ฒฝ](#prettier-๋ฐฐ๊ฒฝ)
11. [Prettier ์ค์น ๋ฐ ์ฌ์ฉ๋ฒ](#prettier-์ค์น-๋ฐ-์ฌ์ฉ๋ฒ)
12. [Prettier ํฌ๋งทํ](#ํฌ๋งทํ)
13. [ESLint Prettier ํตํฉ ๋ฐฉ๋ฒ - eslint-config-prettier](#eslint-config-prettier)
14. [ESLint Prettier ํตํฉ ๋ฐฉ๋ฒ - eslint-plugin-prettier](#eslint-plugin-prettier)
15. [eslint-plugin-prettier์ eslint-config-prettier ํตํฉ](#eslint-plugin-prettier์-eslint-config-prettier-ํตํฉ)
16. [.prettier ํ์ผ ์ ์ฉํ๊ธฐ](#prettier-ํ์ผ-์ ์ฉ)

<br />

## ๐ ESLint

### ESLint ๋ฐฐ๊ฒฝ

- ์ฝ๋์ ์ค๋ฅ๋ ๋ฒ๊ทธ, ์คํ์ผ์ ์ ๊ฒํ๋ ๊ฒ์ ๋ฆฐํธ(Lint) ํน์ ๋ฆฐํฐ(Linter)๋ผ๊ณ  ๋ถ๋ฅธ๋ค.

<br />

### ๋ฆฐํธ๊ฐ ํ์ํ ์ํฉ

- ์๋ ์ฝ๋๋ console.log๋ฅผ ์คํํ๊ณ  ๋ค์ ์ค์ ์ฆ์ ์คํํจ์๋ฅผ ์คํํ๋ ค๋ ์ฝ๋์ด๋ค.

```js
console.log()(function () {})();
```

- ํ์ง๋ง ์ด ์ฝ๋๋ฅผ ๋ธ๋ผ์ฐ์ ์์ ์คํํด ๋ณด๋ฉด TypeError๊ฐ ๋ฐ์ํ๋ค. ๋ธ๋ผ์ฐ์  ์ฝ๋์ ์ธ๋ฏธ์ฝ๋ก ์ ์๋์ผ๋ก ๋ฃ๋ ๊ณผ์ (ASI)๋ฅผ ์ํํ๋๋ฐ, ์ด์ ๊ฐ์ ๊ฒฝ์ฐ๋ ์ฐ๋ฆฌ์ ์๋๋๋ก ํด์ํ์ง ๋ชปํ๊ณ  ๋ค๋ฅด๊ฒ ํด์ํ๋ค.
- ์ ์์ ๊ฐ ์ฐ๋ฆฌ์ ์๋์ ๋ค๋ฅด๊ฒ TypeError๊ฐ ๋ฐ์ํ๋ ์ด์ ๋ console.log()๊ฐ ๋ฐํํ๋ ๊ฐ์ด ํจ์๊ฐ ์๋๋ฐ ํจ์ ํธ์ถ์ ์๋ํ๊ธฐ ๋๋ฌธ์ ์๋ฌ๊ฐ ๋ฐ์ํ๋ ๊ฒ์ด๋ค.
- ๋ชจ๋  ๋ฌธ์ฅ์ ์ธ๋ฏธ์ฝ๋ก ์ ๋ถ์๋ค๋ฉด, ํน์ ์ฆ์ ์คํ ํจ์ ์์ ์ธ๋ฏธ ์ฝ๋ก ์ ๋ถ์๋ค๋ฉด ์๋ฐฉํ  ์ ์๋ ๋ฒ๊ทธ์ด๋ค.
- ๋ฆฐํธ๋ ์ฝ๋์ ๊ฐ๋์ฑ์ ๋์ด๋ ๊ฒ ๋ฟ๋ง ์๋๋ผ ๋์  ์ธ์ด์ ํน์ฑ์ธ ๋ฐํ์ ๋ฒ๊ทธ๋ฅผ ์๋ฐฉํ๋ ์ญํ ๋ ํ๋ค.

<br />

## ๐ ESLint ๊ฐ๋

### ๊ธฐ๋ณธ ๊ฐ๋

- ESLint๋ ECMAScript ์ฝ๋์์ ๋ฌธ์ ์ ์ ๊ฒ์ฌํ๊ณ  ์ผ๋ถ๋ ๋ ๋์ ์ฝ๋๋ก ์ ์ ํ๋ ๋ฆฐํธ ๋๊ตฌ ์ค ํ๋์ด๋ค.(ํ์ฌ๋ ESLint๋ฅผ ๊ฐ์ฅ ๋ง์ด ์ฌ์ฉํ๋ค.)
- ESLint๋ ์ฝ๋์ ๊ฐ๋์ฑ์ ๋์ด๊ณ  ์ ์ฌ์ ์ธ ์ค๋ฅ์ ๋ฒ๊ทธ๋ฅผ ์ ๊ฑฐํด ๋จ๋จํ ์ฝ๋๋ฅผ ๋ง๋๋ ๊ฒ์ด ๋ชฉ์ ์ด๋ค. ๊ณผ๊ฑฐ JSLint, JSHint ๋ฑ๋ ์์์ง๋ง ์์ฆ์๋ ์์ฃผ ์ฌ์ฉํ์ง๋ ์๋๋ค.
- ์ฝ๋์์ ๊ฒ์ฌํ๋ ํญ๋ชฉ์ ํฌ๊ฒ ๋ถ๋ฅํ๋ฉด 2๊ฐ์ง์ด๋ค.
  1. ํฌ๋งทํ
  2. ์ฝ๋ ํ์ง
- `ํฌ๋งทํ`์ ์ผ๊ด๋ ์ฝ๋ ์คํ์ผ์ ์ ์งํ๋๋ก ํ๊ณ  ๊ฐ๋ฐ์๋ก ํ์ฌ๊ธ ์ฝ๊ฒ ์ฝํ๋ ์ฝ๋๋ฅผ ๋ง๋ค์ด ์ค๋ค. ์ด๋ฅผ ํ๋ฉด `๋ค๋ ค์ฐ๊ธฐ ๊ท์น`, `์ฝ๋ ๋ผ์ธ`์ ์ต๋ ๋๋น ๊ท์น์ ๋ฐ๋ฅด๋ ์ฝ๋๊ฐ ๊ฐ๋์ฑ์ด ๋ ์ข๋ค.
- `์ฝ๋ ํ์ง`์ ์ดํ๋ฆฌ์ผ์ด์์ `์ ์ฌ์ ์ธ ์ค๋ฅ๋ ๋ฒ๊ทธ๋ฅผ ์๋ฐฉ`ํ๊ธฐ ์ํจ์ด๋ค. ์ฌ์ฉํ์ง ์๋ ๋ณ์ ์ฐ์ง ์๊ธฐ, ๊ธ๋ก๋ฒ ์ค์ฝํ ํจ๋ถ๋ก ๋ค๋ฃจ์ง ์๊ธฐ ๋ฑ์ด ์ค๋ฅ ๋ฐ์ ํ๋ฅ ์ ์ค์ฌ ์ค๋ค.

<br />

### ESLint ์ค์น ๋ฐ ์ฌ์ฉ๋ฒ

- ์ฐ์  ๋ธ๋ ํจํค์ง(npm or yarn)์ผ๋ก ESLint๋ฅผ ์ค์นํ๋ค.

```
์ค์น
yarn add -D eslint
```

- ์ค์น ํ ํ๊ฒฐ์ค์  ํ์ผ์ ํ๋ก์ ํธ ์ต์๋จ์ ์์ฑํ๋ค.

```js
// .eslintrc.js
module.exports = {};
```

- ๋น ๊ฐ์ฒด๋ก ์๋ฌด๋ฐ ์ค์  ์์ด ๋ชจ๋๋ง ๋ง๋ค์๋ค. ์ด๋ ESLint๋ก ์ฝ๋๋ฅผ ๊ฒ์ฌํด๋ณด์.

```
์คํ
npm eslint app.js
```

- ์๋ฌด๋ฐ ๊ฒฐ๊ณผ๋ฅผ ์ถ๋ ฅํ์ง ์๊ณ  ํ๋ก๊ทธ๋จ์ ์ข๋ฃ๋๋ค.

<br />

## ๐ ESLint ๊ท์น

### ๊ท์น(Rules)

- ESLint๋ ๊ฒ์ฌ ๊ท์น์ ๋ฏธ๋ฆฌ ์ ํด ๋๋๋ค. [ESLint - Rules](https://eslint.org/docs/rules/) ๋ณด๋ฉด ๊ท์น ๋ชฉ๋ก์ ํ์ธํ  ์ ์๋ค.
- ์์์ ์์ฑํ๋ ์์ ์ ๊ด๋ จ๋ ๊ท์น์ `no-unexpected-multiline`์ด๋ค. ์ค์  ํ์ผ์ rules ๊ฐ์ฒด์ ์ด ๊ท์น์ ์ถ๊ฐํ๋ค.

```js
// .eslintrc.js
module.exports = {
  rules: {
    "no-unexpected-multiline": "error", // or 0
  },
};
```

- ๊ท์น์ ์ค์ ํ๋ ๊ฐ์ ์ธ ๊ฐ์ง๋ค. `off`๋ `0`์ ๋, `warn`์ด๋ `1`์ ๊ฒฝ๊ณ , `error`๋ `2`๋ ์ค๋ฅ์ด๋ค. ์ ์์ ์์๋ ์ค์ ํ ๊ท์น์ ์ด๊ธ๋๋ ์ฝ๋๋ฅผ ๋ฐ๊ฒฌํ๋ฉด ์ค๋ฅ๋ฅผ ์ถ๋ ฅํ๋๋ก ํ๋ค.

```
์คํ
npx eslint app.js

์๋ฌ ๋ฐ์
2:1 error  Unexpected newline between function and ( of function call  no-unexpected-multiline

โ 1 problem (1 error, 0 warnings)
```

- ESLint๋ฅผ ์คํํ๋ฉด ์๋ฌ๊ฐ ๋ฐ์ํ๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.

<br />

### ์๋์ผ๋ก ์์ ํ  ์ ์๋ ๊ท์น

- ์๋ฐ์คํฌ๋ฆฝํธ ๋ฌธ์ฅ ๋ค์ ์ธ๋ฏธ์ฝ๋ก ์ ์ฌ๋ฌ ๊ฐ ์ค๋ณต ์๋ ฅํด๋ ์ดํ๋ฆฌ์ผ์ด์์ ๋์ํ๋ค. ๊ทธ๋ฌ๋ ์ด๊ฒ์ ์ฝ๋๋ฅผ ์ฝ๊ธฐ ์ด๋ ต๊ฒ ํ๋ ์ฅ์ ๋ฌผ์ด๋ค.
- ์ด๋ฌํ ๋ฌธ์ ์ ๊ด๋ จ๋ ๊ท์น์ `no-extra-semi` ๊ท์น์ด๋ค.

```js
// app.js
console.log(); // ์ธ๋ฏธ์ฝ๋ก ์ ์ฐ์์ผ๋ก ๋ถ์
```

- ์ ์์ ์์ console.log ๋ค์์ ์ธ๋ฏธ์ฝ๋ก ์ด ์ฌ๋ฌ๊ฐ ์๋ค๊ณ  ๊ฐ์ ํด๋ณด์. ๊ทธ๋ฆฌ๊ณ  ESLint ์ค์ ์ `no-extra-semi` ๊ท์น์ ์ถ๊ฐํ๋ค.

```js
// .eslintrc.js
module.exports = {
  rules: {
    "no-unexpected-multiline": "error",
    "no-extra-semi": "error",
  },
};
```

- ์ด ์ํ๋ก ESLint๋ฅผ ํตํด ์ฝ๋๋ฅผ ๊ฒ์ฌํ๋ฉด ์ค๋ฅ๋ฅผ ์ถ๋ ฅํ๋ค.

```
npx eslint app.js
1:15  error  Unnecessary semicolon  no-extra-semi

โ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

- ๋ง์ง๋ง ์ค์ ์๋ฌ ๋ฉ์์ง๋ฅผ ๋ณด๋ฉด ์ด ์๋ฌ๋ `์ ์ฌ์ ์ผ๋ก ์์  ๊ฐ๋ฅ(potentially fixable)`์ด๋ผ๊ณ  ๋์์๋ค. ์ด๋ ์คํ ํ  ๋ `--fix` ์ต์์ ๋ถ์ฌ ๊ฒ์ฌํ๋ฉด ๊ฒ์ฌ ํ ์ค๋ฅ๊ฐ ๋ฐ์ํ ์ฝ๋๋ฅผ ์๋์ผ๋ก ์์ ํ๋ค.

```
์คํ --fix
npx eslint app.js --fix
```

- ESLint ๊ท์น์๋ ์์  ๊ฐ๋ฅํ ๊ฒ๊ณผ ๊ทธ๋ ์ง ๋ชปํ ๊ฒ์ด์๋ค. [ESLint - Rules](https://eslint.org/docs/rules/) ๋ชฉ๋ก์์ ์ผ์ชฝ์ `๋ ์น ๐ง `ํ์๊ฐ ๋ถ์ ๊ฒ์ด `--fix` ์ต์์ผ๋ก ์๋ ์์ ํ  ์ ์๋ ๊ท์น์ด๋ค.

<br />

### Extensible Config

- ์ด๋ฌํ ๊ท์น์ ํ๋ํ๋ ์ค์ ํ๋๊ฒ ์๋๊ณ  ๊ท์น ์ฌ๋ฌ๊ฐ๋ฅผ ๋ชจ์ ๋์ ๊ฒ์ด ์๋ค. ๊ทธ๊ฒ์ด `eslint:recommended` ์ค์ ์ด๋ค. [ESLint - Rules](https://eslint.org/docs/rules/) ์์ ์ผ์กฑ์ `์ฒดํฌโ`ํ์ ๋์ด ์๋ ๊ฒ์ด ์ด ์ค์ ์์ ํ์ฑํ๋์ด ์๋ ๊ท์น์ด๋ค.
- `eslint:recommended` ์ด๊ฒ์ ์ฌ์ฉํ๋ ค๋ฉด `extends`์ค์ ์ ์ถ๊ฐํด์ผ ํ๋ค.

```js
// .eslintrc.js
module.exports = {
  extends: [
    "eslint:recommended", // ๋ฏธ๋ฆฌ ์ค์ ๋ ๊ท์น ์ธํธ์ ์ฌ์ฉํ๋ค
  ],
};
```

- `eslint:recommended` ์ธ์๋ ๊ท์น์ด ๋ ํ์ํ๋ค๋ฉด `rules`์์ฑ์ ์ถ๊ฐํด์ ํ์ฅํ  ์ ์๋ค.
- ESLint์์ ๊ธฐ๋ณธ์ผ๋ก ์ ๊ณตํ๋ ์ค์  ์ธ์ ์์ฃผ ์ฌ์ฉํ๋ ๋ ๊ฐ์ง๊ฐ ์๋ค.
  1.  airbnb
  2.  standard
- `airbnb` ์ค์ ์ [airbnb ์คํ์ผ ๊ฐ์ด๋](https://github.com/airbnb/javascript)๋ฅผ ๋ฐ๋ฅด๋ ๊ท์น ๋ชจ์์ด๋ค.
- `standard` ์ค์ ์ [์๋ฐ์คํฌ๋ฆฝํธ ์คํ ๋ค๋ ์คํ์ผ](https://standardjs.com/)์ ์ฌ์ฉํ๋ค.

<br />

### ์ด๊ธฐํ

- ์ค์ ๋ก๋ ์ด๋ฌํ eslint ์ค์ ์ `--init` ์ต์์ ์ถ๊ฐํ๋ฉด ์์ฝ๊ฒ ๊ตฌ์ฑํ  ์ ์๋ค.

```
์คํ
npx eslint --init

โ How would you like to use ESLint? To check syntax and find problems
โ What type of modules does your project use? ยท JavaScript modules(import/export)
โ Which framework does your project use? ยท None of these
โ Does your project use TypeScript? ยท No
โ Where does your code run? ยท Browser
โ What format do you want your config file to be in? ยท JavaScript
```

- ๋ํ์ ๋ช๋ น์ด๋ก ์งํ๋๋๋ฐ ๋ชจ๋ ์์คํ์ ์ฌ์ฉํ๋์ง, ํ๋ ์์ํฌ ์ฌ์ฉํ๋์ง, ํ์์คํฌ๋ฆฝํธ๋ฅผ ์ฌ์ฉํ๋์ง, ์ดํ๋ฆฌ์ผ์ด์์ด ์ด๋ค ํ๊ฒฝ์์ ๋์ํ๋์ง ๋ฑ์ ๋ตํ๋ฉด ๋๋ค. ๋ต๋ณ์ ๋ฐ๋ผ .eslintrcํ์ผ์ ์๋์ผ๋ก ๋ง๋ค ์ ์๋ค.

<br />

- ์ถ๊ฐ์ ์ผ๋ก ์์์ฒ๋ผ ์ค์  ํ๋ฉด `.eslintrc.js`๊ฐ ๋ฎ์ด์์ฌ์ง๋๋ฐ `module not found` ์๋ฌ ๋ฌธ๊ตฌ๊ฐ ๋ณด์ฌ์ง๋ค. ์ด๋ .eslintrc.js์์ `env`๋ถ๋ถ์ `node: true`๋ฅผ ์ถ๊ฐํด์ฃผ๋ฉด ๋๋ค.

```js
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // ์ด ๋ถ๋ถ ์ถ๊ฐ
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
```

- ๊ทธ๋ฆฌ๊ณ  ์ถ๊ฐ์ ์ผ๋ก package.json์ lint ๋ช๋ น์ด๋ฅผ ์ถ๊ฐํด ์ฝ๊ฒ eslint๋ฅผ ์คํํ๋๋ก ํ์.

```json
{
  // ...
  "scripts": {
    // ...
    "lint": "eslint src --fix" // --fix๋ ์๋์ผ๋ก ์ฝ๋ ์์ ์์ผ์ฃผ๋ ์ต์
  }
}
```

<br />

### eslint webpack plugin

- webpack v5์์๋ง ์๋ํ๋ `eslint-webpack-plugin`์ด ์๋ค. ์ด ํ๋ฌ๊ทธ์ธ์ `eslint`๋ฅผ ์ฌ์ฉํ์ฌ javascript ์ฝ๋์ ๋ฌธ์ ๋ฅผ ์ฐพ๊ณ  ์์ ํ๋ค.
- ์นํฉ Eslint ๊ณต์ ํํ์ด์ง์์๋ loader๋ก ์ธํ eslint๋ ์ฌ์ฉํ์ง ๋ง๊ณ  plugin์ ํตํด ์ฌ์ฉํ๋ผ๊ณ  ๊ถํ๋ค.

```์ค์น
yarn add -D eslint-webpack-plugin
```

```js
// webpack.config.js
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  // ...
  plugins: [
    // ...
    new ESLintPlugin(options),
  ],
  // ...
};
```

<br />

## ๐ Prettier

### Prettier ๋ฐฐ๊ฒฝ

- Prettier(ํ๋ฆฌํฐ์ด)๋ ์ฝ๋๋ฅผ ๋ ์์๊ฒ ๋ง๋ ๋ค. ESLint์ ์ญํ  ์ค ํฌ๋งทํ๊ณผ ๊ฒน์น๋ ๋ถ๋ถ์ด ์์ง๋ง ํ๋ฆฌํฐ์ด๋ ์ข ๋ ์ผ๊ด์ ์ธ ์คํ์ผ ์ฝ๋๋ก ๋ค๋ฌ๋๋ค. ๋ฐ๋ฉด ์ฝ๋ ํ์ง๊ณผ ๊ด๋ จ๋ ๊ธฐ๋ฅ์ ํ์ง ์๋ ๊ฒ์ด ESLint์ ๋ค๋ฅธ ์ ์ด๋ค.

<br />

### Prettier ์ค์น ๋ฐ ์ฌ์ฉ๋ฒ

- ์ฐ์  Prettier ํจํค์ง๋ฅผ ์ค์นํ์.

```
์ค์น
yarn add -D prettier
```

- ๊ทธ๋ฆฌ๊ณ  ์๋์ฒ๋ผ ์ฝ๋๋ฅผ ์์ฑํด๋ณด์.

```js
console.log("hello world");
```

- Prettier๋ก ์คํํด๋ณด๋ฉด

```
์คํ
npx prettier app.js --write
```

```js
// app.js
console.log("Hello world");
```

- ๋ค์๊ณผ ๊ฐ์ด ์์ ๋ฐ์ดํ๊ฐ `ํฐ ๋ฐ์ดํ`๋ก ๋ณ๊ฒฝ๋๊ณ  ๋ค์ `์ธ๋ฏธ์ฝ๋ก (;)`๋ ์ถ๊ฐ๋์๋ค. ํ๋ฆฌํฐ์ด๋ ESLint์ ๋ฌ๋ฆฌ ๊ท์น์ด `๋ฏธ๋ฆฌ ์ธํ`๋์ด ์๊ธฐ ๋๋ฌธ์ ์ค์  ์์ด๋ ๋ฐ๋ก ์ฌ์ฉํ  ์ ์๋ค.

<br />

### ํฌ๋งทํ

```js
console.log(
  "----------------๋งค ์ฐ ๊ธด ๋ฌธ ์ฅ ์ ๋ ๋ค 80์๊ฐ ๋ ๋ ์ฝ ๋ ์ ๋ ๋ค.----------------"
);

foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne()
);
```

- ESLint๋ `max-len` ๊ท์น์ ์ด์ฉํด ์ ์ฝ๋๋ฅผ ๊ฒ์ฌํ๊ณ  ๊ฒฐ๊ณผ๋ง ์๋ ค ์ค ๋ฟ ์์ ํ๋ ๊ฒ์ ๊ฐ๋ฐ์์ ๋ชซ์ด๋ค.
- ๋ฐ๋ฉด Prettier๋ ์ด๋ป๊ฒ ์์ ํด์ผํ ์ง ์๊ณ  ์๊ธฐ ๋๋ฌธ์ ์๋์ฒ๋ผ ์ฝ๋๋ฅผ ๋ค์ ์์ฑํ๋ค.

```js
console.log(
  "----------------๋งค ์ฐ ๊ธด ๋ฌธ ์ฅ ์ ๋ ๋ค 80์๊ฐ ๋ ๋ ์ฝ ๋ ์ ๋ ๋ค.----------------"
);

foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne()
);
```

- ์ ์์ ๋ก ํ์ธํ  ์ ์๋ฏ์ด Prettier๋ ์ฝ๋๋ฅผ ๋ฌธ๋งฅ์ ์ด๋ ์ ๋ ํ์ํ๊ณ  ์ํฉ์ ๋ฐ๋ผ ์ต์ ์ ๋ชจ์ต์ผ๋ก ์คํ์ผ์ ์์ ํ๋ค.
- Prettier๊ฐ ํฌ๋งทํ ํ์ง์ ESLint๋ณด๋ค ํจ์ฌ ์ฌ๋์๊ฒ ์น์ํ๊ฒ ์ข์ ๊ฒฐ๊ณผ๋ฅผ ๋ง๋ ๋ค.

<br />

## ๐ ESLint Prettier ํตํฉ ๋ฐฉ๋ฒ

### eslint-plugin-prettier

- ํฌ๋งทํ์ Prettier์๊ฒ ๋งก๊ธฐ๋๋ผ๋ ์ฝ๋ ํ์ง๊ณผ ๊ด๋ จ๋ ๊ฒ์ฌ๋ ESLint์ ๋ชซ์ด๋ค. ๋ฐ๋ผ์, ์ด ๋์ ํจ๊ป ์ฌ์ฉํ๋ ๊ฒ์ด ์ต์ ์ด๋ค.
- Prettier๋ ์ด๋ฌํ ESLint์ ํตํฉ ๋ฐฉ๋ฒ์ ์ ๊ณตํ๋ค.
- `eslint-config-prettier`๋ ํ๋ฆฌํฐ์ด์ ์ถฉ๋ํ๋ ESLint ๊ท์น์ ๋๋ ์ญํ ์ ํ๋ค. ๋ ๋ค ์ฌ์ฉํ๋ ๊ฒฝ์ฐ ๊ท์น์ด ์ถฉ๋ํ๊ธฐ ๋๋ฌธ์ด๋ค.

```
์ค์น
yarn add -D eslint-config-prettier
```

- ํจํค์ง๋ฅผ ์ค์นํ ๋ค ์ค์  ํ์ผ์ extends ๋ฐฐ์ด์ ์ถ๊ฐํ๋ค.

```js
// .eslintrc.js
{
  extends: [
    "eslint:recommended",
    "eslint-config-prettier"
  ]
}
```

- ์๋ฅผ ๋ค์ด ESLint๋ ์ค๋ณต ์ธ๋ฏธ์ฝ๋ก  ์ฌ์ฉ์ ๊ฒ์ฌํ๋ค. ํ์ง๋ง ์ด๊ฒ์ Prettier๋ ๋ง์ฐฌ๊ฐ์ง๋ค. ๋ฐ๋ผ์ ์ด๋ ํ์ชฝ์์๋ ๊ท์น์ ๊บผ์ผํ๋๋ฐ eslint-config-prettier๋ฅผ ์ถ๊ฐํ๋ฉด ESLint ๊ท์น์ ๋นํ์ฑํ ํ๋ค.

```js
var foo = "";
console.log();
```

- ์์ ๊ฐ์ ์ฝ๋๋ฅผ prettier์ eslint๋ฅผ ๋์์ ์คํํ๋ฉด

```
์คํ
npx prettier app.js --write && npx eslint app.js --fix
```

```js
var foo = ""; // error  'foo' is assigned a value but never used  no-unused-vars
console.log();
```

- ์ ์์ ์ฒ๋ผ ํฌ๋งทํ๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค. ํ์ง๋ง ์์ง์ prettier์ eslint๋ฅผ ๋์์ ์คํํด์ผ๋๋ค๋ ์ ์ด ์๋นํ ๊ท์ฐฎ๋ค.

<br />

### eslint-plugin-prettier

- ๊ทธ๋์ ์ ๋์ ํ๋ฐฉ์ ์คํ์์ผ์ฃผ๋ `eslint-plugin-prettier`ํจํค์ง๊ฐ ์กด์ฌํ๋ค. ์ด ํจํค์ง๋ ํ๋ฆฌํฐ์ด ๊ท์น์ ESLint ๊ท์น์ผ๋ก ์ถ๊ฐํ๋ ํ๋ฌ๊ทธ์ธ์ด๋ค. ํ๋ฆฌํฐ์ด์ ๋ชจ๋  ๊ท์น์ด ESLint๋ก ๋ค์ด์ค๊ธฐ ๋๋ฌธ์ ESLint๋ง ์คํํ๋ฉด ๋๋ค.
- ํด๋น ํจํค์ง๋ฅผ ์ค์นํ๊ณ , ์ค์  ํ์ผ์์ `plugins`์ `rules`์ ์ค์ ์ ์ถ๊ฐํ๋ค.

```
yarn add -D eslint-plugin-prettier
```

```js
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "eslint-config-prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
```

- Prettier์ ๋ชจ๋  ๊ท์น์ ESLint ๊ท์น์ผ๋ก ๊ฐ์ ธ์จ ์ค์ ์ด๋ค. ์ด์ ๋ ESLint๋ง ์คํํด๋ Prettier ํฌ๋งทํ ๊ธฐ๋ฅ์ ๊ฐ์ ธ๊ฐ ์ ์๋ค.

```
์คํ
npx eslint app.js --fix
```

<br />

### eslint-plugin-prettier์ eslint-config-prettier ํตํฉ

- ํ๋ฆฌํฐ์ด๋ ์ด ๋ ํจํค์ง(`eslint-plugin-prettier`, `eslint-config-prettier`)๋ฅผ ํจ๊ป ์ฌ์ฉํ๋ ๋จ์ํ ์ค์ ์ ์ ๊ณตํ๋๋ฐ ์๋ ์ค์ ์ ์ถ๊ฐํ๋ฉด ๋๋ค.

```js
// .eslintrc.js
module.exports = {
  // ...
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  // ...
};
```

- ๋ ํจํค์ง๋ค ๋ชจ๋ ์ค์นํ ์ํ์์ ์ค์ ํ์ผ extends์ `plugin:prettier/recommended`์ ์ถ๊ฐํ๋ฉด ๋๋ค.

<br />

## ๐ .Prettier ํ์ผ ์ ์ฉ

- Prettier๋ฅผ ํ๋ก์ ํธ์ ์ ์ฉํ๋ ๋ฐฉ๋ฒ์ด ํฌ๊ฒ 3๊ฐ์ง๊ฐ ์๋ค.

  1. `.prettierrc` ์ค์  ํ์ผ ์ฌ์ฉ(์์ฃผ ์ฌ์ฉ)
  2. `VSCode` ์ ์ญ ์ค์  ํ์ผ ์ฌ์ฉ(์์ฃผ ์ฌ์ฉ)
  3. Prettier ํจํค์ง ์ค์น ํ CLI ์ฌ์ฉ(๊ฑฐ์ ์ฌ์ฉ ์ํจ)

- `.prettierrc ํ์ผ`๊ณผ `VSCode ์ ์ญ ์ค์  ํ์ผ ์ค์ `ํ๋ ๋ฐฉ๋ฒ์ ์์๋ณด์.

### prettier ํ์ผ ์ ์ฉ

- ์ฐ์  VSCode Extension Prettier ํ์ฅ ์ค์นํด์ผํ๋ค.

<img width="749" alt="แแณแแณแแตแซแแฃแบ 2022-05-07 แแฉแแฎ 9 57 13" src="https://user-images.githubusercontent.com/64779472/167255430-72b1093f-8d47-4058-85a5-417f56cd00b9.png">

<img width="749" alt="แแณแแณแแตแซแแฃแบ 2022-05-07 แแฉแแฎ 9 56 19" src="https://user-images.githubusercontent.com/64779472/167255406-7bcb91c1-391b-46a1-894f-4ae0b6352ec5.png">

- ๊ทธ๋ฆฌ๊ณ  ์์์ ์ธ๊ธํ๋ ESLint์์ Prettier์ ๊ฒน์น๋ ํฌ๋งทํ๋ฃฐ์ ์ ๊ฑฐํ๋ค.

```
yarn add -D eslint prettier eslint-config-prettier
```

- `eslint-plugin-prettier`๋ ํ์ฌ ์ถ์ฒ๋์ง ์๋๋ค๊ณ  ํ๋ค. ๊ทธ ์ด์ ๋
  1. prettier ์คํ๋ณด๋ค ๋ฆ๋ค
  2. ์๋ํฐ ์์์ ๋นจ๊ฐ ์ค๋ฌด๋ฌ๊ฐ ๋ง์ด ๋ํ๋์ ๋ฒ๊ฑฐ๋กญ๋ค (eslint์ ์ํด ์๊ธฐ๋ ์ค๋ฌด๋ฌ๋ค์ด๋ค. ์ ํํ๋ eslint๋ก์ ์ฌ์ฉ๋๋ prettier)
  3. ํ๋ฌ๊ทธ์ธ์ด๋ผ๋ ๋ถํ์ํ ์ธต์ด ์์ด์ ๋ฌธ์ ๊ฐ ๋ฐ์ํ  ์ ์๋ค

<br />

- prettier๋ ๊ธฐ๋ณธ์ ์ผ๋ก ํ๋ก์ ํธ์ root์ ์๋ `.prettierrc` ํ์ผ์ ์ ํ ๋ฃฐ์ ์ํด์ ๋์ํ๋ค. ํ๋ก์ ํธ์ ์ด ํ์ผ์ด ์์ผ๋ฉด `๊ธฐ๋ณธ๊ฐ`์ผ๋ก ์ธํ๋๋ค.

```json
// .prettierrc
{
  "arrowParens": "avoid", // ํ์ดํ ํจ์ ๊ดํธ ์ฌ์ฉ ๋ฐฉ์
  "bracketSpacing": false, // ๊ฐ์ฒด ๋ฆฌํฐ๋ด์์ ๊ดํธ์ ๊ณต๋ฐฑ ์ฝ์ ์ฌ๋ถ
  "endOfLine": "auto", // EoF ๋ฐฉ์, OS๋ณ๋ก ์ฒ๋ฆฌ ๋ฐฉ์์ด ๋ค๋ฆ
  "htmlWhitespaceSensitivity": "css", // HTML ๊ณต๋ฐฑ ๊ฐ๋ ์ค์ 
  "jsxBracketSameLine": false, // JSX์ ๋ง์ง๋ง `>`๋ฅผ ๋ค์ ์ค๋ก ๋ด๋ฆด์ง ์ฌ๋ถ
  "jsxSingleQuote": false, // JSX์ singe ์ฟผํ์ด์ ์ฌ์ฉ ์ฌ๋ถ
  "printWidth": 80, //  ์ค ๋ฐ๊ฟ ํ  ํญ ๊ธธ์ด
  "proseWrap": "preserve", // markdown ํ์คํธ์ ์ค๋ฐ๊ฟ ๋ฐฉ์ (v1.8.2)
  "quoteProps": "as-needed" // ๊ฐ์ฒด ์์ฑ์ ์ฟผํ์ด์ ์ ์ฉ ๋ฐฉ์
  "semi": true, // ์ธ๋ฏธ์ฝ๋ก  ์ฌ์ฉ ์ฌ๋ถ
  "singleQuote": true, // single ์ฟผํ์ด์ ์ฌ์ฉ ์ฌ๋ถ
  "tabWidth": 2, // ํญ ๋๋น
  "trailingComma": "all", // ์ฌ๋ฌ ์ค์ ์ฌ์ฉํ  ๋, ํํ ์ฝค๋ง ์ฌ์ฉ ๋ฐฉ์
  "useTabs": false, // ํญ ์ฌ์ฉ ์ฌ๋ถ
  "vueIndentScriptAndStyle": true, // Vue ํ์ผ์ script์ style ํ๊ทธ์ ๋ค์ฌ์ฐ๊ธฐ ์ฌ๋ถ (v1.19.0)
  "parser": '', // ์ฌ์ฉํ  parser๋ฅผ ์ง์ , ์๋์ผ๋ก ์ง์ ๋จ
  "filepath": '', // parser๋ฅผ ์ ์ถํ  ์ ์๋ ํ์ผ์ ์ง์ 
  "rangeStart": 0, // ํฌ๋งทํ์ ๋ถ๋ถ ์ ์ฉํ  ํ์ผ์ ์์ ๋ผ์ธ ์ง์ 
  "rangeEnd": Infinity, // ํฌ๋งทํ ๋ถ๋ถ ์ ์ฉํ  ํ์ผ์ ๋ ๋ผ์ธ ์ง์ ,
  "requirePragma": false, // ํ์ผ ์๋จ์ ๋ฏธ๋ฆฌ ์ ์๋ ์ฃผ์์ ์์ฑํ๊ณ  Pragma๋ก ํฌ๋งทํ ์ฌ์ฉ ์ฌ๋ถ ์ง์  (v1.8.0)
  "insertPragma": false, // ๋ฏธ๋ฆฌ ์ ์๋ @format marker์ ์ฌ์ฉ ์ฌ๋ถ (v1.8.0)
  "overrides": [
    {
      "files": "*.json",
      "options": {
        "printWidth": 200
      }
    }
  ], // ํน์  ํ์ผ๋ณ๋ก ์ต์์ ๋ค๋ฅด๊ฒ ์ง์ ํจ, ESLint ๋ฐฉ์ ์ฌ์ฉ
}
```

- ํ์ง๋ง ๋ฐ๋ก ํ์ํ ๋ถ๋ถ๋ง ์ค์ ํด๋ณด์.

```json
// .prettierrc
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "arrowParens": "avoid",
  "endOfLine": "auto"
}
```

<br />

```js
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
```

- ์์ ๊ฐ์ด `.prettierrc`์ `.eslintrc.js`๋ฅผ ์์  ํ์ vscode์ ์ ์ฉ๋  ์ ์๊ฒ setting.json ํ์ผ์ ์์ ํ๋ฉด ๋๋ค.

```json
// vscode/setting.json
{
  //...
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true
}
```

<br />
