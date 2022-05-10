# 💻 웹팩(Webpack) - 심화편

## 📄 목차

1. [웹팩 개발 서버 - 배경](#웹팩-개발-서버배경)
2. [webpack-dev-server 설치 및 사용](#webpack-dev-server-설치-및-사용)
3. [webpack-dev-server 기본 설정](#webpack-dev-server-기본-설정)
4. [API 연동: 목업 API 1(devServer.onBeforeSetupMiddleware)](#목업-api-onbeforesetupmiddleware)
5. [API 연동: 실제 API (devServer.proxy)](#proxy-설정)

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

```json
{
  // ...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --progress --open",
    "build": "webpack",
    "build:dev": "NODE_ENV=development webpack",
    "build:prod": "NODE_ENV=production webpack",
    "lint": "eslint src --fix"
  }
  // ...
}
```

- 참고로 뒤에 `--progress` 옵션을 주면 빌드 진행률을 확인할 수 있다. `--open`은 개발 서버가 실행됬을 때 새로운 브라우저를 열도록 한다.
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

## 📝 API 서버 연동

- 프론트엔드에서는 서버와 데이터를 주고 받기 위해 ajax 데이터 로드 기법을 사용한다.
- 보통은 api 서버를 어딘가에 띄우고 (혹은 로컬에 띄우고) 프론트 서버와 함께 개발한다.

### 목업 api onBeforeSetupMiddleware

- 웹팩 개발 서버 설정 중 `onBeforeSetupMiddleware` 속성은 서버 내부에서 다른 모든 미들웨어보다 먼저 `사용자 정의 미들웨어`를 실행할 수 있는 기능을 제공합니다.
- 이것을 이해하려면 `Express.js`에 사전 지식이 있으면 유리한데, 익스프레스는 미들웨어 형태로 서버 기능을 확장할 수 있는 프레임워크이다.
- `devServer.onBeforeSetupMiddleware`에 추가하는 것이 바로 이 미들웨어이다.
- webpack.config.js devServer 수정 후, 개발 서버를 실행해보자.

```js
// webpack.config.js
module.exports = {
  //...
  devServer: {
    // ...
    onBeforeSetupMiddleware: (devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      devServer.app.get("/api/keywords", function (req, res) {
        res.json([
          { id: 1, keyword: "이탈리아" },
          { id: 2, keyword: "대한민국" },
        ]);
      });
    },
  },
};
```

- 실행 후에 브라우저에서 `http://localhost:8080/api/keywords`로 접근해보면 응답 데이터를 확인할 수 있다.
- 추가적으로 `axios 라이브러리`를 설치해서 클라이언트쪽에서 직접 api 요청 후에 응답데이터를 활용할 수 있다.

<br />

### proxy 설정

- proxy설정은 실무에서 가장 흔하게 사용하는 속성이다.

```js
// webpack.config.js
module.exports = {
  //...
  devServer: {
    // ...
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
};
```

- 위와 같이 설정을하면 webpack-dev-server에서 발생하는 api 요청에 변화가 생긴다.
- 예로 들어 `/api/users`은 이제 `http://localhost:3000/api/users`로 요청이 된다.

![스크린샷 2022-05-08 오후 8 24 39](https://user-images.githubusercontent.com/64779472/167294041-b55f6ab8-fb18-4a2f-8766-f4a9497698ae.png)

- 먼저, Proxy 설정을 하지 않았을 때 기본적인 webpack-dev-server와 api 서버의 통신 구조이다.
- 여기서 `cors`라는 용어가 나오는데, 이 용어는 `브라우저 보안`과 관계가 있다. 쉽게 이야기하면, 다른 도메인 간에는 자바스크립트 자원을 요청할 수 없다는 의미이다.
- 위 그림에서도 서버에 로그인 관련 api요청을 보냈는데 cors 오류가 나는 것을 확인할 수 있다.
- 뷰, 리액트와 같은 프레임워크를 쓰면 개발 편의상 로컬에 webpack-dev-server를 띄어놓고 개발하는 경우가 많다. 이때, 이러한 문제를 해결하기 위해 proxy 설정을하면 서버에서 해당 요청을 받아준다.

![스크린샷 2022-05-08 오후 8 27 28](https://user-images.githubusercontent.com/64779472/167294103-5c201e08-98c7-4212-a660-fcd46360022b.png)

- cors가 브라우저 보안과 관련있기 때문에 브라우저에서 벗어나 서버에서 서버로 요청한다.
- 실제로 브라우저에서는 `localhost:8080/api/login`으로 요청했지만 중간에 proxy 서버의 활약으로 `domain.com`에서는 같은 도메인(`domain.com`)에서 온 요청으로 인식하여 cors 에러가 나지 않는다.

<br />

```js
// webpack.config.js
module.exports = {
  //...
  devServer: {
    // ...
    proxy: [
      {
        context: ["/auth", "/api"],
        target: "http://localhost:3000",
      },
    ],
  },
};
```

- 다음과 같이 `context` 속성으로 여러 특정 경로를 프록시하려는 경우 배열로 넣어서 사용할 수 있다.

<br />
