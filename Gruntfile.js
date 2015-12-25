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
        files: { './.tmp/css/styles.min.css': '<%= yeoman.public %>/scss/styles.scss'},
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
        files: ['<%= yeoman.public %>/index.html', '<%= yeoman.public %>/partials/**/*.html'],
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
          src: ['./dist'],
          dest: './*'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/css/styles.min.css': ['<%= yeoman.public %>/lib/angular-material/angular-material.css', './.tmp/css/styles.min.css']
        }
      }
    },
    processhtml: {
      options: {},
      dist: {
        files: {
          '<%= yeoman.dist %>/index.html': ['<%= yeoman.public %>/index.html']
        }
      }
    },
    uglify: {
      dist: {
        options: {mangle: false},
        files: {
          '<%= yeoman.dist %>/js/app.min.js': ['./.tmp/app.concat.js'],
          '<%= yeoman.dist %>/js/lib.min.js': ['./.tmp/lib.concat.js']
        }
      }
    },
    concat: {
      dist: {
        src: ['<%= yeoman.public %>/js/app.js', './.tmp/templates.js', '<%= yeoman.public %>/js/*/*.js'],
        //dest: './.tmp/app.concat.js'
        dest: './dist/js/app.min.js'
      },
      lib: {
        src: ['./.tmp/bower/*.js', '!./.tmp/bower/angular.js'],
        dest: './dist/js/lib.min.js'
      }
    },
    bower: {
      dist: {
        dest: './.tmp/bower'
      }
    },
    clean: ['./.tmp'],
    html2js: {
      options: {
        rename: function(module) {
          //../assets/js/playlists/playlist-list.tmpl.html
          //js/songs/song-list.tmpl.html
          return module.replace('../assets/', '');
        }
      },
      dist: {
        src: ['<%= yeoman.public %>/js/**/*.tmpl.html'],
        dest: './.tmp/templates.js'
      },
    },
    copy: {
      dist: {
        files: [
          {expand: true, cwd:'./assets/', src: ['data/*'], dest: './dist/'},
          {expand: true, cwd:'./assets/', src: ['sounds/*'], dest: './dist/'},

        ]
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {

    grunt.task.run([
      'build',
      'express:dev',
      'watch'
    ]);
  });

  //grunt.registerTask('build', ['clean', 'processhtml', 'sass:dist', 'bower:dist', 'concat', 'uglify']);
  grunt.registerTask('build', ['clean', 'processhtml', 'bower:dist', 'sass:dist', 'html2js', 'concat', 'cssmin', 'copy']);
  grunt.registerTask('sss', ['s3-sync:dist']);
  grunt.registerTask('default', 'serve');
};
