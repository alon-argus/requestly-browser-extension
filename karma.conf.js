module.exports = function(config) {
  config.set({

    basePath: './',

    frameworks: [ 'jasmine' ],

    plugins : [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-handlebars-preprocessor'
    ],

    files: [
      'tests/helpers/phantom-shim.js',

      /* Libraries and Helper files */
      "src/libs/firebase.js",
      "src/libs/jquery-1.9.1.js",
      "src/libs/bootstrap.min.js",

      "src/libs/underscore-1.6.0.js",
      "src/libs/backbone-1.1.2.js",
      "src/libs/handlebars.runtime-v3.0.3.js",
      "src/libs/bootstrap-toggle.min.js",

      'tests/helpers/chromeApiHelper.js',
      'tests/helpers/utils.js',

      'src/pages/main.js',

      /* Code files */
      'src/background/storageService.js',
      /*'src/Shared/shared.js',*/
      'src/background/background.js',

      /* Spec files */
      'tests/**/*.spec.js'
    ],

    exclude: [],

    preprocessors: {},

    reporters: [ 'progress' ],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: [ 'PhantomJS' ],

    singleRun: false
  });
};
