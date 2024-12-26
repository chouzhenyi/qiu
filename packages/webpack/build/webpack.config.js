const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const postcssConfig = require("./postcss.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const basePath = path.resolve(__dirname, "../");
module.exports = {
  mode: "development",
  entry: path.resolve(basePath, "./src/index.js"),
  output: {
    path: path.resolve(basePath, "./dist"),
    filename: "bundle.[hash:8].js",
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    port: "3000",
    // open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(basePath, "src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(basePath, "public/index.html"),
      title: "webpack",
    }),
    new webpack.DefinePlugin({
      AD: "'护舒宝'",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          // "style-loader",
          { loader: "css-loader", options: { sourceMap: true } },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ...postcssConfig,
              },
            },
          },
        ],
      },
      {
        test: /\.less/i,
        use: [
          //   "style-loader",
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ...postcssConfig,
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset",
        generator: {
          filename: "assets/[hash][ext]",
        },
      },
    ],
  },
};
