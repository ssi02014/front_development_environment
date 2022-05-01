# 💻 바벨(Babel)

## 📄 목차

1. [크로스 브라우징](#크로스-브라우징)
2. [트랜스파일과 빌드](#트랜스파일과-빌드)
3. [바벨(Babel)의 기본 동작](#바벨의-기본-동작)
4. [커스텀 플러그인(Plugin)](#커스텀-플러그인)
5. [플러그인(Plugin) 사용하기](#플러그인-사용하기)
6. [커스텀 프리셋(Preset)](#커스텀-프리셋)
7. [프리셋(Preset) 사용하기](#프리셋-사용하기)
8. [타겟 브라우저(target)](#타겟-브라우저)
9. [폴리필(Polyfill)](#폴리필)
10. [웹팩과 바벨 통합](#통합)
11. [babelrc와babel.config.js 차이점](#차이점)

### 🤓 참고

(아래 문서에 나오는 모든 예제들은 sample 폴더 참고)

<br />

## 📝 배경

### 크로스 브라우징

- 브라우저마다 사용하는 언어가 달라서 프론트엔드 코드는 일관적이지 못할때가 많다.
- 프론트엔드 개발에서 크로스브라우징 이슈는 코드의 일관성을 해치고 초심자를 힘들게하는 요소이다.
- 이런 크로스 브라우징의 혼란을 해결해 줄 수 있는 것이 `바벨`이다. ECMAScript2015+로 작성한 코드를 모든 브라우저에서 동작하도록 호환성을 지켜준다. 타입스크립트, JSX처럼 다른 언어로 분류되는 것도 포함한다.

<br />

### 트랜스파일과 빌드

- 이렇게 변화 시켜주는 것을 `트랜스 파일`이라고 한다. 트랜스 파일은변환 전후의 추상화 수준이 다른 빌드와는 달리 트랜스 파일은 추상화 수준을 유지한 상태로 코드를 변환한다.
- 예로, `타입스크립트 -> 자바스크립트` or `JSX -> 자바스크립트`처럼 트랜스파일 후에도 여전히 코드를 읽을 수 있다.

<br />

## 📝 바벨의 기본 동작

- 바벨은 ECMAScript2015 이상의 코드를 적당한 하위 버전으로 바꾸는 것이 주된 역할이다.
- 이렇게 바뀐 코드는 IE와 같은 구버전 브라우저 처럼 최신 자바스크립트 코드를 이해하지 못하는 환경에서도 잘동작하게 해준다.

```js
const alert = (msg) => window.alert(msg);
```

- 위 예제를 IE가 이해할 수 있는 코드로 바꿔보자. 우선 바벨 최신 버전을 설치한다.
- 일반적으로 babel은 `@babel/core`와 커맨드로 실행할 수 있는 `@babel/cli`가 있다.

```
yarn add -D @babel/core @babel/cli
```

- 설치 완료 후 node_modules/.bin에 있는 babel을 실행해도 되지만 npx를 이용하면 더 쉽게 babel을 실행할 수 있다.

```
바벨 실행
npx babel app.js

결과
const alert = msg => window.alert(msg);
```

- 결과물이 나왔는데 딱히 변화된게 없어보인다. 참고로, 바벨은 세 단계로 빌드를 진행한다.
  1. 파싱(Parsing)
  2. 변환(Transforming)
  3. 출력(Printing)

<br />

- 코드를 읽고 `추상 구문 트리(AST)`로 변환하는 단계를 `파싱` 이라고 한다. 추상 구문 트리는 빌드 작업을 처리하기에 적합한 자료구조인데 컴파일러 이론에 사용되는 개념이다.
- 추상 구문 트리를 변경하는 것이 `변환` 단계이다. 실제로 코드를 변경하는 작업을 한다.
- 변경된 결과물을 `출력`하는 것을 마지막으로 바벨은 작업을 완료한다.
- 하지만 위 예제의 결과를 보면 빌드 이전과 변한게 하나도 없다. 그 이유를 아래에서 알아보자.

<br />

## 📝 플러그인

- [📖 바벨 공식 플러그인](https://babeljs.io/docs/en/plugins)
- 기본적으로 바벨은 코드를 받아서 코드를 반환한다. 바벨 함수를 정의한다면 이런 모습이다.

```js
const babel = (code) => code;
```

- 바벨은 파싱과 출력만 담당하고 변환 작업은 다른 녀석이 처리하는데 이것을 `플러그인`이라고 부른다.

<br />

### 커스텀 플러그인

- 아래 예제는 [바벨 홈페이지](https://babeljs.io/docs/en/plugins#plugin-development)의 예제 코드이다.

```js
// my-babel-plugin.js:
module.exports = function myBabelPlugin() {
  // 기본적으로 커스텀 플러그인을 만들 때는 visitor라는 프로퍼티를 갖는 객체를 반환해야 함.
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name; // 파싱된 결과물에 접근할 수 있다.

        // 바벨이 만든 AST 노드를 출력한다
        console.log("Identifier() name:", name);

        // 변환작업: 코드 문자열을 역순으로 변환한다
        path.node.name = name.split("").reverse().join("");
      },
    },
  };
};
```

- 일반적으로 커스텀 플러그인을 만들 때는 `visitor`라는 프로퍼티를 갖는 객체를 반환해줘야 한다.
- visitor 객체는 바벨이 파싱하여 만든 추상 구문 트리(AST)에 접근할 수 있는 메소드를 제공한다. 위 예제에서는 그중 Identifier() 메서드를 사용한 것이다.
- `Identifier()` 메소드로 들어온 인자 path에 접근하면 코드 조각에 접근할 수 있고 아래 예제와 같은 결과물이 나오는 것을 확인할 수 있다.
- 플러그인을 적용해서 실행하기 위해서는 `--plugins`옵션을 사용해서 babel을 실행하면 된다.

```js
// 실행
// $ npx babel app.js --plugins './my-babel-plugin.js'

const trela = (gsm) => wodniw.trela(gsm);
```

<br />

- babel이 어떤식으로 코드를 변환시키는지는 확인했으니 원래 목적인 `ES6` 코드로 작성한 코드를 그 이전 버전에서도 호환될 수 있게 변환시켜보자.

```js
// my-babel-plugin.js:
module.exports = function myBabelPlugin() {
  return {
    visitor: {
      // https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-block-scoping/src/index.js#L26
      VariableDeclaration(path) {
        console.log("VariableDeclaration() kind:", path.node.kind); // const

        // const => var로 변환
        if (path.node.kind === "const") {
          path.node.kind = "var";
        }
      },
    },
  };
};
```

- 이번에는 visitor 객체에 `VariableDeclaration()` 메서드를 정의했다. path에 접근해 보면 키워드가 잡히는 것을 알 수 있다.
- 위 예제에서는 만약 path.node.kind가 const일 경우 var로 변환하는 코드이다.
- 위 예제의 결과는 아래와 같다.

```js
// 실행
// $ npx babel app.js --plugins './my-babel-plugin.js'

var alert = (msg) => window.alert(msg);
```

<br />

### 플러그인 사용하기

- 실제로 위에서 const를 var로 바꿔주는 플러그인이 존재한다. 바로 [block-scoping](https://babeljs.io/docs/en/babel-plugin-transform-block-scoping)플러그인이다.
- `block-scoping`은 const와 let처럼 블록 스코프를 따르는 예약어를 함수 스코프를 따르는 var로 변경시켜준다.

```
설치
yarn add -D @babel/plugin-transform-block-scoping
```

- 설치한 플러그인을 사용해보자.

```js
//실행
// npx babel app.js --plugins @babel/plugin-transform-block-scoping

var alert = (msg) => window.alert(msg);
```

- 위 예제를 보면 알겠지만 기존에 작성한 커스텀 플러그인과 같은 결과를 보인다.

<br />

- 추가로 IE같은 구버전 브라우저는 화살표 함수도 지원하지 않는데 이는 [arrow-functions](https://babeljs.io/docs/en/babel-plugin-transform-arrow-functions) 플러그인을 이용해서 일반 함수로 변경시킬 수 있다.

```
설치
yarn add -D @babel/plugin-transform-arrow-functions
```

```js
/* 실행
  npx babel app.js \
    --plugins @babel/plugin-transform-block-scoping \
    --plugins @babel/plugin-transform-arrow-functions
*/

var alert = function (msg) {
  return window.alert(msg);
};
```

<br />

- ES6에서부터 지원하는 엄격 모드를 사용하는 것이 안전하기 때문에 `"use strict"` 구문도 추가하자. 이때는 `strict-mode` 플러그인을 사용한다.

```
설치
yarn add -D @babel/plugin-transform-strict-mode
```

- 하지만 여기서 커맨드라인 명령어가 점점 길어지기 때문에 `설정 파일로 분리`하는 것이 좋다.
- 웹팩이 webpack.config.js를 기본 설정 파일로 사용하듯 바벨도 `babel.config.js`를 사용한다.

```js
// babel.config.js:
module.exports = {
  plugins: [
    "@babel/plugin-transform-block-scoping",
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-strict-mode",
  ],
};
```

- 설정 파일에 `block-scoping`, `arrow-functions`, `strict-mode` 플러그인을 추가했다. 이 상태로 다시 빌드해보자.

```js
// 실행
// npx babel app.js

"use strict";

var alert = function (msg) {
  return window.alert(msg);
};
```

- 상단에 `"use strict"` 구문이 추가되어 엄격모드가 활성화 되었다. 이렇게까지 진행하면 비로소 IE와 같은 구버전 브라우저에서 안전하게 동작하는 코드로 트랜스파일된 것이다.
- 참고로 이렇게 변환을 위한 플러그인 목록은 [바벨 공식 Plugin 페이지](https://babeljs.io/docs/en/plugins)에서 확인할 수 있다.

<br />

## 📝 프리셋

- ES6+ 으로 코딩할 때 필요한 플러그인을 일일이 설정하는 일은 무척 까다로운 일이다. 코드를 한 줄 작성하는데도 세 개 플러그인을 셋팅해야되기 때문이다.
- 하지만 이때, 목적에 맞게 여러가지 플러그인을 세트로 모아놓은 것이 있는데 이를 `프리셋`이라고 한다.

<br />

### 커스텀 프리셋

- 위에서 사용한 세 개 플러그인을 하나의 프리셋으로 만들어 보자.

```js
// my-babel-preset.js
module.exports = function myBabelPreset() {
  return {
    plugins: [
      "@babel/plugin-transform-arrow-functions",
      "@babel/plugin-transform-block-scoping",
      "@babel/plugin-transform-strict-mode",
    ],
  };
};
```

- `my-babel-preset.js` 파일을 만들고 myBabelPreset() 함수를 선언한 뒤에 `plugins` 배열에 위에서 사용한 세 개 플러그인을 담았다.
- 이후에 `babel.config.js`를 수정한다.

```js
// babel.config.js
module.exports = {
  presets: ["./my-babel-preset.js"],
};
```

- 기존에 플러그인 셋팅 코드를 제거하고 presets에 방금 만든 커스텀 프리셋을 추가했다. 실행해보면 동일한 결과를 얻을 수 있다.
- 사실 지금까지 바벨을 사용한 방법은 실무에서는 잘 사용하지 않는다. 바벨의 동작 원리를 파악하기 위함이고 이제 실무에서 자주 사용하는 방법을 알아보도록 하자.

<br />

### 프리셋 사용하기

- 바벨은 목적에 따라 몇 가지 프리셋을 제공한다.
  1. preset-env
  2. preset-flow
  3. preset-react
  4. preset-typescript

<br />

- preset-env는 ECMAScript2015+ 를 변환할 때 사용한다. 바벨 7 이전 버전에는 연도별로 각 프리셋을 제공했지만 현재는 env로 합쳐졌다.
- preset-flow, react, typescript 는 flow, 리액트, 타입스크립트를 변환하기 위한 프리셋이다.

<br />

```
설치
yarn add -D @babel/preset-env
```

```js
// babel.config.js:
module.exports = {
  presets: ["@babel/preset-env"],
};
```

```js
// 실행
// npx babel app.js

("use strict");

var alert = function (msg) {
  return window.alert(msg);
};
```

- IE에 적용될 수 있도록 `preset-env`를 설치하고 `babel.config.js`에 적용했다.
- 실제로 현업에서는 위 처럼 바로 프리셋을 적용한다. 위에서 했던 것처럼 플러그인을 불러온다거나 커스텀 프리셋을 사용하지는 않는다.

<br />

## 📝 env 프리셋 설정과 폴리필

### 타겟 브라우저

- preset-env는 특정 브라우저를 지원하는 것을 설정할 수 있다.
- 만약 내가 작성한 코드가 크롬 최신 버전만 지원한다고 하면 `target` 옵션에 브라우저 버전명만 지정하면 env 프리셋은 이에 맞는 플러그인을 찾아 최적의 코드를 출력한다.

```js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "90", // 크롬 90까지 지원하는 코드를 만든다
        },
      },
    ],
  ],
};
```

```js
// 실행
// npx babel app.js
"use strict";

const alert = (msg) => window.alert(msg);
```

- 크롬 최신 버전은 블록 스코프와 화살표 함수를 모두 지원하기 때문에 코드를 변환하지 않는 결과물을 만들었다.
- 만약 `IE`도 지원해야 한다면 바벨 설정에 브라우저 정보만 추가하면 된다.

```js
// babel.config.js :
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "90",
          ie: "11", // ie 11까지 지원하는 코드를 만든다
        },
      },
    ],
  ],
};
```

```js
// 실행 npx babel app.js
"use strict";

var alert = function alert(msg) {
  return window.alert(msg);
};
```

<br />

### 폴리필

- 이번에 변환과 조금 다른 폴리필에 대해 알아보기 위해 app.js 코드를 수정해보자.

```js
// app.js
new Promise();
```

```js
// 실행 npx babel app.js
"use strict";

new Promise();
```

- 위 예제를 그냥 바벨로 처리하면 변환이 없다.
- 분명 `preset-env`를 통해 변환을 시도했지만 Promise는 변함이 없다. target에 IE 11을 설정하고 빌드한 것인데 IE는 여전히 Promise를 해석하지 못하고 에러를 던진다.
- 이는, 브라우저는 현재 스코프부터 시작해 전역까지 Promise라는 이름을 찾으려고 시도할 것이다. 그러나 스코프 어디에도 Promise란 이름이 없기 때문에 레퍼런스 에러를 발생시키는 것이다.
- 플러그인이 Promise를 ECMAScript5 버전으로 변환할 것으로 기대했는데 예상과 다르게 바벨은 ECMAScript2015+를 ECMAScript5 버전으로 변환할 수 있는 것만 빌드한다.
- Promise와 같이 이렇게 변환하지 못하는 것들은 `폴리필(Polyfill)`이라고 부르는 코드 조각을 추가해서 해결한다.
- 쉽게 예로 들면 ECMAScript2015+의 블록 스코프는 함수 스코프로, 화살표 함수는 일반 함수로 대체할 수 있다. 하지만 Promise는 대체할 수 없다.( 헷갈릴 수 있는데 대체할 수는 없지만 ECMAScript5 버전으로 코드를 구현할 수는 있다 참고: [core-js promise](https://github.com/zloirock/core-js/blob/master/packages/core-js/modules/es.promise.js) )

<br />

- but! `preset-env`는 폴리필을 지정할 수 있는 옵션을 제공한다.
- 폴리필을 제공하는 대표적인 라이브러리 중에 core-js가 있다. 또, babel-polyfill도 있지만 최근에는 core-js를 많이 사용하는 편이다.

```js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "79", // 크롬 79까지 지원하는 코드를 만든다
          ie: "11",
        },
        useBuiltIns: "usage",
        corejs: {
          version: 2,
        },
      },
    ],
  ],
};
```

```js
// 실행 npx babel app.js
"use strict";

require("core-js/modules/es6.object.to-string.js");
require("core-js/modules/es6.promise.js");

new Promise();
```

- 이전과 동일하게 `new Promise()` 코드는 바뀐게 없지만 위에 `require`가 추가된 것을 확인할 수 있다.
- 실제로 위 코드가 안전하게 동작하려면 `core-js`가 사전에 로딩되어 있어야 하고 그 다음 우리가 번들한 코드가 작동해야한다.

<br />

## 📝 웹팩과 바벨 통합

### 통합

- 실무 환경에서 바벨을 직접 사용하는 것보다는 웹팩으로 통합해서 사용하는 것이 일반적이다.
- 로더 형태로 제공하는 `babel-loader`가 그것이다

```
설치
yarn add -D babel-loader
```

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
        exclude: /node_modules/, // 바벨 로더가 처리하지 않는 폴더 설정
        loader: "babel-loader", // 바벨 로더를 추가한다
      },
    ],
  },
  plugins: [
    // ...
  ],
```

- 먼저 패키지를 설치하고 웹팩 설정에 `babel-loader`를 추가한다.
- 하지만 이렇게 설정하고 실제로 빌드를 해보면 다음과 같은 에러가 출력되는 것을 확인할 수 있다.

```
Module not found: Error: Can't resolve 'core-js/modules/es6.object.to-string.js' in '/Users/bunjang/individual-workspace/front_development_environment/sample'
```

- 이렇게 나온 이유는 `core-js` 모듈을 찾을 수 없기 때문인데, 사실 폴리필 사용을 설정했다면 core-js 라이브러리도 함께 설치해줘야 한다.

```
설치
yarn add core-js@2
```

- 설치 후에 진행하면 제대로 빌드되는 것을 확인할 수 있다.
  <br />

<h5 style="color:red">참고로 위 예제는 core-js v3로 설치할 경우 제대로 작동하지 않는다. 아래 예제를 참고하자</h3>

<br />

### 웹팩에서 babel-loader 최신 사용법

```js
// webpack.config.js:
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

- 위 예제를 보면 `@babel/plugin-proposal-class-properties` 플러그인이 추가된 것을 확인할 수 있는데 이는 이니셜라이저 구문을 추가하여(즉 = 대입 연산자를 사용하여) 클래스 속성을 정의할 수 있는 방식으로 클래스 속성을 변환한다.
- 쉽게 말하면 기존에는 클래스 내에서 생성된 개체의 인스턴스에 대해 원하는 모든 속성은 `constructor(생성자)` 메서드 내에서 정의했어야 했다. 하지만 `Babel 7.14(ECMAScript 2022)`부터 더 이상 생성 자 내부에 속성을 정의할 필요가 없다.

```js
// 기존 class
class Person {
  constructor() {
    this.name = "Alice";
  }
  getName() {
    return this.name;
  }
}
```

```js
// ECMAScript2022 이후 class
class Person {
  name = "Alice"; //Property initializer syntax
  getName() {
    return this.name;
  }
}
```

- 또한, `@babel/plugin-proposal-class-properties` 플러그인은 정적 필드 및 메서드에 대한 지원을 추가한다.

```js
class Person {
  static department = "IT"; //Static class properties
  static getDepartment() {
    return Person.department;
  }
}
```

<br />

## 📝 babelrc와 babel.config.js 차이점

- 바벨을 설정할 때 `.babelrc`와 `babel.config.js`로 설정이 가능하다. 어떤 프로젝트는 .babelrc를 사용하기도 하고, 어디에서는 babel.config.js를 사용하기도 한다.
- 바벨은 두 가지 설정 파일 포맷을 갖고 포맷에 따라 용도가 다르다. 위 두 가지 파일 포맷 중 하나를 단독으로 사용할 수도 있고, 둘 다 사용할 수도 있다.

### 차이점

1. babel.config.js: (프로젝트 전체 설정)
   - `babel.config.js`는 프로젝트 전체 구성시 사용된다. 따라서 여러 패키지 디렉토리를 가진 프로젝트에서 하나의 바벨 설정을 할 때 사용된다.
2. .babelrc (지역 설정)
   - `.babelrc`는 파일/디렉토리의 하위 집합에서 특정 변환/플러그인을 실행하려는 경우에 유용하다.
   - 프로젝트 내에 서드파티 라이브러리가 바벨에 의해 변환되지 않기를 원할 때도 사용할 수 있다.
   - 바벨이 컴파일 되는 `filename`부터 폴더 구조를 따라 올라가며 `.babelrc` 파일을 로드한다. 만약 동일한 플러그인이나 프리셋에 대한 설정이 있다면 지역 설정 파일이 전체 설정을 덮어 씌운다.

```
프로젝트 트리 구조
test-babel-config-file
└-babel.config.js
└-package.json   // 전체설정파일
│
└-src
   └-service1
   │    └-.babelrc  // 지역설정파일
   │    └-code.js
   │
   └-service2
        └-.babelrc  // 지역설정파일
        └-folder1
           └-code.js
           └-package.json   // babel속성이없음
```

<br />
