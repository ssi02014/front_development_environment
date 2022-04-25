/*!
 * 
 *         Build Date: 2022. 4. 25.
 *         Commit Version: a264062
 *
 *         Author: Gromit
 * }
 *
 */
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.css":
/*!**********************!*\
  !*** ./src/main.css ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lecture-example/./src/main.css?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_MainController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/MainController.js */ \"./src/controllers/MainController.js\");\n/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.css */ \"./src/main.css\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  new _controllers_MainController_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n});\n\n\n//# sourceURL=webpack://lecture-example/./src/app.js?");

/***/ }),

/***/ "./src/controllers/MainController.js":
/*!*******************************************!*\
  !*** ./src/controllers/MainController.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MainController)\n/* harmony export */ });\n/* harmony import */ var _views_FormView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/FormView.js */ \"./src/views/FormView.js\");\n/* harmony import */ var _views_ResultView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views/ResultView.js */ \"./src/views/ResultView.js\");\n/* harmony import */ var _views_TabView_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/TabView.js */ \"./src/views/TabView.js\");\n/* harmony import */ var _views_KeywordView_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../views/KeywordView.js */ \"./src/views/KeywordView.js\");\n/* harmony import */ var _views_HistoryView_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../views/HistoryView.js */ \"./src/views/HistoryView.js\");\n/* harmony import */ var _models_SearchModel_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../models/SearchModel.js */ \"./src/models/SearchModel.js\");\n/* harmony import */ var _models_KeywordModel_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../models/KeywordModel.js */ \"./src/models/KeywordModel.js\");\n/* harmony import */ var _models_HistoryModel_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../models/HistoryModel.js */ \"./src/models/HistoryModel.js\");\n\n\n\n\n\n\n\n\n\n\nclass MainController {\n  constructor() {\n    const formViewEl = document.querySelector(\"form\");\n    const tabViewEl = document.querySelector(\"#tabs\");\n    const keywordViewEl = document.querySelector(\"#search-keyword\");\n    const historyViewEl = document.querySelector(\"#search-history\");\n    const resultViewEl = document.querySelector(\"#search-result\");\n\n    this.formView = new _views_FormView_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](formViewEl)\n      .on(\"@submit\", (e) => this.search(e.detail.input))\n      .on(\"@reset\", () => this.renderView());\n\n    this.tabView = new _views_TabView_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](tabViewEl).on(\"@change\", (e) =>\n      this.onChangeTab(e.detail.tabName)\n    );\n\n    this.keywordView = new _views_KeywordView_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](keywordViewEl).on(\"@click\", (e) =>\n      this.search(e.detail.keyword)\n    );\n\n    this.historyView = new _views_HistoryView_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](historyViewEl)\n      .on(\"@click\", (e) => this.search(e.detail.keyword))\n      .on(\"@remove\", (e) => this.onRemoveHistory(e.detail.keyword));\n\n    this.resultView = new _views_ResultView_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](resultViewEl);\n\n    this.selectedTab = \"추천 검색어\";\n    this.renderView();\n  }\n\n  async search(query) {\n    this.formView.setValue(query);\n    const data = await _models_SearchModel_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].list(query);\n    this.onSearchResult(data);\n  }\n\n  onSearchResult(data) {\n    this.tabView.hide();\n    this.keywordView.hide();\n    this.historyView.hide();\n    this.resultView.mount(data);\n  }\n\n  onChangeTab(tabName) {\n    this.selectedTab = tabName;\n    this.renderView();\n  }\n\n  async renderView() {\n    this.tabView.setActiveTab(this.selectedTab);\n\n    if (this.selectedTab === \"추천 검색어\") {\n      const data = await _models_KeywordModel_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"].list();\n      this.keywordView.mount(data);\n      this.historyView.hide();\n    } else {\n      const data = await _models_HistoryModel_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"].list();\n      this.historyView.mount(data).bindRemoveBtn();\n      this.keywordView.hide();\n    }\n\n    this.resultView.hide();\n  }\n\n  onRemoveHistory(keyword) {\n    _models_HistoryModel_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"].remove(keyword);\n    this.renderView();\n  }\n}\n\n\n//# sourceURL=webpack://lecture-example/./src/controllers/MainController.js?");

