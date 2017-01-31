module.exports = function (grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "public/main.css": "less/main.less",
          "public/landing.css": "less/landing.less"
        }
      }
    },
    watch: {
      styles: {
        files: ['less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'public/img/',
          src: ['*.{jpg,png}'],
          dest: 'public/img/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.registerTask('default', ['less', 'watch']);
  // grunt.registerTask('less', []);
  // grunt.registerTask('watch', []);
  // grunt.registerTask('minimize');
  // grunt.registerTask('minimize')
};