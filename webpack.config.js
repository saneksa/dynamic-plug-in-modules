const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const mode = process.env.NODE_ENV;
const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  context: __dirname,
  entry: {
    app: "./packages/core/src/index.tsx",
  },
  mode,
  target: isDevelopment ? "web" : "browserslist",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          projectReferences: true,
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    hot: true,
    compress: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Dynamically connect modules",
      template: "./assets/index.html",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts$/],
    }),
  ],
  devtool: isDevelopment ? "inline-source-map" : false,
};
