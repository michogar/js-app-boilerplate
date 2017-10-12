var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
  var PROD = env && env.production;
  return {
    entry: './src/main.js',
    output: {
      path: __dirname,
      filename: './bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          compact: false
        }
      }, {
        test: /\.js$/,
        exclude: /node_modules|test\/.*\.js$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: {
            esModules: true
          }
        }
      }]
    },
    resolve: {
      alias: {
        '@csgis/di': path.resolve('./node_modules/@csgis/di'),
        'jquery': path.resolve('./node_modules/jquery')
      }
    },
    plugins: PROD ?  [new UglifyJSPlugin()] : []
  };
};
