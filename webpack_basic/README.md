# 💻 웹팩(Webpack) - 기본편

## 📄 목차

1. [웹팩이 필요한 이유 - 배경](#배경)
2. [IIFE 방식의 모듈](#IIFE-방식의-모듈)
3. [다양한 모듈 스펙](#다양한-모듈-스펙)
4. [브라우저의 모듈 지원](#브라우저의-모듈-지원)
5. [엔트리/아웃풋 실습](#엔트리-아웃풋-실습)

<br />

## 📝 웹팩이 필요한 이유와 기본 동작

### 배경

- 모듈에 대해서 이야기 해보면, 문법 수준에서 모듈을 지원하기 시작한 것은 ES2015부터다. import/export 구문이 없었던 모듈 이전 상황을 살펴보는 것이 웹팩 등장 배경을 설명하는데 수월하다.
- 예제를 보자

<br />

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

<br />

- 위 코드는 모두 하나의 HTML 파일안에서 로딩해야만 실행된다. math.js가 로딩되면 app.js는 이름 공간에서 `sum`을 찾은 뒤 함수를 실행한다.

<br />

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

<br />

- 이때 문제는 `sum`이 전역 공간에 노출된다는 것이다. 다른 파일에서도 `sum`이란 이름을 사용하면 충돌한다.
- 즉, 전역 스코프가 오염된다는 치명적인 단점이 있다.

<br />

### IIFE 방식의 모듈

- IIFE(Immediately Invoked Function Expression): 즉시 실행 함수은 정의되자마자 즉시 실행되는 함수이다.
- 위와 같은 문제를 예방하기 위해 스코프를 사용한다.
- 함수 스코프를 만들어 외부에서 안으로 접근하지 못하도록 공간을 격리하는 것이다. 스코프 안에서는 자신만의 이름 공간이 존재하므로 스코프 외부와 이름 충돌을 막을 수 있다.

<br />

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

<br />

- 위와 같이 작성하면 전역 스코프에 sum이라는 메서드가 없고 math.js에서 math라는 전역 변수에 sum을 할당했기 때문에 math.sum으로 접근해야 한다.
- 이럴 경우에는 전역 스코프가 오염되지 않는다.

<br />

### 다양한 모듈 스펙

- 위와 같은 `IIFE` 방식으로 자바스크립트 모듈을 구현하는 대표적인 명세가 `AMD`와 `CommonJs`다.
- `CommonJs`는 자바스크립트를 사용하는 모든 환경에서 모듈을 하는 것이 목표다. exports 키워드로 모듈을 만들고 require()함수로 불러 들이는 방식이다. 대표적으로 `Node.js`에서 이를 사용한다.

<br />

```js
//math.js
exports function sum(a, b) { return a + b}

//app.js
const sum = require('./math.js');
sum(1, 2); // 3
```

<br />

- `AMD(Asynchronous Module Definition)`는 비동기로 로딩되는 환경에서 모듈을 사용하는 것이 목표다 주로 브라우저 환경이다.
- `UMD(Universal Module Definition)`는 AMD기반으로 CommonJS 방식까지 지원하는 통합 형태다.
- 이렇게 각 커뮤니티에서 각자의 모듈 시스템을 내놓았다. 지금은 바벨과 웹팩을 이용해 모듈 시스템을 사용하는 것이 일반적이다. ES2015 모듈 시스템의 모습을 살펴보자.

<br />

```js
// math.js
export function sum(a, b) {
  return a + b;
}

// app.js
import * as math from "./math.js";
math.sum(1, 2);
```

<br />

### 브라우저의 모듈 지원

- 모든 브라우저에서 모듈 시스템을 지원하지는 않는다. (특히 인터넷 익스플로러 등과 같은 몇몇 브라우저) 우선은 가장 많이 사용하는 크롬 예제로만 살펴보자(크롬도 버전61부터 모듈 시스템을 지원한다.)

<br />

```html
<body>
  <script type="module" src="src/app.js"></script>
</body>
```

<br />

- script 태그로 로딩할 때 `type="module"`을 사용한다. app.js는 모듈을 사용할 수 있다.

<br />

## 📝 엔트리/아웃풋

### 엔트리 아웃풋 실습

- 번들 작업을 하는 `webpack`, 웹팩을 터미널 명령어로 사용할 수 있는 `webpack-cli` 설치
- `-D` 키워드를 이용해 개발용 패키지로 설치

<br />

```
  yarn add -D webpack webpack-cli
```

<br />

- `--help` 옵션을 통해서 사용방법을 확인할 수 있다.

<br />

```
$ node_modules/.bin/webpack --help

  --mode  [선택: "development", "production", "none"]
  --entry  The entry point(s) of the compilation. [문자열]
  --name, -o The output path and file for compilation assets
```

<br />

- 주요 옵션으로 `--mode`, `--entry`, `--output-path 또는 -o`이 있는데 이 세 개 옵션만 사용하면 코드를 묶을 수 있다.
- 아래 예제가 번들링하는 터미널 명령어이다.

<br />

```
$ node_modules/.bin/webpack --mode development --entry ./src/app.js --output-path ./dist
```

<br />

- `--mode`는 웹팩 실행모드를 의미하는데 개발 버전인 `development`를 지정한다 (운영 모드는 `production`)
- `--entry`는 프로젝트 빌드를 위한 엔트리 포인트(시작점 경로) 파일명 또는 명명된 파일명 모음을 지정하는 옵션이다.
- `--output-path`는 webpack에 의해 생성된 파일의 출력 위치입니다.(파일 이름은 기본적으로 main.js)

<br />

- 웹팩 설정파일의 경로를 지정할 수 있는데 기본 파일명이 `webpack.config.js`다. `webpack.config.js` 파일을 만들어 옵션을 코드로 구성해 보자.

<br />

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

<br />

- `mode`는 development 문자열을 사용했다.
- `entry`는 어플리케이션 진입점인 src/app.js로 설정했다.
- `output`에 설정한 `[name]`은 entry에 설정한 key 즉, `main`이 들어간다. 이렇게 설정한 이유는 만약 entry가 여러 개일 경우 output도 여러 개여야 하는데 이때 output이름을 `동적`으로 만들 수 있다.
  - 추가적으로, output.path는 `절대 경로`를 사용하기 때문에 node의 `path`모듈의 `resolve()` 함수를 사용해서 계산 했다.

<br />
