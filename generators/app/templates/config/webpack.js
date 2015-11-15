var path = require('path');
module.exports = {
    context: path.resolve(__dirname, '../src/app'),
    entry: path.resolve(__dirname, '../src/app.js'),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "bundle.js"
    },
    module: {
      loaders: [
        {
          test: /src\/.+.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: 'es2015',
          }
        }
      ]
    }
};
