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

      /* Libraries */
      'src/pages/generated/js/libs.js',

      /* Helper files */
      'tests/helpers/chromeApiHelper.js',
      'tests/helpers/utils.js',

      'browser_config.js',
      'src/pages/generated/js/main.js',

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