/***/ }),

/***/ "./src/models/HistoryModel.js":
/*!************************************!*\
  !*** ./src/models/HistoryModel.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  data: [\n    { keyword: \"검색기록2\", date: \"12.03\" },\n    { keyword: \"검색기록1\", date: \"12.02\" },\n    { keyword: \"검색기록0\", date: \"12.01\" },\n  ],\n\n  list() {\n    return Promise.resolve(this.data);\n  },\n\n  add(keyword = \"\") {\n    keyword = keyword.trim();\n    if (!keyword) return;\n    if (this.data.some((item) => item.keyword === keyword)) {\n      this.remove(keyword);\n    }\n\n    const date = \"12.31\";\n    this.data = [\n      {\n        keyword,\n        date,\n      },\n      ...this.data,\n    ];\n  },\n\n  remove(keyword) {\n    this.data = this.data.filter((item) => item.keyword !== keyword);\n  },\n});\n\n\n//# sourceURL=webpack://lecture-example/./src/models/HistoryModel.js?");

/***/ }),

/***/ "./src/models/KeywordModel.js":
/*!************************************!*\
  !*** ./src/models/KeywordModel.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  data: [\n    { keyword: \"이탈리아\" },\n    { keyword: \"세프의요리\" },\n    { keyword: \"제철\" },\n    { keyword: \"홈파티\" },\n  ],\n  list() {\n    return new Promise((res) => {\n      setTimeout(() => {\n        res(this.data);\n      }, 200);\n    });\n  },\n});\n\n\n//# sourceURL=webpack://lecture-example/./src/models/KeywordModel.js?");

/***/ }),

/***/ "./src/models/SearchModel.js":
/*!***********************************!*\
  !*** ./src/models/SearchModel.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst data = [\n  {\n    id: 1,\n    name: \"[버거] 치즈버거처럼 생긴 새우버거\",\n    image:\n      \"https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60\",\n  },\n  {\n    id: 2,\n    name: \"[피자] 썸네일 주소가 잘못된 상품\",\n    image: \"http://foo.bar/image.jpg\",\n  },\n];\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  list() {\n    return new Promise((res) => {\n      setTimeout(() => {\n        res(data);\n      }, 200);\n    });\n  },\n});\n\n\n//# sourceURL=webpack://lecture-example/./src/models/SearchModel.js?");

/***/ }),

/***/ "./src/views/FormView.js":
/*!*******************************!*\
  !*** ./src/views/FormView.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FormView)\n/* harmony export */ });\n/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View.js */ \"./src/views/View.js\");\n\n\nclass FormView extends _View_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(el) {\n    super(el);\n    this._inputEl = el.querySelector(\"[type=text]\");\n    this._resetEl = el.querySelector(\"[type=reset]\");\n    this.showResetBtn(false);\n    this.bindEvents();\n    return this;\n  }\n\n  showResetBtn(show = true) {\n    this._resetEl.style.display = show ? \"block\" : \"none\";\n  }\n\n  bindEvents() {\n    this.on(\"submit\", (e) => e.preventDefault());\n    this._inputEl.addEventListener(\"keyup\", (e) => this.onKeyup(e));\n    this._resetEl.addEventListener(\"click\", () => this.onClickReset());\n  }\n\n  onKeyup(e) {\n    const enter = 13;\n    this.showResetBtn(this._inputEl.value.length);\n    if (!this._inputEl.value.length) this.emit(\"@reset\");\n    if (e.keyCode !== enter) return;\n    this.emit(\"@submit\", { input: this._inputEl.value });\n  }\n\n  onClickReset() {\n    this.emit(\"@reset\");\n    this.showResetBtn(false);\n  }\n\n  setValue(value = \"\") {\n    this._inputEl.value = value;\n    this.showResetBtn(this._inputEl.value.length);\n  }\n}\n\n\n//# sourceURL=webpack://lecture-example/./src/views/FormView.js?");

