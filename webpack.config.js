const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app.js", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "Final"),
    filename: "bundle.js",
    publicPath: "/", // Ensure the publicPath is set correctly
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]", // This will place images in the 'Final/img' folder
        },
      },
      {
        test: /\.json$/,
        type: "asset/resource",
        generator: {
          filename: "data/[name][ext]", // This will place JSON data in the 'Final/data' folder
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // Ensure this points to your HTML file
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "Final"), // Ensure this points to your output directory
    },
    compress: true,
    port: 9000,
    historyApiFallback: true, // This will help to serve index.html for all 404 routes
  },
  mode: "development",
};
