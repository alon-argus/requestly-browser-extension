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
        version: '4.1.1',
        files: [
          {
            cwd: 'src',
            src: [
              'pages/libs.js',
              'pages/main.js',
              'pages/main.css',
              'background/*',
              'Shared/*'
            ],
            expand: true,
            dest: 'src'
          },
          { cwd: 'resources', src: '**', expand: true, dest: 'resources' },
          { src: 'manifest.json'}
        ],
        outDir: 'build'
      }
    },

    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        files: {
          'src/pages/libs.js': require('./src/pages/jsList.json')['libs'],
          'src/pages/main.js': require('./src/pages/jsList.json')['src']
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
          'src/pages/templates.hbs.js': 'src/pages/templates/**/*.hbs'
        }
      }
    },

    sass: {
      dist: {
        files: {
          'src/pages/main.css': 'src/pages/css/sass/main.scss'
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
    }
  });

  grunt.loadNpmTasks('grunt-zipup');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('templates', ['handlebars']);
  grunt.registerTask('libs', ['handlebars', 'concat']);
  grunt.registerTask('build', ['handlebars', 'sass', 'concat', 'zipup']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('dev', ['watch']);
};