/***/ }),

/***/ "./src/views/HistoryView.js":
/*!**********************************!*\
  !*** ./src/views/HistoryView.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ HistoryView)\n/* harmony export */ });\n/* harmony import */ var _KeywordView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KeywordView.js */ \"./src/views/KeywordView.js\");\n\n\nclass HistoryView extends _KeywordView_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(el) {\n    super(el);\n    this._messages.NO_KEYWORDS = \"검색 이력이 없습니다\";\n\n    return this;\n  }\n\n  getKeywordsHtml(data) {\n    return (\n      data.reduce((html, item) => {\n        html += `<li data-keyword=\"${item.keyword}\">\n        ${item.keyword} \n        <span class=\"date\">${item.date}</span>\n        <button class=\"btn-remove\"></button>\n        </li>`;\n        return html;\n      }, '<ul class=\"HistoryView\">') + \"</ul>\"\n    );\n  }\n\n  bindRemoveBtn() {\n    Array.from(this.el.querySelectorAll(\"button.btn-remove\")).forEach((btn) => {\n      btn.addEventListener(\"click\", (e) => {\n        e.stopPropagation();\n        this.onRemove(btn.parentElement.dataset.keyword);\n      });\n    });\n  }\n\n  onRemove(keyword) {\n    this.emit(\"@remove\", { keyword });\n  }\n}\n\n\n//# sourceURL=webpack://lecture-example/./src/views/HistoryView.js?");

/***/ }),

/***/ "./src/views/KeywordView.js":
/*!**********************************!*\
  !*** ./src/views/KeywordView.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ KeywordView)\n/* harmony export */ });\n/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View.js */ \"./src/views/View.js\");\n\n\nclass KeywordView extends _View_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(el) {\n    super(el);\n\n    this._messages = {\n      NO_KEYWORDS: \"추천 검색어가 없습니다\",\n    };\n\n    return this;\n  }\n\n  mount(data = []) {\n    this.el.innerHTML = data.length\n      ? this.getKeywordsHtml(data)\n      : this._messages.NO_KEYWORDS;\n    this.show();\n    this._bindClickEvent();\n    return this;\n  }\n\n  getKeywordsHtml(data) {\n    return (\n      data.reduce((html, item, index) => {\n        html += `<li data-keyword=\"${item.keyword}\"><span class=\"number\">${\n          index + 1\n        }</span>${item.keyword}</li>`;\n        return html;\n      }, '<ul class=\"KeywordView\">') + \"</ul>\"\n    );\n  }\n\n  _bindClickEvent() {\n    Array.from(this.el.querySelectorAll(\"li\")).forEach((li) => {\n      li.addEventListener(\"click\", (e) => this._onClickKeyword(e));\n    });\n  }\n\n  _onClickKeyword(e) {\n    const { keyword } = e.currentTarget.dataset;\n    this.emit(\"@click\", { keyword });\n  }\n}\n\n\n//# sourceURL=webpack://lecture-example/./src/views/KeywordView.js?");

/***/ }),

/***/ "./src/views/ResultView.js":
/*!*********************************!*\
  !*** ./src/views/ResultView.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ResultView)\n/* harmony export */ });\n/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View.js */ \"./src/views/View.js\");\n/* harmony import */ var _images_default_image_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../images/default-image.jpg */ \"./src/images/default-image.jpg\");\n\n\n\nclass ResultView extends _View_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(el) {\n    super(el);\n\n    this.messages = {\n      NO_RESULT: \"검색 결과가 없습니다\",\n    };\n  }\n\n  mount(data = []) {\n    this.el.innerHTML = `<div class=\"ResultView\">\n      ${data.length ? this.getSearchResultsHtml(data) : this.messages.NO_RESULT}\n    </div>`;\n    this.show();\n  }\n\n  getSearchResultsHtml(data) {\n    return (\n      data.reduce((html, item) => {\n        html += this.getSearchItemHtml(item);\n        return html;\n      }, \"<ul>\") + \"</ul>\"\n    );\n  }\n\n  getSearchItemHtml(item) {\n    return `<li>\n      <img src=\"${item.image}\" onerror=\"this.src='${_images_default_image_jpg__WEBPACK_IMPORTED_MODULE_1__}'\"/>\n      <p>${item.name}</p>\n    </li>`;\n  }\n}\n\n\n//# sourceURL=webpack://lecture-example/./src/views/ResultView.js?");

