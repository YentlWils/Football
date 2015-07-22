module.exports = function(grunt) {

  // Load the required plugins
  /////////////////////////////////////////////////////////////////////////////

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer'); //only build changed files


  //Dynamically load all the Node package Tasks with Matchdep


  grunt.initConfig({

    // Set the package location
    /////////////////////////////////////////////////////////////////////////////

    pkg: grunt.file.readJSON('package.json'),

    // Configure the tasks
    /////////////////////////////////////////////////////////////////////////////


    // adds sass functionality
    sass: {
        online: {
            options: {
              outputStyle: 'expanded',
              debugInfo: true,
              lineNumbers: true
            },
            files: [
                {
                    cwd:"../scss",
                    expand: true,
                    src: ["**/*.scss","!**/_*.scss"],
                    dest: "../../online/css",
                    ext: ".css"
                }
            ]
        }
    },

    //css validate with csslint
    csslint: {
        laxOnline: {
            options: {
                csslintrc: '../scss/.csslintrc'
            },
            src: ['../../online/css/**/*.css']
        }
    },

   // Concatenate & minify the javascripts
    uglify: {
      js: {
        options: {
          mangle: false,
          compress: {
            drop_console: false
          },

          beautify: true
        },
        files: [{
            expand: true,
            cwd: '../js',
            src: '**/*.js',
            dest: '../../online/js'
        }]
      }
    },

    // minifies images on the fly
    imagemin: {                          // Task
      images: {
        options: {                       // Target options
          optimizationLevel: 3,
          cache: false
        },                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: '../images/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: '../../online/images/'                  // Destination path prefix
        }]
      }
    },

    //copy files from the source to ../../static/default folder
    copy: {
      fonts: {
        files: [{
          expand: true,
          flatten: true,
          src: ['../fonts/**'],
          dest: '../../online/fonts/',
          filter: 'isFile'
        }]
      },
      js: {
          files: [{
              expand: true,
              dot: true,
              cwd: '../js',
              src: '**/*.*',
              dest: '../../online/js'
          }]
      },
      images: {
          files: [{
              expand: true,
              cwd: '../images',
              src: '**/*.png',
              dest: '../../online/images'
          }]
      }
    },

    // Add all these actions to the watch
    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: '../scss/**/*.scss',
        tasks: ['sass:online','csslint:laxOnline']
      },

        js : {
            files: '../online/js/**',
            tasks: ['newer:copy:js']
        },

      fonts : {
        files: '../fonts/**',
        tasks: ['newer:copy:fonts']
      },
      options: {        livereload: false
      }
    }
  });



  //tasks to be performed by default (for DEVELOPMENT)
  grunt.registerTask('default', [
    'copy:fonts',
    'copy:js',

    'copy:images',
    'sass:online',
    'csslint:laxOnline',
    'watch'
  ]);
}
