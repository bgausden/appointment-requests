const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var InlineChunkHtmlPlugin = require("inline-chunk-html-plugin");

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
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve("src/index.html"),
      links: ["modernizr.js"]
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/\.(css|js)$/])
  ]
};

module.exports = config;
