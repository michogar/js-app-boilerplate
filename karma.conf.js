const webpackConfig = require('./webpack.config.js')();

module.exports = function c(config) {
  config.set({
    basePath: '.',
    frameworks: ['mocha'],
    files: ['test/*.js'],
    preprocessors: {
      'src/*.js': ['webpack', 'sourcemap', 'coverage'],
      'test/*.js': ['webpack', 'sourcemap']
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage',
      reporters: [{
        type: 'html',
        subdir: 'html'
      }, {
        type: 'lcov',
        subdir: 'lcov'
      }]
    }
  });
};