/***/ }),

/***/ "./src/views/TabView.js":
/*!******************************!*\
  !*** ./src/views/TabView.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TabView)\n/* harmony export */ });\n/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View.js */ \"./src/views/View.js\");\n\n\nclass TabView extends _View_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(el) {\n    super(el);\n\n    this.mount();\n    this.bindEvents();\n  }\n\n  mount() {\n    this.el.innerHTML = `<ul class=\"TabView\">\n      <li>추천 검색어</li>\n      <li>최근 검색어</li>\n    </ul>`;\n  }\n\n  get tabItems() {\n    return Array.from(this.el.children[0].children);\n  }\n\n  bindEvents() {\n    this.tabItems.forEach((li) => {\n      li.addEventListener(\"click\", () => this.onClick(li.innerHTML));\n    });\n  }\n\n  onClick(tabName) {\n    this.setActiveTab(tabName);\n    this.emit(\"@change\", { tabName });\n  }\n\n  setActiveTab(tabName) {\n    this.tabItems.forEach((li) => {\n      li.className = li.innerHTML === tabName ? \"active\" : \"\";\n    });\n    this.show();\n  }\n}\n\n\n//# sourceURL=webpack://lecture-example/./src/views/TabView.js?");

/***/ }),

/***/ "./src/views/View.js":
/*!***************************!*\
  !*** ./src/views/View.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ View)\n/* harmony export */ });\nclass View {\n  constructor(el) {\n    if (!el) throw el;\n\n    this.el = el;\n    return this;\n  }\n\n  on(event, handler) {\n    this.el.addEventListener(event, handler);\n    return this;\n  }\n\n  emit(event, data) {\n    const evt = new CustomEvent(event, {\n      detail: data,\n    });\n    this.el.dispatchEvent(evt);\n    return this;\n  }\n\n  hide() {\n    this.el.style.display = \"none\";\n    return this;\n  }\n\n  show() {\n    this.el.style.display = \"\";\n    return this;\n  }\n}\n\n\n//# sourceURL=webpack://lecture-example/./src/views/View.js?");

/***/ }),

/***/ "./src/images/default-image.jpg":
/*!**************************************!*\
  !*** ./src/images/default-image.jpg ***!
  \**************************************/
