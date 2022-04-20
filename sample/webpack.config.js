const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"), // 노드의 절대 경로
    filename: "[name].js",
    // [name]부분에 entry에서 설정한 key, 즉 main이 들어가게 된다.
    // 왜 이렇게 했냐? entry가 여러개일 경우 output도 여러개여야 하는데 이때 output이름을 동적으로 만들 수 있다.
  },
};
