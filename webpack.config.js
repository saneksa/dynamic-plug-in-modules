const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const mode = process.env.NODE_ENV;
const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  mode,
  context: __dirname,
  entry: {
    app: "./packages/core/src/index.ts",
    platform: "./packages/platform/src/index.modules.ts",
    moduleA: "./packages/module-a/src/index.modules.tsx",
    moduleB: "./packages/module-b/src/index.modules.tsx",
    moduleC: "./packages/module-c/src/index.modules.tsx",
    run: "./packages/core/src/run.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  target: isDevelopment ? "web" : "browserslist",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          plugins: [
            isDevelopment && require.resolve("react-refresh/babel"),
          ].filter(Boolean),
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  devServer: {
    hot: true,
    port: 5000,
    client: {
      overlay: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
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
    isDevelopment &&
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),
  ].filter(Boolean),
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      maxSize: Infinity,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "node_modules",
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    minimizer: [
      new TerserWebpackPlugin({
        minify: TerserWebpackPlugin.terserMinify,
        parallel: true,
      }),
      new CssMinimizerPlugin({}),
    ],
  },
  devtool: isDevelopment ? "inline-source-map" : false,
};
