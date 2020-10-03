const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("inline-chunk-html-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin")
  .default;

const config = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
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
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
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
