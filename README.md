# 💻 프론트엔드 개발환경의 이해(webpack, babel, eslint)

### [📖 김정환님 블로그](https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html)

### [📖 강의에서 사용된 패키지 정보](https://github.com/jeonghwan-kim/lecture-frontend-dev-env/blob/master/package.json)

<br />

## ✅ 목차

1. [NPM](https://github.com/ssi02014/front_development_environment/tree/master/npm)
2. [웹팩(Webpack) - 기본편](https://github.com/ssi02014/front_development_environment/tree/master/webpack_basic)

## 👀 참고 사항

### 1. asset-modules

- [asset-modules webpack 공식 사이트 참고](https://webpack.js.org/guides/asset-modules)
- webpack v5 이후부터는 file-loader와 url-loader는 기본 모듈로 채택되면서 더이상 호환되지 않는다.
- file-loader와 url-loader는 각각 asset/resource, asset/inline로 대체되었다.
- asset/resource와 asset/inline을 조건 상태에따라서 자동으로 선택하는 asset도 있다.
