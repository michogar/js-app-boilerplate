let path = require('path');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
  let plugins = [new CopyWebpackPlugin([
    { from: 'index.html' },
    { from: 'README.md' },
    { from: 'package.json' }
  ])];

  let PROD = env && env.production;
  if (PROD) plugins.push(new UglifyJSPlugin());

  return {
    entry: './src/main.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: './bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
      rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }],
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
        '@csgis/di': path.resolve('./node_modules/@csgis/di')
      }
    },
    plugins
  };
};
