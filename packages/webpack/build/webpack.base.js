const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  //   entry: "./src/index.js",
  entry: "./main.tsx",
  output: {
    // filename: "bundle.js",
    filename: "static/js/[name].[chunkhash:8].js",
    clean: true,
    publicPath: "/", // 打包后文件的公共前缀路径
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "../src"),
    },
    extensions: [".js", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: {
          loader: "babel-loader",
          options: {
            // 预设执行顺序由右往左,所以先处理ts,再处理jsx
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /.(css|less)$/, //匹配 css和less 文件
        include: [path.resolve(__dirname, "../src")],
        use: [
          //   "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/images/[name].[contenthash:8][ext]", // 文件输出目录和命名
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "构建网页",
      template: "./index.html",
      hash: true,
      inject: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"), // 复制public下文件
          to: path.resolve(__dirname, "../dist"), // 复制到dist目录中
          filter: (source) => {
            return !source.includes("index.html"); // 忽略index.html
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  cache: {
    type: "filesystem",
  },
};
