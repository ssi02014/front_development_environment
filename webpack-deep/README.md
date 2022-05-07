# 💻 웹팩(Webpack) - 심화편

## 📄 목차

1. [웹팩 개발 서버 - 배경](#웹팩-개발-서버배경)
2. [webpack-dev-server 설치 및 사용](#webpack-dev-server-설치-및-사용)
3. [webpack-dev-server 기본 설정](#webpack-dev-server-기본-설정)

<br />

## 📝 웹팩 개발 서버

### 웹팩 개발 서버 배경

- 일반적으로 우리는 브라우저에 파일을 직접 로딩해서 결과물을 확인한다. 인터넷에 웹사이트를 게시하려면 서버 프로그램으로 이 파일을 읽고 요청한 클라이언트에게 제공해야 한다.
- 개발 환경에서도 이와 유사한 환경을 갖추는 것이 좋다. 그 이유는 운영 환경과 맞춤으로써 배포시 잠재적 문제를 미리 확인할 수 있기 때문이다. 게다가 ajax 방식의 api 연동은 `cors 정책` 때문에 반드시 서버가 필요하다.
- 프론트엔드 개발환경에서 이러한 개발용 서버를 제공해 주는 것이 `webpack-dev-server`이다.

<br />

### webpack-dev-server 설치 및 사용

```
설치
yarn add -D webpack-dev-server
```

- 설치 후에 package.json에서 scripts를 수정한다.
- `"start": "webpack-dev-server --progress"`를 추가한다. 참고로 뒤에 `--progress` 옵션을 주면 빌드 진행률을 확인할 수 있다

```json
{
  // ...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --progress",
    "build": "webpack",
    "build:dev": "NODE_ENV=development webpack",
    "build:prod": "NODE_ENV=production webpack",
    "lint": "eslint src --fix"
  }
  // ...
}
```

- 그리고 실행하면 webpack-dev-server가 동작하는 것을 확인할 수 있다.

```
실행
yarn start

> webpack-dev-server
ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from
```

- 브라우저에서 `http://localhost:8080`으로 들어가보면 결과물을 확인할 수 있다.
- 그리고 소스 코드를 수정하고 저장해 보자. 웹팩 개발 서버는 개발 서버를 제공하는 것 외에도 파일 변화를 감지하면 웹팩 빌드를 다시 수행하고 브라우저를 refresh하여 변경된 결과물을 보여준다.

<br />

### webpack-dev-server 기본 설정

- [webpack-dev-server 속성 공식 사이트](https://webpack.js.org/configuration/dev-server/)를 참고하자.
- 웹팩 설정 파일의 devServer 객체에 개발 서버 옵션을 설정할 수 있다.

```js
// webpack.config.js
module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    client: {
      overlay: true,
    },
    compress: true,
    host: "localhost",
    port: 8080,
    historyApiFallback: true,
  },
};
```

- 속성들을 하나씩 알아보자.

  1. static/directory: 정적 파일을 제공하기 위한 옵션을 구성할 수 있따. 기본값은 `웹팩 아웃풋`이다.
  2. host: 개발환경에서 `도메인`을 맞추어야 하는 상황에서 사용한다. 예를들어 쿠키 기반의 인증은 인증 서버와 동일한 도메인으로 개발환경을 맞추어야 한다. 운영체제의 호스트 파일에 해당 도메인과 127.0.0.1 연결한 추가한 뒤 host 속성에 도메인을 설정해서 사용한다.
  3. client/overlay: 컴파일러 `에러` 또는 `경고`가 있는 경우 브라우저에 표시합니다.
  4. port: 개발 서버 `포트 번호`를 설정한다. 기본값은 `8080`.
  5. historyApiFallBack: 히스토리 API를 사용하는 `SPA` 개발시 설정한다. `404 에러`가 발생하면 `index.html로 리다이렉트한다.`
  6. compress: 제공되는 모든 항목에 대해 `gzip 압축` 을 활성화 합니다.

<br />
