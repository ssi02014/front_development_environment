# 💻 웹팩(Webpack) - 심화편

## 📄 목차

1. [웹팩 개발 서버 - 배경](#웹팩-개발-서버배경)
2. [webpack-dev-server 설치 및 사용](#webpack-dev-server-설치-및-사용)
3. [webpack-dev-server 기본 설정](#webpack-dev-server-기본-설정)
4. [API 연동: 목업 API 1(devServer.onBeforeSetupMiddleware)](#목업-api-onbeforesetupmiddleware)
5. [API 연동: 실제 API 프록시 설정(devServer.proxy)](#proxy-설정)
6. [핫 모듈 리플레이스먼트(HMR) - 배경](#hmr-배경)
7. [핫 모듈 리플레이스먼트(HMR) - 설정](#hmr-설정)
8. [핫 모듈 리플레이스먼트(HMR) - 핫로딩을 지원하는 로더](#핫로딩을-지원하는-로더)
9. [최적화 - production 모드](#production-모드)
10. [최적화 - optimization 최적화](#optimization-최적화)
11. [최적화 - TerserWebpackPlugin](#terserwebpackplugin)
12. [최적화 - 코드스플리팅(entry)](#코드스플리팅-entry)
13. [최적화 - 코드스플리팅(Dynamic Import)](#코드스플리팅-dynamic-import)
14. [최적화 - externals](#externals)

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

## 📝 핫 모듈 리플레이스먼트

### HMR 배경

- 웹팩 개발 서버는 코드의 변화를 감지해서 전체 화면을 갱신하기 때문에 개발 속도를 높일 수 있다. 하지만 어떤 상황에서는 전체 화면을 갱신하는 것이 좀 불편할 수도 있다.
- SPA는 브라우저에서 데이터를 들고 있기 때문에 리프레시 후에 모든 데이터가 초기화 되어 버린다. 혹은 다른 부분을 수정했는데 입력한 폼 데이터가 날아가버리는 경우도 있다.
- 웹팩 개발 서버에서는 전체 화면 갱신을 하지 않고 변경한 모듈만 바꾸는 기능을 제공하는데 이를 핫 모듈 리플레이서먼트(HMR)이라고 한다.

<br />

### HMR 설정

- 설정은 간단하게 devServer.hot 속성에 true을 주면 된다.

```js
// webpack.config.js:
module.exports = {
  devServer = {
    hot: true,
  },
}
```

```js
// sample/app.js
// HMR 실습을 위한 예제
import form from "./form";
import result from "./result";

let resultEl;

document.addEventListener("DOMContentLoaded", async () => {
  const formEl = document.createElement("div");
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);

  resultEl = document.createElement("div");
  resultEl.innerHTML = await result.render();
  document.body.appendChild(resultEl);
});
```

- 위에처럼 `devServer.hot`옵션에 `true`를 주면 웹팩 개발 서버 위에서 `module.hot` 객체가 생성된다.
- 이 객체의 `accept()`메서드는 감시할 모듈과 콜백 함수를 인자로 받는다. 아래 예제에서는 `result.js` 모듈을 감시하고 변경이 있으면 전달할 콜백 함수가 동작하도록 했다.

```js
// ...
if (module.hot) {
  console.log("핫 모듈 켜짐");
  module.hot.accept("./result", () => {
    console.log("result 모듈 변경");
  });
}
```

- 그리고 웹팩 개발 서버를 재 시작하면 `핫 모듈 켜짐` 로그가 찍히고 후에, result.js 파일을 수정하면 `result 모듈 변경` 로그가 찍히는 것을 확인할 수 있다.
- `accept()` 메서드의 두 번째 인자로 넣은 콜백 함수 안에서 변경된 result 모듈을 교체할 수 있다.

```js
//...
if (module.hot) {
  console.log("핫 모듈 켜짐");
  module.hot.accept("./result", async () => {
    resultEl.innerHTML = await result.render();
  });
}
```

- 이제 result.js 코드를 수정하면 result.js를 제외한 다른 모듈들은 초기화되지 않고 result에 해당하는 view만 적용되는 것을 확인할 수 있다.
- 결과적으로 핫 모듈 리플레이스먼트를 사용하면 코드를 변경할 때 전체 페이지가 초기화되는 것이 아니라 변경된 해당 모듈만 변경된다. 따라서 좀 더 개발을 수월하게 한다.

<br />

### 핫로딩을 지원하는 로더

- HMR 인터페이스를 구현한 Loader만이 핫 로딩을 지원하는데 대표적으로 `style-loader`가 있다. css를 수정하면 자동으로 `HMR`이 적용된다.
- 그 외에도 리액트와 같은 경우 따로 설정이 필요한데 `react-hot-loader`와 같이 제공하는 로더가 존재한다.
- 그리고 파일을 지원하는 `file-loader`도 핫 모듈 리플레이스먼트를 지원한다.

<br />

## 📝 최적화

- 코드가 많아지면 번들링되는 결과물도 커지기 마련이다. 거의 메가바이트 단위로 커질 수 있는데 이는 브라우저 성능에 영향을 줄 수 있다.
- 지금부터 번들링한 결과물을 어떻게 최적화할 수 잇는지 알아보자

<br />

### production 모드

- 웹팩에 내장되어 있는 최적화 방법 중 mode 값을 설정하는 방식이 가장 기본이다.
- 세 가지 값이 올 수 있는데 지금까지 설정한 `development`는 디버깅 편의를 위해 아래 두 개 플러그인을 사용한다.

  1. NamedChunksPlugin
  2. NamedModulesPlugin

- `DefinePlugin`을 사용한다면 `process.env.NODE_ENV`값이 `development`로 설정되어 어플리케이션에 전역변수로 주입된다.
- 반면 mode를 `production`으로 설정하면 자바스크립트 결과물을 최소화 하기 위해 다음 일곱 개 플러그인을 사용한다.
  1. FlagDependencyUsagePlugin
  2. FlagIncludedChunksPlugin
  3. ModuleConcatenationPlugin
  4. NoEmitOnErrorsPlugin
  5. OccurrenceOrderPlugin
  6. SideEffectsFlagPlugin
  7. TerserPlugin
- `DefinePlugin`을 사용한다면 `process.env.NODE_ENV` 값이 `production` 으로 설정되어 어플리케이션 전역변수로 들어간다.
- 그럼 환경변수 `NODE_ENV` 값에 따라 모드를 설정하도록 웹팩 설정 코드를 다음과 같이 추가할 수 있겠다.

```js
// webpack.config.js
const mode = process.env.NODE_ENV || "development"; // 기본값을 development로 설정

module.exports = {
  mode,
};
```

- 그리고 빌드 시에 해당 모드로 실행하도록 npm 스크립트를 추가한다.

```json
{
  // ...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --progress --open",
    "build": "webpack",
    "build:dev": "NODE_ENV=development webpack --progress",
    "build:prod": "NODE_ENV=production webpack --progress",
    "lint": "eslint src --fix"
  }
}
```

- `build:prod`로 빌드 해 보면 `main.js`의 파일이 난독화 되있는 바면, `build:dev`로 하면 알아볼 수 있게 빌드되있다. 이처럼 어떤 mode로 빌드하냐에 따라 다른 결과물을 가져올 수 있다.

<br />

### optimization 최적화

- 빌드 과정을 커스터마이징 할 수 잇는 여지를 제공하는데 그것이 바로 `optimization` 속성이다.
- `HtmlWebpackPlugin`이 HTML 파일을 압축한 것처럼 css 파일도 빈칸을 없애는 압축을 할 수 있다. 그러한 기능을 `css-minimizer-webpack-plugin`이 제공한다.
- webpack v4에서는 `optimize-css-assets-webpack-plugin`을 사용했지만 v5부터는 `css-minimizer-webpack-plugin`을 사용한다는 것을 참고하자
- `css-minimizer-webpack-plugin`은 `optimize-css-assets-webpack-plugin`와 기능은 거의 유사하지만 쿼리 문자열을 사용하는 소스 맵 및 assets에서 더 정확하고, 캐싱을 허용하고, 병렬 모드에서 작동한다.

```
설치
yarn add -D css-minimizer-webpack-plugin
```

- 그리고 webpack.config.js에서 optimization.minimizer를 추가한다.

```js
// ...
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      // loader
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    // Plugins
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  // devServer
};
```

- 위에처럼 설정하면 production 모드에서만 CSS가 최적화가 활성화된다.
- 만약 development 모드에서도 활성화하려면 `optimization.minimize` 값을 true를 주면 된다.

```js
module.exports = {
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    minimize: true, // development 모드에서도 최적화 시키기
  },
};
```

- 이제 빌드를 시도해보면 css 파일들도 난독화 된 것을 확인할 수 있다.

<br />

### TerserWebpackPlugin

- `TerserWebpackPlugin`은 자바스크립트 코드를 난독화하고 `debugger`구문을 제공하는 기능을 제공한다.
- 또한, 기본 설정 외에도 `console.log`를 제거하는 옵션도 존재한다. 배포 버전에는 로그를 감추는 것이 좋을 수 있기 때문에 충분히 고려할만한 옵션이다.
- 참고로 `TerserWebpackPlugin`은 webpack5에서도 제공하고 있다.

```
설치
yarn add -D terser-webpack-plugin
```

```js
// webpack.config.js
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    // minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // prod모드에서 콘솔 로그를 제거한다
          },
        },
      }),
    ],
  },
};
```

- optimization.minimizer에다 `new TerserPlugin`을 추가한다. 그리고 `terserOptions`와 `compress`에 `drop_console: true` 속성을 주면 prod모드에서 콘솔 로그를 제거할 수 있다.

<br />

### 코드스플리팅 entry

- html,js,css 코드를 압축하는 것 외에도 아예 결과물을 여러개로 쪼개면 좀 더 브라우저 다운로드 속도를 높일 수 있다.
- 큰 파일 하나를 다운로드 하는것 보다 작은 파일 여러개를 동시에 다운로드하는 것이 더 빠르기 때문이다.
- 이러한 방법 중 가장 단순한 것은 엔트리를 여러개로 분리하는 것이다.

```js
// webpack.config.js
module.exports = {
  entry: {
    main: "./src/app.js",
    result: "./src/result.js",
  },
};
```

- 위에처럼 webpack.config.js의 entry에 result를 추가하고 빌드를 해보면 main.js 뿐만아니라 `result.js`가 추가된 것을 확인할 수 있다.
- 또한 번들된 html을 보면 script태그로 result.js도 추가된 것을 확인할 수 있다.
- 하지만 아직 단점이 존재하는데 중복되는 코드가 존재한다는 것이다. 중복을 제거하는 옵션도 추가해줘야한다. 이러한 기능을 제공하는 것이 `splitChunks`옵션이다.

```js
// webpack.config.js
module.exports = {
  optimization: {
    // minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // prod모드에서 콘솔 로그를 제거한다
          },
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
  },
};
```

- `splitChunks.chunks`는 최적화를 위해 선택될 청크들을 나타낸다. `all`, `async`, `initial` 옵션을 문자열로 제공할 수 있다.
- `all`은 `비동기 청크와 비동기 청크 간에도 청크를 공유`할 수 있음을 의미하므로 강력한 옵션이다.
- 이게 무슨말이냐면 현재 result.js와 main.js에 겹치는 부분이 있다고 했는데 그 부분인 axios 관련 코드이다. 이런 비동기 코드 중복을 제거해줄 수 있다.
- 실제로 production모드로 실행하면 result, main.js와 추가적으로 `595.js`파일이 하나 생성된다.
- result와 main에 axios를 검색해보면 나오지않고 595.js에 axios가 포함된 것을 확인할 수 있다.

<br />

### 코드스플리팅 Dynamic Import

- entry 포인트를 수정해서 코드 스플리팅을 구현할 수 있지만 이는 개발자가 하나하나 수정해줘야되기 때문에 손이 많이간다.
- 이런걸 자동화 시켜주는 기능이 있는데 이를 `Dynamic Import`라고 한다.

```js
// app.js
// import result from './result';

document.addEventListener("DOMContentLoaded", async () => {
  formEl = document.createElement("div");
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);

  // Dynamic Import
  import(/* webpackChunkName: "result" */ "./result").then(
    async ({ default: result }) => {
      resultEl = document.createElement("div");
      resultEl.innerHTML = await result.render();
      document.body.appendChild(resultEl);
    }
  );
});
```

- app.js에서 기존에 import하던 result를 주석처리 하고 밑에 `Dynamic import` 코드를 추가해보자.
- 여기서 주의할 점은 주석으로 `/* webpackChunkName: "result" */`와 같이 추가했다.

```js
module.exports = {
  mode,
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"), // 노드의 절대 경로
    filename: "[name].js",
    chunkFilename: "[name].chunk.js", // 청크 파일 이름 구성
  },
};
```

- 그리고 webpack.config.js에서 `output.chunkFilename`을 추가해줬는데 이는 청크파일 이름 구성을 할 수 있는 옵션이다.
- 기본 설정인 `[id]`는 청크 순서대로 0,1,2,3을 부여한다. 참고로 청크란 하나의 덩아리라는 뜻으로, 코드 스플리팅 시 생성되는 자바스크립트 파일 조각을 의미한다.

<br />

### externals

- 조금만 생각하면 좋은게 axios와 같은 써드파티 라이브러리는 이미 패키지로 제공 될 때 빌드 과정을 거치기 때문에 빌드 프로세스에서 제외하는 것이 좋다.
- 웹팩 설정에서 이러한 기능을 `externals`로 제공한다.

```js
// webpack.config.js
module.exports = {
  externals: {
    axios: "axios",
  },
};
```

- 위와 같이 webpack.config.js에다 `externals`를 추가하면 코드에서 axios를 사용하더라도 번들에 포함하지 않고 빌드한다. 대신 이를 전역 변수로 접근하도록 키로 설정한 `axios`가 그 이름이다.
- axios는 이미 `node_modules`에 위치해 있기 때문에 이를 웹팩 아웃풋 폴더(/dist)에 옮기고 `index.html`에서 로딩해야한다.
- 이때 파일을 복사하는 `CopyWebpackPlugin` 플러그인을 이용할 수 있다.

```
설치
yarn add -D copy-webpack-plugin
```

```js
// webpack.config.js
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  externals: {
    axios: "axios",
  },
  plugins: [
    // plugins
    new CopyPlugin({
      patterns: [
        {
          from: "./node_modules/axios/dist/axios.min.js",
          to: "./axios.min.js",
        },
      ],
    }),
  ],
};
```

- 위에처럼 webpack.config.js에다 `CopyPlugin`을 추가한다. `from`은 파일을 복사하는 경로이다. `to`는 출력 경로이다.

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="ko">
  <head>
    <!-- meta -->
    <script type="text/javascript" src="axios.min.js" defer></script>
    <title>타이틀<%= env %></title>
  </head>
  <body>
    <!-- 이것은 주석입니다. -->
  </body>
</html>
```

- 추가적으로 `index.html`파일에다 script태그로 `axios.min.js`를 로딩하는 코드를 추가해야 한다.

<br />

- 사실 이런 externals와 같은 최적화는 개발 초기에는 잘 하지 않는다. 나중에 배포 직전에 번들 크기가 너무 커졌을 때 번들 크기를 줄이기위해 사용하는 방법이다. 하지만 기본적인 방법은 숙지하고 있으면 좋다.
- 그리고 `CopyWebpackPlugin`은 `이미지`, `파비콘` 같은 정적 파일을 하나의 디렉토리에 넣어서 빌드할 때도 자주 사용한다.

```js
// webpack.config.js
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  externals: {
    axios: "axios",
  },
  plugins: [
    // plugins
    new CopyPlugin({
      patterns: [
        {
          from: "./node_modules/axios/dist/axios.min.js",
          to: "./axios.min.js",
        },
        {
          from: "./src/assets",
          to: "./assets",
        },
      ],
    }),
  ],
};
```

<br />
