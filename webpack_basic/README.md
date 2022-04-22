# 💻 웹팩(Webpack) - 기본편

## 📄 목차

1. [웹팩이 필요한 이유 - 배경](#배경)
2. [IIFE 방식의 모듈](#IIFE-방식의-모듈)
3. [다양한 모듈 스펙](#다양한-모듈-스펙)
4. [브라우저의 모듈 지원](#브라우저의-모듈-지원)
5. [엔트리/아웃풋 실습](#엔트리-아웃풋-실습)
6. [webpack.config.js](#webpack-config-js)
7. [로더의 역할](#로더의-역할)
8. [커스텀 로더 만들기](#커스텀-로더-만들기)
9. [자주 사용하는 로더 - (css-loader)](#css-loader)
10. [자주 사용하는 로더 - (style-loader)](#style-loader)
11. [자주 사용하는 로더 - (file-loader[이제 안씀])](#file-loader)
12. [자주 사용하는 로더 - (url-loader[이제 안씀])](#url-loader)
13. [자주 사용하는 로더 - (asset-modules)](#asset-modules)

<br />

## 📝 웹팩이 필요한 이유와 기본 동작

### 배경

- 모듈에 대해서 이야기 해보면, 문법 수준에서 모듈을 지원하기 시작한 것은 ES2015부터다. import/export 구문이 없었던 모듈 이전 상황을 살펴보는 것이 웹팩 등장 배경을 설명하는데 수월하다.
- 예제를 보자

```js
// math.js
function sum(a, b) {
  return a + b;
}
// app.js
console.log(sum(1, 2));
```

```html
<html>
  <!-- ... -->
  <body>
    <script src="src/math.js"></script>
    <script src="src/app.js"></script>
  </body>
</html>
```

- 위 코드는 모두 하나의 HTML 파일안에서 로딩해야만 실행된다. math.js가 로딩되면 app.js는 이름 공간에서 `sum`을 찾은 뒤 함수를 실행한다.

```js
console.log(window.sum);
/* 
  f sum(a, b) {
    return a + b
  }
*/

sum = 1;
sum(1, 2); // ~~~~ sum is not a function
```

- 이때 문제는 `sum`이 전역 공간에 노출된다는 것이다. 다른 파일에서도 `sum`이란 이름을 사용하면 충돌한다.
- 즉, 전역 스코프가 오염된다는 치명적인 단점이 있다.

<br />

### IIFE 방식의 모듈

- IIFE(Immediately Invoked Function Expression): 즉시 실행 함수은 정의되자마자 즉시 실행되는 함수이다.
- 위와 같은 문제를 예방하기 위해 스코프를 사용한다.
- 함수 스코프를 만들어 외부에서 안으로 접근하지 못하도록 공간을 격리하는 것이다. 스코프 안에서는 자신만의 이름 공간이 존재하므로 스코프 외부와 이름 충돌을 막을 수 있다.

```js
// math.js

let math = math || {};

(function () {
  function sum(a, b) {
    return a + b;
  }
  math.sum = sum;
})();

// app.js
console.log(math.sum(1, 2));
```

- 위와 같이 작성하면 전역 스코프에 sum이라는 메서드가 없고 math.js에서 math라는 전역 변수에 sum을 할당했기 때문에 math.sum으로 접근해야 한다.
- 이럴 경우에는 전역 스코프가 오염되지 않는다.

<br />

### 다양한 모듈 스펙

- 위와 같은 `IIFE` 방식으로 자바스크립트 모듈을 구현하는 대표적인 명세가 `AMD`와 `CommonJs`다.
- `CommonJs`는 자바스크립트를 사용하는 모든 환경에서 모듈을 하는 것이 목표다. exports 키워드로 모듈을 만들고 require()함수로 불러 들이는 방식이다. 대표적으로 `Node.js`에서 이를 사용한다.

```js
//math.js
exports function sum(a, b) { return a + b}

//app.js
const sum = require('./math.js');
sum(1, 2); // 3
```

- `AMD(Asynchronous Module Definition)`는 비동기로 로딩되는 환경에서 모듈을 사용하는 것이 목표다 주로 브라우저 환경이다.
- `UMD(Universal Module Definition)`는 AMD기반으로 CommonJS 방식까지 지원하는 통합 형태다.
- 이렇게 각 커뮤니티에서 각자의 모듈 시스템을 내놓았다. 지금은 바벨과 웹팩을 이용해 모듈 시스템을 사용하는 것이 일반적이다. ES2015 모듈 시스템의 모습을 살펴보자.

```js
// math.js
export function sum(a, b) {
  return a + b;
}

// app.js
import * as math from "./math.js";
math.sum(1, 2);
```

### 브라우저의 모듈 지원

- 모든 브라우저에서 모듈 시스템을 지원하지는 않는다. (특히 인터넷 익스플로러 등과 같은 몇몇 브라우저) 우선은 가장 많이 사용하는 크롬 예제로만 살펴보자(크롬도 버전61부터 모듈 시스템을 지원한다.)

```html
<body>
  <script type="module" src="src/app.js"></script>
</body>
```

- script 태그로 로딩할 때 `type="module"`을 사용한다. app.js는 모듈을 사용할 수 있다.

<br />

## 📝 엔트리/아웃풋

### 엔트리 아웃풋 실습

- 번들 작업을 하는 `webpack`, 웹팩을 터미널 명령어로 사용할 수 있는 `webpack-cli` 설치
- `-D` 키워드를 이용해 개발용 패키지로 설치

```
  yarn add -D webpack webpack-cli
```

- `--help` 옵션을 통해서 사용방법을 확인할 수 있다.

```
$ node_modules/.bin/webpack --help

  --mode  [선택: "development", "production", "none"]
  --entry  The entry point(s) of the compilation. [문자열]
  --name, -o The output path and file for compilation assets
```

- 주요 옵션으로 `--mode`, `--entry`, `--output-path 또는 -o`이 있는데 이 세 개 옵션만 사용하면 코드를 묶을 수 있다.
- 아래 예제가 번들링하는 터미널 명령어이다.

```
$ node_modules/.bin/webpack --mode development --entry ./src/app.js --output-path ./dist
```

- `--mode`는 웹팩 실행모드를 의미하는데 개발 버전인 `development`를 지정한다 (운영 모드는 `production`)
- `--entry`는 프로젝트 빌드를 위한 엔트리 포인트(시작점 경로) 파일명 또는 명명된 파일명 모음을 지정하는 옵션이다.
- `--output-path`는 webpack에 의해 생성된 파일의 출력 위치입니다.(파일 이름은 기본적으로 main.js)

<br />

### webpack config js

- 웹팩 설정파일의 경로를 지정할 수 있는데 기본 파일명이 `webpack.config.js`다. `webpack.config.js` 파일을 만들어 옵션을 코드로 구성해 보자.

```js
// webpack.config.js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
};
```

- `mode`는 development 문자열을 사용했다.
- `entry`는 어플리케이션 진입점인 src/app.js로 설정했다.
- `output`에 설정한 `[name]`은 entry에 설정한 key 즉, `main`이 들어간다. 이렇게 설정한 이유는 만약 entry가 여러 개일 경우 output도 여러 개여야 하는데 이때 output이름을 `동적`으로 만들 수 있다.
  - 추가적으로, output.path는 `절대 경로`를 사용하기 때문에 node의 `path`모듈의 `resolve()` 함수를 사용해서 계산 했다.

<br />

## 📝 로더(Loader)

### 로더의 역할

- 웹팩은 모든 파일을 `모듈`로 바라본다. 자바스크립트로 만든 모듈 뿐만아니라 스타일시트, 이미지, 폰트까지 전부 모듈로 보기 때문에 import 구문을 사용하여 자바스크립트 코드 안으로 가져올 수 있다.
- 이러한 것들이 가능한 이유는 웹팩의 `로더` 덕분이다. 로더는 타입스크립트 같은 다른 언어를 자바스크립트 문법으로 변환해 주거나 이미지를 data URL 형식의 문자열로 변환한다. 뿐만 아니라 css 파일을 자바스크립트에서 직접 로딩할 수 있도록 해준다.

<br />

### 커스텀 로더 만들기

- 로더를 사용하기 전에 동작 원리를 이해하기 위해 직접 로더를 만들어보자.

```js
// my-webpack-loader.js
module.exports = function myWebpackLoader(content) {
  console.log("myloader가 동작함");
  return content;
};
```

- 함수로 만들 수 있는데 로더가 읽은 파일의 내용이 함수 인자 `content`로 전달된다. 위에 설정한 코드를 설명하자면 단순히 로더가 동작하는지 확인하는 용도로 로그만 찍고 곧장 content를 반환한다.
- 작성한 로더를 사용하려면 webpack.config.js의 `module` 객체에 추가한다.

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [path.resolve("./my-webpack-loader.js")],
      },
    ],
  },
};
```

- `module.rules` 배열에 모듈을 추가하는데 test와 use로 구성된 객체를 전달한다.
- `test`에는 로딩에 적용할 파일을 지정한다. 파일명 뿐만아니라 파일 패턴을 정규표현식으로 지정할 수 있는데. `test: '\.js$/` 코드는 .js확장자를 갖는 모든 파일을 처리하겠다는 뜻이다.
- `use`에는 test에 작성한 패턴에 해당하는 파일에 적용할 로더를 설정하는 부분이다. 만약 적용되는 파일이 많으면 그만큼 로더도 반복 실행된다.
- yarn build를 해보면 빌드 결과는 동일하고 터미널에 콘솔이 찍히는 것을 확인할 수 있다.

<br />

## 📝 자주 사용하는 로더

### css loader

- 위에서 언급했지만 웹팩은 모든 것을 모듈로 바라보기 때문에 자바스크립트 뿐만 아니라 `스타일 시트(stylesheet)`도 import 구문으로 불러올 수도 있다.

<br />

```js
// app.js
import "./app.css";
```

```css
/* app.css */
body {
  background-color: green;
}
```

<br />

- css 파일을 자바스클비트에서 불러와 사용하려면 css 모듈로 변환하는 작업이 필요하다. `css-loader`가 그러한 역할을 한다.

<br />

```
$npm install -D css-loader
```

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
    ],
  },
};
```

<br />

- use.loader에 로더 경로를 설정하는 대신 배열에 로더 이름을 문자열로 전달해도 된다.
- 위에 처럼 css-loader를 설치하고 webpack.config.js를 수정 후 빌드하면 css코드가 자바스크립트로 변환된 것을 확인할 수 있다.

<br />

### style loader

- 모듈로 변경된 스타일 시트는 돔에 추가되어야만 브라우저가 해석할 수 있다. css-loader로 처리하면 자바스크립트 코드로만 변경되었을 뿐 돔에 적용되지 않았기 때문에 스타일이 적용되지 않는다.
- `style-loader`는 자바스크립트로 변경된 스타일을 동적으로 돔에 추가하는 로더이다. css를 번들링하기 위해서는 `css-loader`와 `style-loader`를 함께 사용한다.

```
$ npm install -D style-loader
```

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

- 참고로 배열로 설정하면 `뒤에서부터 앞으로 순서대로 로더가 동작`한다. 즉, 위 설정은 모든 .css 확장자로 끝나는 모듈을 읽어 들여 (1) css-loader를 적용하고, 그 다음 (2) style.loader를 적용한다. (순서 고려)

<br />

### file loader

<h3 style="color:red">(주의) webpack v5 이후부터 사용하지 않음! 하단의 asset/module로 대체</h3>
- css뿐만 아니라 `소스 코드에서 사용하는 모든 파일`을 모듈로 사용하게끔 할 수 있다. 파일을 모듈 형태로 지원하고 웹팩 아웃풋에 파일을 옮겨주는 것이 file-loader의 역할이다.
- 가령 css에서 `url()`함수에 이미지 파일 경로를 지정할 수 있는데 웹팩은 file-loader를 이용해서 이 파일을 처리한다.

```css
/* app.css */
body {
  background-image: url(bg.png);
}
```

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png$/,
        use: ["file-loader"],
      },
    ],
  },
};
```

- 웹팩은 엔트리 포인트인 app.js가 로딩하는 style.css를 읽는다. 그리고 이 스타일시트는 `url()` 함수로 `bg.png`를 사용하는데 이때 로더를 동작시킨다.
- 웹팩이 .png 파일을 발견하면 `file-loader`를 실행할 것이다. 로더가 동작하고 나면 아웃풋에 설정한 경로로 이미지 파일을 복사된다.
- 그런데 이때 파일명이 `해쉬코드`로 변경된다.(5c6d3b633991b51295c68b34d8b94c8b.png) 캐쉬 갱신을 위한 처리로 보인다.
- 하지만 이대로 index.html 파일을 브라우저에 로딩하면 이미지를 제대로 로딩하지 못한다. 당연하지만 css를 로딩하면 url(bg.png) 코드에 의해 동일 폴더에서 해당 이름의 파일을 찾으려고 시도할 것이다. 그러나 웹팩으로 빌드한 이미지는 dist 폴더 아래로 이동했기 때문에 이미지 로딩에 실패를 한 것이다.

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png$/, // .png 확장자로 마치는 모든 파일
        loader: "file-loader",
        options: {
          publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
          name: "[name].[ext]?[hash]", // 파일명 형식
        },
      },
    ],
  },
};
```

- filer-loader의 옵션을 조정해서 경로를 바로 잡아주었다.
- `publicPath` 옵션은 file-loader가 처리하는 파일을 모듈로 사용할 때 경로 앞에 추가되는 문자열이다. `output`에 설정한 `dist` 폴더에 이미지 파일을 옮길 것이므로 publicPath 값을 이것으로로 지정했다. 파일을 사용하는 측에서는 'bg.png'를 'dist/bg.png'로 변경하여 사용할 것이다.
- `name` 옵션을 사용했는데 이것은 로더가 파일을 `output`에 복사할때 사용하는 파일 이름이다.

<br />

### url loader

<h3 style="color:red">(주의) webpack v5 이후부터 사용하지 않음! 하단의 asset/module로 대체</h3>
- 사용하는 이미지 갯수가 많다면 네트웍 리소스를 사용하는 부담이 있고 사이트 성능에 영향을 줄 수도 있다. 만약 한 페이지에서 작은 이미지를 여러 개 사용한다면 `Data URI Scheme`을 이용하는 방법이 더 나은 경우도 있다. 이미지를 `Base64`로 인코딩하여 문자열 형태로 소스코드에 넣는 형식이다.

```
$ npm install -D url-loader
```

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.png$/,
        use: {
          loader: "url-loader", // url 로더를 설정한다
          options: {
            publicPath: "./dist/", // file-loader와 동일
            name: "[name].[ext]?[hash]", // file-loader와 동일
            limit: 5000, // 5kb 미만 파일만 data url로 처리
          },
        },
      },
    ],
  },
};
```

- file-loader와 옵션 설정이 거의 비슷하고 마지막 `limit` 속성만 추가했다. 모듈로 사용한 파일중 크기가 `5kb` 미만인 파일만 `url-loader`를 적용하는 설정이다. 만약 이보다 크면 `file-loader`가 처리하는데 옵션 중 `fallback` 기본값이 `file-loader`이기 때문이다.

<br />

## 📝 최신 사용 로더(asset-modules)

### asset modules

- [asset-modules webpack 공식 사이트 참고](https://webpack.js.org/guides/asset-modules)
- [asset-modules 참고 블로그](https://tecoble.techcourse.co.kr/post/2021-08-30-webpack-asset-modules/)
- webpack v5 이후부터는 file-loader, url-loader는 webpack의 기본 모듈로 채택되면서 더 이상 호환되지 않는다.
- 대신 `asset-modules`를 사용한다고 한다. 아래 예제는 asset modules중에서 resource(file-loader역할)과 inline(url-loader)을 자동으로 선택하게 해주는 asset이다.

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
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

### asset resource

- asset/resource 모듈은 별도의 파일로 내보내고 URL을 추출한다. 다시 말해서 빌드 후 asset 파일을 출력 디렉터리로 내보내고, 해당 경로를 번들에 추가한다. `(webpack 5 이전에는 file-loader가 해당 역할을 했다)`

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(png|jpg)/,
        type: "asset/resource",
      },
    ],
  },
};
```

<br />

### asset inline

- asset/inline 모듈은 asset의 data URI를 내보낸다. 즉, 파일이 data URI 형식(Base64)으로 번들에 삽입된다. `(webpack 5 이전에는 url-loader가 해당 역할을 했다)`

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.svg/,
        type: "asset/inline",
      },
    ],
  },
};
```

<br />

### asset

- 이 모듈은 기본 조건에 따라서 resource와 inline 모듈 중에서 자동으로 선택한다. 용량 크기가 8KB(default) 보다 작으면 `inline(url-loader)` 모듈로 처리되고(번들에 삽입), 그렇지 않으면 `resource(file-loader)` 모듈로 처리된다.(별도의 파일로 분리)

```js
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
