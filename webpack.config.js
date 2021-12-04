const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./packages/core/src/index.ts",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Dynamically connect modules",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "eval-cheap-source-map",
};
