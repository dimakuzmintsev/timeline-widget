const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (_, argv) => {
  const isProd = argv.mode === "production";
  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    resolve: { extensions: [".tsx", ".ts", ".js"] },
    devtool: isProd ? false : "source-map",
    devServer: { port: 5173, open: true, hot: true },
    module: {
      rules: [
        { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
        {
          test: /\.module\.s?css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: { modules: true, esModule: false },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.s?css$/,
          exclude: /\.module\.s?css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            { loader: "css-loader", options: { esModule: false } },
            "sass-loader",
          ],
        },
        { test: /\.(png|jpe?g|gif|svg|woff2?)$/i, type: "asset" },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "src/index.html" }),
      new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    ],
  };
};
