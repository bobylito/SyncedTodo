module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      options: {
        transform         : [ require('grunt-react').browserify ],
        extension         : 'jsx',
        browserifyOptions : { debug: true }
      },
      app: {
        src  : 'front-src/index.js',
        dest : 'public/javascripts/app.js'
      }
    },
    watch: {
      files: ['./front-src/**/*', './models/**/*'],
      tasks: ['build']
    },
  })

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('build', ['browserify:app']);
};
