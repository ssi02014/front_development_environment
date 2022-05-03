# 💻 ESLint, Prettier

## 📄 목차

1. [ESLint의 배경](#배경)
2. [린트(Lint)가 필요한 상황](#린트가-필요한-상황)
3. [ESLint 기본 개념](#기본-개념)
4. [ESLint 설치 및 사용법](#설치-및-사용법)
5. [ESLint 규칙](#규칙)
6. [자동으로 수정할 수 있는 규칙](#자동으로-수정할-수-있는-규칙)
6. [Extensible Config(recommended, airbnb, standard)](#extensible-config)
6. [ESLint 설정 초기화 --init](#초기화)

<br />

## 📝 ESLint 배경

### 배경

- 코드의 오류나 버그, 스타일을 점검하는 것을 린트(Lint) 혹은 린터(Linter)라고 부른다.

<br />

### 린트가 필요한 상황

- 아래 코드는 console.log를 실행하고 다음 줄에 즉시 실행함수를 실행하려는 코드이다.

```js
console.log()(function () {})();
```

- 하지만 이 코드를 브라우저에서 실행해 보면 TypeError가 발생한다. 브라우저 코드에 세미콜론을 자동으로 넣는 과정(ASI)를 수행하는데, 이와 같은 경우는 우리의 의도대로 해석하지 못하고 다르게 해석한다.
- 위 예제가 우리의 의도와 다르게 TypeError가 발생하는 이유는 console.log()가 반환하는 값이 함수가 아닌데 함수 호출을 시도했기 때문에 에러가 발생하는 것이다.
- 모든 문장에 세미콜론을 붙였다면, 혹은 즉시 실행 함수 앞에 세미 콜론을 붙였다면 예방할 수 있는 버그이다.
- 린트는 코드의 가독성을 높이는 것 뿐만 아니라 동적 언어의 특성인 런타임 버그를 예방하는 역할도 한다.

<br />

## 📝 ESLint 개념

### 기본 개념

- ESLint는 ECMAScript 코드에서 문제점을 검사하고 일부는 더 나은 코드로 정정하는 린트 도구 중 하나이다.(현재는 ESLint를 가장 많이 사용한다.)
- ESLint는 코드의 가독성을 높이고 잠재적인 오류와 버그를 제거해 단단한 코드를 만드는 것이 목적이다. 과거 JSLint, JSHint 등도 있었지만 요즘에는 자주 사용하지는 않는다.
- 코드에서 검사하는 항목을 크게 분류하면 2가지이다.
  1. 포맷팅
  2. 코드 품질
- `포맷팅`은 일관된 코드 스타일을 유지하도록 하고 개발자로 하여금 쉽게 읽히는 코드를 만들어 준다. 이를 테면 `들려쓰기 규칙`, `코드 라인`의 최대 너비 규칙을 따르는 코드가 가독성이 더 좋다.
- `코드 품질`은 어플리케이션의 `잠재적인 오류나 버그를 예방`하기 위함이다. 사용하지 않는 변수 쓰지 않기, 글로벌 스코프 함부로 다루지 않기 등이 오류 발생 확률을 줄여 준다.

<br />

### 설치 및 사용법

- 우선 노드 패키지(npm or yarn)으로 ESLint를 설치한다.

```
설치
yarn add -D eslint
```

- 설치 후 환결설정 파일을 프로젝트 최상단에 생성한다.

```js
// .eslintrc.js
module.exports = {};
```

- 빈 객체로 아무런 설정 없이 모듈만 만들었다. 이때 ESLint로 코드를 검사해보자.

```
실행
npm eslint app.js
```

- 아무런 결과를 출력하지 않고 프로그램은 종료된다.

<br />

## 📝 ESLint 규칙

### 규칙(Rules)

- ESLint는 검사 규칙을 미리 정해 놓는다. [ESLint - Rules](https://eslint.org/docs/rules/) 보면 규칙 목록을 확인할 수 있다.
- 위에서 작성했던 예제와 관련된 규칙은 `no-unexpected-multiline`이다. 설정 파일의 rules 객체에 이 규칙을 추가한다.

```js
// .eslintrc.js
module.exports = {
  rules: {
    "no-unexpected-multiline": "error", // or 0
  },
};
```

- 규칙에 설정하는 값은 세 가지다. `off`나 `0`은 끔, `warn`이나 `1`은 경고, `error`나 `2`는 오류이다. 위 예제에서는 설정한 규칙에 어긋나는 코드를 발견하면 오류를 출력하도록 했다.

```
실행
npx eslint app.js

에러 발생
2:1 error  Unexpected newline between function and ( of function call  no-unexpected-multiline

✖ 1 problem (1 error, 0 warnings)
```

- ESLint를 실행하면 에러가 발생하는 것을 확인할 수 있다.

<br />

### 자동으로 수정할 수 있는 규칙

- 자바스크립트 문장 뒤에 세미콜론을 여러 개 중복 입력해도 어플리케이션은 동작한다. 그러나 이것은 코드를 읽기 어렵게 하는 장애물이다.
- 이러한 문제와 관련된 규칙은 `no-extra-semi` 규칙이다.

```js
// app.js
console.log(); // 세미콜론을 연속으로 붙임
```

- 위 예제에서 console.log 다음에 세미콜론이 여러개 왔다고 가정해보자. 그리고 ESLint 설정에 `no-extra-semi` 규칙을 추가한다.

```js
// .eslintrc.js
module.exports = {
  rules: {
    "no-unexpected-multiline": "error",
    "no-extra-semi": "error",
  },
};
```

- 이 상태로 ESLint를 통해 코드를 검사하면 오류를 출력한다.

```
npx eslint app.js
1:15  error  Unnecessary semicolon  no-extra-semi

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```
- 마지막 줄에 에러 메시지를 보면 이 에러는 `잠재적으로 수정 가능(potentially fixable)`이라고 나와있다. 이는 실행 할 때 `--fix` 옵션을 붙여 검사하면 검사 후 오류가 발생한 코드를 자동으로 수정한다.

```
실행 --fix
npx eslint app.js --fix
```

- ESLint 규칙에는 수정 가능한 것과 그렇지 못한 것이있다. [ESLint - Rules](https://eslint.org/docs/rules/) 목록에서 왼쪽에 `렌치 🔧 `표시가 붙은 것이 `--fix` 옵션으로 자동 수정할 수 있는 규칙이다.

<br />

### Extensible Config
- 이러한 규칙을 하나하나 설정하는게 아니고 규칙 여러개를 모아 놓은 것이 있다. 그것이 `eslint:recommended` 설정이다. [ESLint - Rules](https://eslint.org/docs/rules/) 에서 왼족에 `체크✓`표시 되어 있는 것이 이 설정에서 활성화되어 있는 규칙이다.
- `eslint:recommended` 이것을 사용하려면 `extends`설정을 추가해야 한다.

```js
// .eslintrc.js
module.exports = {
  extends: [
    "eslint:recommended", // 미리 설정된 규칙 세트을 사용한다
  ],
}
```

- `eslint:recommended` 외에도 규칙이 더 필요하다면 `rules`속성에 추가해서 확장할 수 있다.
- ESLint에서 기본으로 제공하는 설정 외에 자주 사용하는 두 가지가 있다.
   1. airbnb
   2. standard
- `airbnb` 설정은 [airbnb 스타일 가이드](https://github.com/airbnb/javascript)를 따르는 규칙 모음이다.
- `standard` 설정은 [자바스크립트 스탠다드 스타일](https://standardjs.com/)을 사용한다.

<br />

### 초기화
- 실제로는 이러한 eslint 설정은 `--init` 옵션을 추가하면 손쉽게 구성할 수 있다.

```
실행
npx eslint --init

✔ How would you like to use ESLint? To check syntax and find problems
✔ What type of modules does your project use? · JavaScript modules(import/export)
✔ Which framework does your project use? · None of these
✔ Does your project use TypeScript? · No
✔ Where does your code run? · Browser
✔ What format do you want your config file to be in? · JavaScript
```

- 대화식 명령어로 진행되는데 모듈 시스템을 사용하는지, 프레임워크 사용하는지, 타입스크립트를 사용하는지, 어플리케이션이 어떤 환경에서 동작하는지 등에 답하면 된다. 답변에 따라 .eslintrc파일을 자동으로 만들 수 있다.

<br />

- 추가적으로 위에처럼 설정 하면 `.eslintrc.js`가 덮어씌여지는데 `module not found` 에러 문구가 보여진다. 이는 .eslintrc.js에서 `env`부분에 `node: true`를 추가해주면 된다.

```js
// .eslintrc.js
module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true // 이 부분 추가
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {}
}


```

<br />