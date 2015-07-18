'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    public: './assets',
    dist: './dist'
  };

  var creds = grunt.file.readJSON('./creds.json');

  grunt.initConfig({

    yeoman: appConfig,
    creds: creds,

    sass: {
      options: {
        sourceMap: true
      },
      dev: {
        files: { '<%= yeoman.public %>/css/styles.css': '<%= yeoman.public %>/scss/styles.scss'},
        options: {
          outputStyle: 'nested'
        }
      },
      dist: {
        files: { '<%= yeoman.public %>/css/styles.css': '<%= yeoman.public %>/scss/styles.scss'},
        options: {
          outputStyle: 'compressed'
        }
      }
    },

    angular_architecture_graph: {
      diagram: {
        files: {
          "docs/architecture": ["<%= yeoman.public %>/js/**/*.js"]
        }
      }
    },

    watch: {
      js: {
        files: ['<%= yeoman.public %>/js/**/*.js'],
        options: {
          livereload: true
        },
        tasks: ['angular_architecture_graph']
      },
      html: {
        files: ['<%= yeoman.public %>/js/**/*.html', 'views/index.ejs'],
        options: {
          livereload: true
        },
        tasks: []
      },
      css: {
        files: ['<%= yeoman.public %>/css/styles.css'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: ['<%= yeoman.public %>/scss/**/*.scss'],
        tasks: ['sass:dev']
      },
      express: {
        files:  [ '<%= yeoman.public %>/app.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false
        }
      }
    },

    express: {
      dev: {
        options: {
          script: './app.js',
          node_env: 'development',
          port: 8080
        }
      }
    },
    's3-sync': {
      options: {
        key: '<%= creds.key %>',
        secret: '<%= creds.secret %>',
        bucket: '<%= creds.bucket%>'
      },
      dist: {
        files: [{
          root: './',
          src: ['assets/**'],
          dest: './'
        }]
      },
    },

  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {

    grunt.task.run([
      'build',
      'express:dev',
      'watch'
    ]);
  });

  grunt.registerTask('build', ['angular_architecture_graph', 'sass:dev']);
  grunt.registerTask('sss', ['s3-sync:dist']);
};
