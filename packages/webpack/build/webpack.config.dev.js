const webpackConfigBase = require("./webpack.config.base");

module.exports = {
  ...webpackConfigBase,
  mode: "development",
  devServer: {
    port: "30366",
    open: true,
  },
  optimization: {
    minimize: true,
  },
};
