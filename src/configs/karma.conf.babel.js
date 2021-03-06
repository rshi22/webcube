// https://karma-runner.github.io/0.13/config/configuration-file.html

// import isparta from 'isparta'; // https://www.npmjs.com/package/isparta
import _ from 'lodash';
import webpackConfig from './webpack.default.config.babel';
import webpack from 'webpack';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import {
  rootPath,
} from '../utils';
const webpackConfigForKarma = _.cloneDeep(webpackConfig);
_.remove(webpackConfigForKarma.plugins, function (i) {
  return i instanceof AssetsPlugin
    || i instanceof webpack.optimize.CommonsChunkPlugin;
  // || i instanceof ExtractTextPlugin;
});
webpackConfigForKarma.entry = {};

module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: rootPath,
    // can either be a string (module name), which will be required by Karma, or an object (inlined plugin)
    plugins: [
      // https://www.npmjs.com/package/karma-webpack
      'karma-webpack',
      // https://www.npmjs.com/package/karma-sourcemap-loader
      'karma-sourcemap-loader',
      // https://www.npmjs.com/package/karma-mocha
      'karma-mocha',
      // https://www.npmjs.com/package/karma-chai-plugins
      'karma-chai-plugins',
      // https://www.npmjs.com/package/karma-coverage
      // https://www.npmjs.com/package/istanbul
      // 'karma-coverage',
      // https://www.npmjs.com/package/karma-spec-reporter
      'karma-spec-reporter',
    ].concat(process.env.WEBCUBE_ENABLE_PHANTOM_FOR_KARMA ? [
      // https://www.npmjs.com/package/karma-phantomjs-launcher
      'karma-phantomjs-launcher',
    ] : []).concat(process.env.WEBCUBE_ENABLE_CHROME_FOR_KARMA ? [
      // https://www.npmjs.com/package/karma-chrome-launcher
      'karma-chrome-launcher',
    ] : []),
    frameworks: [
      'mocha',
      'chai',
      'chai-as-promised',
      'chai-dom',
      // 'chai-jquery',
      // 'sinon-chai',
      // 'chai-things',
    ],
    preprocessors: {
      'app/**/*.test.js': ['webpack', 'sourcemap'],
      // 'app/**/*.(js|jsx)': ['coverage'],
    },
    // list of files / patterns to load in the browser
    files: [
      'app/**/*.test.js',
    ],
    // list of files to exclude
    exclude: [

    ],
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: [
      'spec',
      // 'coverage',
    ],
    browsers: [
    ].concat(process.env.WEBCUBE_ENABLE_PHANTOM_FOR_KARMA ? [
      'PhantomJS',
    ] : []).concat(process.env.WEBCUBE_ENABLE_CHROME_FOR_KARMA ? [
      'Chrome',
    ] : []),
    webpack: webpackConfigForKarma,
    webpackMiddleware: {
      noInfo: true,
    },
    // coverageReporter: {
    //   type: 'html',
    //   dir: 'coverage/',

    //   https://www.npmjs.com/package/isparta
    //   instrumenters: { isparta },
    //   instrumenter: {
    //     '**/*.js': 'isparta',
    //   },
    // },
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true, // false,
  });
};
