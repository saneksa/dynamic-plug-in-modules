const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

const mode = process.env.NODE_ENV;
const isDevelopment = process.env.NODE_ENV === "development";

/**
 * @type {import("webpack").Configuration}
 */

module.exports = {
  mode,
  context: __dirname,
  entry: {
    core: "./packages/core/src/index.ts",
    platform: "./packages/platform/src/index.modules.ts",
    moduleA: "./packages/module-a/src/index.modules.tsx",
    moduleB: "./packages/module-b/src/index.modules.tsx",
    moduleC: "./packages/module-c/src/index.modules.tsx",
    run: "./packages/core/src/run.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isDevelopment ? "[name].js" : "[name]_[contenthash].js",
    clean: true,
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
    new CircularDependencyPlugin({
      exclude: /node_modules/,

      onStart({ compilation }) {
        console.log("start detecting webpack modules cycles");
      },

      onDetected({ module: webpackModuleRecord, paths, compilation }) {
        compilation.errors.push(new webpack.WebpackError(paths.join(" -> ")));
      },

      onEnd({ compilation }) {
        console.log("end detecting webpack modules cycles");
      },
    }),
  ].filter(Boolean),
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      maxSize: Infinity,
      minSize: 0,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "node_modules",
        },
        coreapp: {
          test: /[\\/]packages\/core[\\/]/,
          name: "coreapp",
        },
      },
    },
    runtimeChunk: {
      name: `runtime`,
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
