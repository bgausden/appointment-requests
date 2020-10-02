const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("inline-chunk-html-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");

const config = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackInlineSVGPlugin(),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/\.(css|js)$/])
  ]
};

module.exports = config;
