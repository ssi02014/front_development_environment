const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleDateString()}
        Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
        Author: ${childProcess.execSync("git config user.name")}}
      `,
    }),
    new webpack.DefinePlugin({
      EXAMPLE: "1+1",
      STRING_EXAMPLE: JSON.stringify("string example"),
      "api.domain": JSON.stringify("http://dev.api.domain.com"),
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "(배포용)",
      },
      minify: process.env.NODE_ENV === "production" && {
        collapseWhitespace: true, // 빈칸 제거
        removeComments: true, // 주석제거
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
