import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration } from "webpack";
import "webpack-dev-server"; // 引入webpack-dev-server类型

// 手动定义__dirname（适用于ES模块）
const __dirname = path.resolve();

const config: Configuration = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
          options: {
            configFile: path.resolve(__dirname, ".swcrc"),
          },
        },
      },
      {
        // 处理SCSS文件
        test: /\.s[ac]ss$/i,
        use: [
          // 将JS字符串生成为style节点
          "style-loader",
          // 将CSS转化成CommonJS模块
          "css-loader",
          // 将SCSS编译成CSS
          "sass-loader",
        ],
      },
      {
        // 保留CSS处理规则（可选，如果你仍需要处理纯CSS文件）
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".scss", ".sass"], // 添加SCSS扩展名
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
  devServer: {
    static: path.join(__dirname, "public"),
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true, // 支持React Router
  },
  devtool:
    process.env.NODE_ENV === "production"
      ? "source-map"
      : "eval-cheap-module-source-map",
};

export default config;
