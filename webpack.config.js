const webpack = require("webpack");
const path = require("path");
//const glob = require("glob");
const glob = require("glob-all");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("inline-chunk-html-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin")
  .default;
/* // doesn't support HtmlWebpackPlugin v 4.x
  const HtmlWebpackInlineStylePlugin = require("html-webpack-inline-style-plugin"); */

const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "src"),
  css: path.join(__dirname, "css"),
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
          test: /\.css$/i,
          chunks: "all",
          enforce: true,
        },
      },
    },
    minimize: false,
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/i,
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      }),
    ],
  },
  watch: false,
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
        // use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"],
        // per PurgeCSS plugin example
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      /* // expected to prevent EJS processing but didn't work
      {
        test: /\.html$/i,
        loader: "html-loader",
      }, */
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new PurgecssPlugin({
      paths: glob.sync(
        [
          /* `${PATHS.css}/materialize.css`,
          `${PATHS.css}/local-override.css`, */
          `${PATHS.css}/**/*`,
          `${PATHS.src}/index.ejs`,
        ],
        {
          nodir: true,
        }
      ),
    }),
    /* new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/i,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }), */
    new HtmlWebpackPlugin({
      // use raw-loader to prevent webpack trying to resolve ejs fields
      template: "!!raw-loader!" + path.join(__dirname, "src/index.ejs"),
      //template: "src/index.ejs",
      filename: "index.ejs",
    }),
    /* // Disable while testing juice
    new HTMLInlineCSSWebpackPlugin(), */
    new HtmlWebpackInlineSVGPlugin(),
    /* // doesn't support HtmlWebpackPlugin v 4.x
    new HtmlWebpackInlineStylePlugin(), */
    // new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/\.(css)$/]),
  ],
};

module.exports = config;
