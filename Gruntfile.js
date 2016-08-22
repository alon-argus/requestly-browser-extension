/**
 *  @References
 * [0] http://gruntjs.com/getting-started to install grunt-cli
 * [1]: https://github.com/01org/grunt-zipup
 * [2]: https://github.com/gruntjs/grunt-contrib-handlebars
 * [3]: http://gruntjs.com/configuring-tasks#files
 **/

module.exports = function (grunt) {

  grunt.initConfig({
    zipup: {
      package: {
        appName: 'Requestly',
        version: '4.1.5',
        files: [
          {
            cwd: 'src',
            src: [
              'pages/generated/js/libs.js',
              'pages/generated/js/main.js',
              'pages/generated/css/main.css',
              'background/*',
              'Shared/*'
            ],
            expand: true,
            dest: 'src'
          },
          { cwd: 'resources', src: '**', expand: true, dest: 'resources' },
          { src: 'manifest.json'},
          { src: 'browser_config.js'}
        ],
        outDir: 'builds'
      },
      package_chrome: {
        appName: '<%= zipup.package.appName %>',
        version: '<%= zipup.package.version %>',
        files: '<%= zipup.package.files %>',
        outDir: 'builds/chrome'
      },
      package_firefox: {
        appName: '<%= zipup.package.appName %>',
        version: '<%= zipup.package.version %>',
        files: '<%= zipup.package.files %>',
        outDir: 'builds/firefox'
      }
    },

    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        files: {
          'src/pages/generated/js/libs.js': require('./src/pages/jsList.json')['libs'],
          'src/pages/generated/js/main.js': require('./src/pages/jsList.json')['main']
        }
      }
    },

    /**
     * Task handlebars: Pre-Compile template files, concat them and save output to templates.hbs.js
     */
    handlebars: {
      compile: {
        options: {
          namespace: 'RQ.Templates',
          processName: function(filePath) {
            var pieces = filePath.split('/'),
              fileName = pieces[ pieces.length - 1 ];

            return fileName.replace(/(\.hbs)/ig, '');
          }
        },
        files: {
          'src/pages/generated/js/templates.hbs.js': 'src/pages/templates/**/*.hbs'
        }
      }
    },

    sass: {
      dist: {
        files: {
          'src/pages/generated/css/main.css': 'src/pages/css/sass/main.scss'
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    watch: {
      templates: {
        files: ['**/*.hbs'],
        tasks: ['handlebars']
      },
      scripts: {
        files: ['**/*.js'],
        tasks: ['concat']
      },
      styles: {
        files: ['**/*.scss'],
        tasks: ['sass']
      },
      tests: {
        files: ['**/*.spec.js'],
        tasks: ['karma:unit']
      }
    },

    copy: {
      select_firefox: {
        files: [
          { src: 'manifest_firefox.json',
            dest: 'manifest.json'
          }
        ]
      },
      select_chrome: {
        files: [
          { src: 'manifest_chrome.json',
            dest: 'manifest.json'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-zipup');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('templates', ['handlebars']);
  grunt.registerTask('libs', ['handlebars', 'concat']);
  grunt.registerTask('select-chrome', ['copy:select_chrome']);
  grunt.registerTask('select-firefox', ['copy:select_firefox']);
  grunt.registerTask('build', ['handlebars', 'sass', 'concat']);
  grunt.registerTask('release-firefox', ['select-firefox', 'zipup:package_firefox']);
  grunt.registerTask('release-chrome', ['select-chrome', 'zipup:package_chrome']);
  grunt.registerTask('release', ['build', 'release-firefox', 'release-chrome']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('dev', ['watch']);
};
