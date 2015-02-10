// Karma configuration
// Generated on Tue Feb 10 2015 16:51:11 GMT+0900 (JST)

module.exports = function(config) {
  var customLaunchers = require('./saucebrowsers.js');

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
      'src/moji.standalone.js',
      'test/*.test.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/*.test.js': ['browserify']
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher

    browserify: {
      debug: true
    },

    sauceLabs: {
      username: 'niwaringo_moji',
      accessKey: '40aad1da-1c89-41df-843e-1d6a48129382'
    },
    customLaunchers: customLaunchers,
    browsers: [process.env.sauce_browser_name],
    reporters: ['dots', 'saucelabs'],
    singleRun: true
  });
};