/***/ ((module) => {

eval("module.exports = \"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBkRXhpZgAATU0AKgAAAAgABAEGAAMAAAABAAIAAAESAAMAAAABAAEAAAEoAAMAAAABAAIAAIdpAAQAAAABAAAAPgAAAAAAAqACAAQAAAABAAACWKADAAQAAAABAAABkAAAAAD/4QkhaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiLz4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+AP/tADhQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAADhCSU0EJQAAAAAAENQdjNmPALIE6YAJmOz4Qn7/4g0YSUNDX1BST0ZJTEUAAQEAAA0IYXBwbAIQAABtbnRyUkdCIFhZWiAH4wALAAsADAAwAAhhY3NwQVBQTAAAAABBUFBMAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWFwcGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFkZXNjAAABUAAAAGJkc2NtAAABtAAAAe5jcHJ0AAAD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1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwACAgICAgIDAgIDBAMDAwQFBAQEBAUHBQUFBQUHCAcHBwcHBwgICAgICAgICgoKCgoKCwsLCwsNDQ0NDQ0NDQ0N/9sAQwECAgIDAwMGAwMGDQkHCQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0N/90ABAAm/9oADAMBAAIRAxEAPwD9yKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9D9yKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9H9yKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9L9yKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9P9yKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9T9yKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9X9yKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAq1ZxpLcpHIMqc5H0BqrV3Tv+PyP/AIF/I0AbX9nWf/PP/wAeP+NH9nWf/PP/AMeP+NWZnMcLyL1VSRn2rC/ta5/up+R/xoA1P7Os/wDnn/48f8aP7Os/+ef/AI8f8ay/7Wuf7qfkf8aP7Wuf7qfkf8aANT+zrP8A55/+PH/Gj+zrP/nn/wCPH/Gsv+1rn+6n5H/Gj+1rn+6n5H/GgDU/s6z/AOef/jx/xo/s6z/55/8Ajx/xrL/ta5/up+R/xo/ta5/up+R/xoA1P7Os/wDnn/48f8aP7Os/+ef/AI8f8ay/7Wuf7qfkf8aP7Wuf7qfkf8aANT+zrP8A55/+PH/Gj+zrP/nn/wCPH/Gsv+1rn+6n5H/Gj+1rn+6n5H/GgDU/s6z/AOef/jx/xo/s6z/55/8Ajx/xrL/ta5/up+R/xo/ta5/up+R/xoA1P7Os/wDnn/48f8aP7Os/+ef/AI8f8ay/7Wuf7qfkf8aP7Wuf7qfkf8aANT+zrP8A55/+PH/Gj+zrP/nn/wCPH/Gsv+1rn+6n5H/Gj+1rn+6n5H/GgDU/s6z/AOef/jx/xo/s6z/55/8Ajx/xrL/ta5/up+R/xo/ta5/up+R/xoA1P7Os/wDnn/48f8aP7Os/+ef/AI8f8ay/7Wuf7qfkf8aP7Wuf7qfkf8aANT+zrP8A55/+PH/Gj+zrP/nn/wCPH/Gsv+1rn+6n5H/Gj+1rn+6n5H/GgDU/s6z/AOef/jx/xrnZ1CTSIvAVmA+gNdeK5K5/4+Zf99v50AQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf//W/ciiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKu6d/x+R/8AAv5GqVXdO/4/I/8AgX8jQB0F1/x7S/7jfyrkq626/wCPaX/cb+VclQAUUUUAFFFFABRTlR3O1AWPoBmp/sd1jPlN+VAFainMjocOpU+hGKbQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAdoOlclc/8AHzL/AL7fzrrR0rkrn/j5l/32/nQBBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//1/3IooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACrunf8fkf/AAL+RqlV3Tv+PyP/AIF/I0AdBdf8e0v+438q5Kutuv8Aj2l/3G/lXJUAFFFFABWnZWHnASy8J2Hc/wD1qqWsP2idYz06n6CurAAGBwBQA1I0jXbGoUegp9FFADHRJF2uoYehrCvbDyQZYeU7juP/AK1dBSEAjB6GgDjKKs3cH2edox06j6Gq1ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHaDpXJXP8Ax8y/77fzrrR0rkrn/j5l/wB9v50AQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/0P3IooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACrunf8fkf/AAL+RqlV3Tv+PyP/AIF/I0AdBdf8e0v+438q5Kutuv8Aj2l/3G/lXJUAFFFFAGvpCjzJG7hQPzrdrntLkC3BQ/xrx9RXQ0AFFFFABRRRQBh6uBvjbuQR+VY9aeqyBpwg/gHP1NZlABRRRQAUUUUAFFFFABRT40aVwiDJPSkZWRijDBHBFADaKKKACiiigDtB0rkrn/j5l/32/nXWjpXJXP8Ax8y/77fzoAgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9H9yKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAq7p3/H5H/wAC/kapVd07/j8j/wCBfyNAHQXX/HtL/uN/KuSrrbr/AI9pf9xv5VyVABRRRQA5HZGDqcFTkV1VtcJcxh14Pcehrk6limkhffGcGgDr6KyIdVjIxMpU+o5FWv7Rs8Z8z9D/AIUAXaguLhLeMu3XsPU1Qm1WMDEKlj6ngVjSzSTvvkOT/KgBju0jl25LHJptFFABRRRQAUUUUAFABJwKK29Os8YuJRz/AAD+tAFmxsxbpvcfvGHPsPSmahZ+cvnRj516j1H+NadFAHF0Vr6jZ7CbiIfKfvD0PrWRQAUUUUAdoOlclc/8fMv++38660dK5K5/4+Zf99v50AQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf//S/ciiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKu6d/x+R/8AAv5GqVXdO/4/I/8AgX8jQB0F1/x7S/7jfyrkq626/wCPaX/cb+VclQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUVatLZrmTaOFH3j7UAWLCz89vNkH7tf1P+FdFTURY1CIMAcAU6gAooooAQgMCCMg9RXM3tobaTK/6tuh9PaunqOWJJozG4yDQBx9FT3ED28hjf8AA+oqCgDtB0rkrn/j5l/32/nXWjpXJXP/AB8y/wC+386AIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0/3IooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACrunf8fkf/AAL+RqlV3Tv+PyP/AIF/I0AdBdf8e0v+438q5Kutuv8Aj2l/3G/lXJUAFFFFABRRRQAUUUUAFFFOVWdgiDJPAFAEkEL3EgjTv1PoKbLE8LmNxgiultLVbaPHVj94029tBcpleJF6H19qAOYopSCpKsMEcEUKpYhVGSeAKAJIYnmkEaDk/pXUwQJbxiNPxPqahs7QW0fPLt94/wBKuUAFFFFABRRRQAUUUUAVbu2W5j2nhhyp9DXLujRsUcYI4IrsqzdQs/PXzYx+8X9RQBpDpXJXP/HzL/vt/OutHSuSuf8Aj5l/32/nQBBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/9T9yKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAq7p3/H5H/wAC/kapVd07/j8j/wCBfyNAHQXX/HtL/uN/KuSrrbr/AI9pf9xv5VyVABRRRQAUUUUAFFFFABXQ6fZ+SvmyD526D0H+NVtOs9xFxKOB90evvW5QAUUUUAZWo2fmDz4h8w+8B3H+NYkUjRSLInVTXYVg6jZ+WTPEPlP3h6H/AAoA17edLiMSL9CPQ1PXKWty1tJvHKnhh6iuojkSVBIhyrcigB9FFFABRRRQAUUUUAFFFFAAOlclc/8AHzL/AL7fzrrR0rkrn/j5l/32/nQBBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//1f3IooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACrunf8fkf/AAL+RqlV3Tv+PyP/AIF/I0AdBdf8e0v+438q5Kutuv8Aj2l/3G/lXJUAFFFFABRRRQAVesbQ3D7m/wBWvX39qgtrd7mQIvTufQV1UUaRII0GAKAHAADA4ApaKKACiiigApCAwIIyD1FLRQBzN7aG2fK/6tuh9Palsbw277H/ANW3X2PrXQyxpMhjcZBrl7m3e2kKN07H1FAHWAgjI6GisPTrzaRbynj+Ent7VuUAFFFFABRRRQAUUUUAA6VyVz/x8y/77fzrrR0rkrn/AI+Zf99v50AQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/W/ciiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKu6d/x+R/8AAv5GqVXdO/4/I/8AgX8jQB0F1/x7S/7jfyrkq626/wCPaX/cb+VclQAUUUUAFPjRpHCIMk8CmAZ4FdJYWn2dN7j943X2HpQBPa2y20YQck8sfU1ZoooAKKKKACiiigAooooAKr3NulzGUbgj7p9DViigDjpI3icxuMMtb2n3nnL5Mh+deh9R/jUl9aC4Tcn+sXp7+1c4C8b5GVZT+IIoA7KiqdndLcx5PDr94f1q5QAUUUUAFFFFAAOlclc/8fMv++38660dK5K5/wCPmX/fb+dAEFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH/1/3IooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACrunf8fkf/AAL+RqlV3Tv+PyP/AIF/I0AdBdf8e0v+438q5Kutuv8Aj2l/3G/lXJUAFFFaNhZ+e/mSD92v6n0oAtadZ9LiUf7oP8/8K2aKKACiiigAooooAKKKKACiiigAooooAKyNRs94NxEPmH3h6j1rXooA5CGZ4JBInUfqK6mCdLiMSJ+I9DWLqFn5R86IfITyPQ/4VVtLlraTcOVP3h7UAdVRTUdZFDocg8g06gAooooAB0rkrn/j5l/32/nXWjpXJXP/AB8y/wC+386AIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0P3IooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACrunf8fkf/AAL+RqlV3Tv+PyP/AIF/I0AdBdf8e0v+438q5Kutuv8Aj2l/3G/lXJUAWbW2a5k2jhRyx9BXUoixoEQYA4Fc9b6gLeMRpEPc55J/Kp/7Xf8A55j86ANyisP+13/55j86P7Xf/nmPzoA3KKw/7Xf/AJ5j86P7Xf8A55j86ANyisP+13/55j86P7Xf/nmPzoA3KKw/7Xf/AJ5j86P7Xf8A55j86ANyisP+13/55j86P7Xf/nmPzoA3KKw/7Xf/AJ5j86P7Xf8A55j86ANyisP+13/55j86P7Xf/nmPzoA22UMCrDIPBFcxeWjW0nHKN90/0q5/a7/88x+dRy6l50ZjkiBB9+n6UAMsLzyG8uQ/u2P5H1ro64ur8OozwxiMBWA6bs5x+dAHS0Vz/wDa1x/dT8j/AI0f2tcf3U/I/wCNAHQDpXJXP/HzL/vt/OutHSuSuf8Aj5l/32/nQBBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/9H9yKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAq7p3/H5H/wAC/kapVYtZVguFlfJC56deQRQB1EqeZG8ecbgRn61k/wBkH/nr/wCO/wD16n/ta3/uv+Q/xo/ta3/uv+Q/xoAg/sg/89f/AB3/AOvR/ZB/56/+O/8A16n/ALWt/wC6/wCQ/wAaP7Wt/wC6/wCQ/wAaAIP7IP8Az1/8d/8Ar0f2Qf8Anr/47/8AXqf+1rf+6/5D/Gj+1rf+6/5D/GgCD+yD/wA9f/Hf/r0f2Qf+ev8A47/9ep/7Wt/7r/kP8aP7Wt/7r/kP8aAIP7IP/PX/AMd/+vR/ZB/56/8Ajv8A9ep/7Wt/7r/kP8aP7Wt/7r/kP8aAIP7IP/PX/wAd/wDr0f2Qf+ev/jv/ANep/wC1rf8Auv8AkP8AGj+1rf8Auv8AkP8AGgCD+yD/AM9f/Hf/AK9H9kH/AJ6/+O//AF6n/ta3/uv+Q/xo/ta3/uv+Q/xoAg/sg/8APX/x3/69H9kH/nr/AOO//Xqf+1rf+6/5D/Gj+1rf+6/5D/GgCD+yD/z1/wDHf/r0f2Qf+ev/AI7/APXqf+1rf+6/5D/Gj+1rf+6/5D/GgCD+yD/z1/8AHf8A69H9kH/nr/47/wDXqf8Ata3/ALr/AJD/ABo/ta3/ALr/AJD/ABoAg/sg/wDPX/x3/wCvR/ZB/wCev/jv/wBep/7Wt/7r/kP8aP7Wt/7r/kP8aAIP7IP/AD1/8d/+vR/ZB/56/wDjv/16n/ta3/uv+Q/xo/ta3/uv+Q/xoA065K5/4+Zf99v51tf2tb/3X/If41hTOJJXkHRmJGfc0AR0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf//S/ciiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//T/ciiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//U/ciiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//V/ciiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//W/ciiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//X/ciiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Z\";\n\n//# sourceURL=webpack://lecture-example/./src/images/default-image.jpg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;