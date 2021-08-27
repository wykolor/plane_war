const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, "./main.js"),
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "./dist")
  },
  devtool: "source-map",
  devServer: {
    static: path.resolve(__dirname, "./dist")
  }
}