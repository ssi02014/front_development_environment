# 💻 바벨(Babel)

## 📄 목차

1. [크로스 브라우징](#크로스-브라우징)
2. [트랜스파일과 빌드](#트랜스파일과-빌드)
3. [바벨의 기본 동작](#바벨의-기본-동작)
4. [커스텀 플러그인](#커스텀-플러그인)
5. [플러그인 사용하기](#플러그인-사용하기)
6. [커스텀 프리셋](#커스텀-프리셋)
7. [프리셋 사용하기](#프리셋-사용하기)

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
