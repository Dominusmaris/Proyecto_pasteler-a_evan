module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'src/business-logic.js',
      'src/frontend-logic.spec.js'
    ],

    browsers: ['Chrome'],
    singleRun: false,
    autoWatch: true,

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'src/business-logic.js': ['coverage']
    },

    coverageReporter: {
      type: 'html',
      dir: 'karma-coverage/'
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    client: {
      clearContext: false
    }
  });
};