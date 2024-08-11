const baseConfig = require("./webpack.base");
const { merge } = require("webpack-merge");
module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    host: "localhost",
    port: "8888",
    open: true,
    historyApiFallback: true,
  },
});
