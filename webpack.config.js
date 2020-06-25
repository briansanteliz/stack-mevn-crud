const path = require("path");
const {VueLoaderPlugin} = require('vue-loader')
module.exports = {
  entry: "./src/frontend/index.js",
  output: {
    path: path.join(__dirname, "/src/public"),
    filename: "js/bundle.js",
  },
  module: {
    rules: [
        //LOADER paa Transpila el codigo con babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      // LOADER para entiende los archivos vue
      {
          test:/\.vue$/,
          loader:'vue-loader'
      }
    ],
  },
  //plugin de completo para vue-loader
  plugins:[
        new VueLoaderPlugin()
  ]
};
