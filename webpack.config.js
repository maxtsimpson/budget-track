const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  entry: {
    app: "./public/assets/js/index.js",
    db: "./public/assets/js/db.js",
  },
  output: {
    path: __dirname + "/public/dist",
    filename: "[name].bundle.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  plugins: [
    new WebpackPwaManifest({
      name: "Budget App",
      short_name: "Budgie",
      description: "An app that helps you track your budget",
      background_color: "#01579b",
      theme_color: "#ffffff",
      start_url: "/",
      fingerprints: false,
      icons: [{
        src: path.resolve("./public/assets/icons/icon-512x512.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("icons"),
        fingerprints: false
      }]
    })
  ]
};

module.exports = config;
