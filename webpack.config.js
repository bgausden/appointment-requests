const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("inline-chunk-html-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin")
  .default;

const PATHS = {
  src: path.join(__dirname, "src"),
};
const config = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: /node_modules/,
  },
  module: {
    rules: [
      /*       {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }, */
      {
        test: /\.css$/i,
        use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
    new HtmlWebpackPlugin({
      // use raw-loader to prevent webpack trying to resolve ejs fields
      template: "!!raw-loader!" + path.join(__dirname, "src/index.ejs"),
    }),
    new HTMLInlineCSSWebpackPlugin(),
    new HtmlWebpackInlineSVGPlugin(),
    // new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/\.(css)$/]),
  ],
};

module.exports = config;
