# 💻 ESLint, Prettier

## 📄 목차

1. [ESLint의 배경](#eslint-배경)
2. [린트(Lint)가 필요한 상황](#린트가-필요한-상황)
3. [ESLint 기본 개념](#기본-개념)
4. [ESLint 설치 및 사용법](#eslint-설치-및-사용법)
5. [ESLint 규칙](#규칙)
6. [자동으로 수정할 수 있는 규칙](#자동으로-수정할-수-있는-규칙)
7. [Extensible Config(recommended, airbnb, standard)](#extensible-config)
8. [ESLint 설정 초기화 --init](#초기화)
9. [Prettier의 배경](#prettier-배경)
10. [Prettier 설치 및 사용법](#prettier-설치-및-사용법)
11. [Prettier 포맷팅](#포맷팅)
12. [ESLint Prettier 통합 방법 - eslint-config-prettier](#eslint-config-prettier)
13. [ESLint Prettier 통합 방법 - eslint-plugin-prettier](#eslint-plugin-prettier)
14. [eslint-plugin-prettier와 eslint-config-prettier 통합](#eslint-plugin-prettier와-eslint-config-prettier-통합)
15. [.prettier 파일 적용하기](#prettier-파일-적용)

<br />

## 📝 ESLint

### ESLint 배경

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

### ESLint 설치 및 사용법

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
};
```

- `eslint:recommended` 외에도 규칙이 더 필요하다면 `rules`속성에 추가해서 확장할 수 있다.
- ESLint에서 기본으로 제공하는 설정 외에 자주 사용하는 두 가지가 있다.
  1.  airbnb
  2.  standard
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
  env: {
    browser: true,
    es2021: true,
    node: true, // 이 부분 추가
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
```

- 그리고 추가적으로 package.json에 lint 명령어를 추가해 쉽게 eslint를 실행하도록 하자.

```json
{
  // ...
  "scripts": {
    // ...
    "lint": "eslint src --fix" // --fix는 자동으로 코드 수정시켜주는 옵션
  }
}
```

<br />

## 📝 Prettier

### Prettier 배경

- Prettier(프리티어)는 코드를 더 예쁘게 만든다. ESLint의 역할 중 포맷팅과 겹치는 부분이 있지만 프리티어는 좀 더 일관적인 스타일 코드로 다듬는다. 반면 코드 품질과 관련된 기능은 하지 않는 것이 ESLint와 다른 점이다.

<br />

### Prettier 설치 및 사용법

- 우선 Prettier 패키지를 설치하자.

```
설치
yarn add -D prettier
```

- 그리고 아래처럼 코드를 작성해보자.

```js
console.log("hello world");
```

- Prettier로 실행해보면

```
실행
npx prettier app.js --write
```

```js
// app.js
console.log("Hello world");
```

- 다음과 같이 작은 따옴표가 `큰 따옴표`로 변경되고 뒤에 `세미콜론(;)`도 추가되었다. 프리티어는 ESLint와 달리 규칙이 `미리 세팅`되어 있기 때문에 설정 없이도 바로 사용할 수 있다.

<br />

### 포맷팅

```js
console.log(
  "----------------매 우 긴 문 장 입 니 다 80자가 넘 는 코 드 입 니 다.----------------"
);

foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne()
);
```

- ESLint는 `max-len` 규칙을 이용해 위 코드를 검사하고 결과만 알려 줄 뿐 수정하는 것은 개발자의 몫이다.
- 반면 Prettier는 어떻게 수정해야할지 알고 있기 때문에 아래처럼 코드를 다시 작성한다.

```js
console.log(
  "----------------매 우 긴 문 장 입 니 다 80자가 넘 는 코 드 입 니 다.----------------"
);

foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne()
);
```

- 위 예제로 확인할 수 있듯이 Prettier는 코드를 문맥을 어느 정도 파악하고 상황에 따라 최적의 모습으로 스타일을 수정한다.
- Prettier가 포맷팅 품질은 ESLint보다 훨씬 사람에게 친숙하게 좋은 결과를 만든다.

<br />

## 📝 ESLint Prettier 통합 방법

### eslint-plugin-prettier

- 포맷팅은 Prettier에게 맡기더라도 코드 품질과 관련된 검사는 ESLint의 몫이다. 따라서, 이 둘을 함께 사용하는 것이 최선이다.
- Prettier는 이러한 ESLint와 통합 방법을 제공한다.
- `eslint-config-prettier`는 프리티어와 충돌하는 ESLint 규칙을 끄는 역할을 한다. 둘 다 사용하는 경우 규칙이 충돌하기 때문이다.

```
설치
yarn add -D eslint-config-prettier
```

- 패키지를 설치한 뒤 설정 파일의 extends 배열에 추가한다.

```js
// .eslintrc.js
{
  extends: [
    "eslint:recommended",
    "eslint-config-prettier"
  ]
}
```

- 예를 들어 ESLint는 중복 세미콜론 사용을 검사한다. 하지만 이것은 Prettier도 마찬가지다. 따라서 어느 한쪽에서는 규칙을 꺼야하는데 eslint-config-prettier를 추가하면 ESLint 규칙을 비활성화 한다.

```js
var foo = "";
console.log();
```

- 위와 같은 코드를 prettier와 eslint를 동시에 실행하면

```
실행
npx prettier app.js --write && npx eslint app.js --fix
```

```js
var foo = ""; // error  'foo' is assigned a value but never used  no-unused-vars
console.log();
```

- 위 예제처럼 포맷팅된 것을 확인할 수 있다. 하지만 아직은 prettier와 eslint를 동시에 실행해야된다는 점이 상당히 귀찮다.

<br />

### eslint-plugin-prettier

- 그래서 위 둘을 한방에 실행시켜주는 `eslint-plugin-prettier`패키지가 존재한다. 이 패키지는 프리티어 규칙을 ESLint 규칙으로 추가하는 플러그인이다. 프리티어의 모든 규칙이 ESLint로 들어오기 때문에 ESLint만 실행하면 된다.
- 해당 패키지를 설치하고, 설정 파일에서 `plugins`와 `rules`에 설정을 추가한다.

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

- Prettier의 모든 규칙을 ESLint 규칙으로 가져온 설정이다. 이제는 ESLint만 실행해도 Prettier 포맷팅 기능을 가져갈 수 있다.

```
실행
npx eslint app.js --fix
```

<br />

### eslint-plugin-prettier와 eslint-config-prettier 통합

- 프리티어는 이 두 패키지(`eslint-plugin-prettier`, `eslint-config-prettier`)를 함께 사용하는 단순한 설정을 제공하는데 아래 설정을 추가하면 된다.

```js
// .eslintrc.js
module.exports = {
  // ...
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  // ...
};
```

- 두 패키지들 모두 설치한 상태에서 설정파일 extends에 `plugin:prettier/recommended`을 추가하면 된다.

<br />

## 📝 .Prettier 파일 적용

- Prettier를 프로젝트에 적용하는 방법이 크게 3가지가 있다.

  1. `.prettierrc` 설정 파일 사용(자주 사용)
  2. `VSCode` 전역 설정 파일 사용(자주 사용)
  3. Prettier 패키지 설치 후 CLI 사용(거의 사용 안함)

- `.prettierrc 파일`과 `VSCode 전역 설정 파일 설정`하는 방법을 알아보자.

### prettier 파일 적용

- 우선 VSCode Extension Prettier 확장 설치해야한다.
- 그리고 위에서 언급했던 ESLint에서 Prettier와 겹치는 포맷팅룰을 제거한다.

```
yarn add -D eslint eslint-config-prettier prettier
```

- `eslint-plugin-prettier`는 현재 추천되지 않는다고 한다. 그 이유는
  1. prettier 실행보다 늦다
  2. 에디터 상에서 빨간 줄무늬가 많이 나타나서 번거롭다 (eslint에 의해 생기는 줄무늬들이다. 정확히는 eslint로서 사용되는 prettier)
  3. 플러그인이라는 불필요한 층이 있어서 문제가 발생할 수 있다

<br />

- prettier는 기본적으로 프로젝트의 root에 있는 `.prettierrc` 파일에 적힌 룰에 의해서 동작한다. 프로젝트에 이 파일이 없으면 `기본값`으로 세팅된다.

```json
// .prettierrc
{
  "arrowParens": "avoid", // 화살표 함수 괄호 사용 방식
  "bracketSpacing": false, // 객체 리터럴에서 괄호에 공백 삽입 여부
  "endOfLine": "auto", // EoF 방식, OS별로 처리 방식이 다름
  "htmlWhitespaceSensitivity": "css", // HTML 공백 감도 설정
  "jsxBracketSameLine": false, // JSX의 마지막 `>`를 다음 줄로 내릴지 여부
  "jsxSingleQuote": false, // JSX에 singe 쿼테이션 사용 여부
  "printWidth": 80, //  줄 바꿈 할 폭 길이
  "proseWrap": "preserve", // markdown 텍스트의 줄바꿈 방식 (v1.8.2)
  "quoteProps": "as-needed" // 객체 속성에 쿼테이션 적용 방식
  "semi": true, // 세미콜론 사용 여부
  "singleQuote": true, // single 쿼테이션 사용 여부
  "tabWidth": 2, // 탭 너비
  "trailingComma": "all", // 여러 줄을 사용할 때, 후행 콤마 사용 방식
  "useTabs": false, // 탭 사용 여부
  "vueIndentScriptAndStyle": true, // Vue 파일의 script와 style 태그의 들여쓰기 여부 (v1.19.0)
  "parser": '', // 사용할 parser를 지정, 자동으로 지정됨
  "filepath": '', // parser를 유추할 수 있는 파일을 지정
  "rangeStart": 0, // 포맷팅을 부분 적용할 파일의 시작 라인 지정
  "rangeEnd": Infinity, // 포맷팅 부분 적용할 파일의 끝 라인 지정,
  "requirePragma": false, // 파일 상단에 미리 정의된 주석을 작성하고 Pragma로 포맷팅 사용 여부 지정 (v1.8.0)
  "insertPragma": false, // 미리 정의된 @format marker의 사용 여부 (v1.8.0)
  "overrides": [
    {
      "files": "*.json",
      "options": {
        "printWidth": 200
      }
    }
  ], // 특정 파일별로 옵션을 다르게 지정함, ESLint 방식 사용
}
```

- 하지만 따로 필요한 부분만 설정해보자.

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

- 위와 같이 `.prettierrc`와 `.eslintrc.js`를 수정 후에 vscode에 적용될 수 있게 setting.json 파일을 수정하면 된다.

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
