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
  module: {
    rules: [
      {
        //test에다 처리할 파일의 패턴을 명시하면 해당하는 파일들을 use에 설정한 로더에의해 처리된다.
        // 만약 파일이 여러 개라면 당연히 로더도 여러 번 실행된다
        // 배열로 설정하면 뒤에서부터 앞으로 로더가 동작한다.
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 40 * 1024,
          },
        },
      },
    ],
  },
};
