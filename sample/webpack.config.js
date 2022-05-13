const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const mode = process.env.NODE_ENV || 'development'; // 기본값 development
module.exports = {
  mode,
  entry: {
    main: './src/app.js',
    // result: './src/result.js',
  },
  output: {
    path: path.resolve('./dist'), // 노드의 절대 경로
    filename: '[name].js',
    // [name]부분에 entry에서 설정한 key, 즉 main이 들어가게 된다.
    // 왜 이렇게 했냐? entry가 여러개일 경우 output도 여러개여야 하는데 이때 output이름을 동적으로 만들 수 있다.
    chunkFilename: '[name].chunk.js', // 청크 파일 이름 구성
  },
  module: {
    rules: [
      {
        // test에다 처리할 파일의 패턴을 명시하면 해당하는 파일들을 use에 설정한 로더에의해 처리된다.
        // 만약 파일이 여러 개라면 당연히 로더도 여러 번 실행된다
        // 배열로 설정하면 뒤에서부터 앞으로 로더가 동작한다.
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 40 * 1024,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
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
    // splitChunks: {
    //   chunks: 'all',
    // },
  },
  externals: {
    axios: 'axios',
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleDateString()}
        Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
        Author: ${childProcess.execSync('git config user.name')}}
      `,
    }),
    new webpack.DefinePlugin({
      EXAMPLE: '1+1',
      STRING_EXAMPLE: JSON.stringify('string example'),
      'api.domain': JSON.stringify('http://dev.api.domain.com'),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '(배포용)',
      },
      minify: process.env.NODE_ENV === 'production' && {
        collapseWhitespace: true, // 빈칸 제거
        removeComments: true, // 주석제거
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './node_modules/axios/dist/axios.min.js',
          to: './axios.min.js',
        },
        {
          from: './src/assets',
          to: './assets',
        },
      ],
    }),
    new ESLintPlugin(),
  ],
  devServer: {
    static: false,
    client: {
      overlay: true,
    },
    compress: true,
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    allowedHosts: ['host.com'],
    proxy: {
      '/api': 'http://localhost:8000',
    },
    hot: true,
    // onBeforeSetupMiddleware: devServer => {
    //   if (!devServer) {
    //     throw new Error('webpack-dev-server is not defined');
    //   }

    //   devServer.app.get('/api/keywords', function (req, res) {
    //     res.json([
    //       { id: 1, keyword: '이탈리아' },
    //       { id: 2, keyword: '대한민국' },
    //     ]);
    //   });
    // },
  },
};
