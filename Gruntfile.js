/*global module:false*/
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*!<%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n\n'
    },
    qunit: {
      files: ['test/*.html']
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['source/core.js', 'source/core-methods.js', 'source/manipulation.js'],
        dest: 'builds/<%= pkg.name %>.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    uglify: {
      options: {
        sourceMap: false,
        sourceMapIncludeSources: false,
        preserveComments: false,
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          'builds/dom.min.js': ['builds/dom.js']
        }
      }
    },
    jshint: {
      options: {
        "evil": true,
        "regexdash":true,
        "browser":true,
        "wsh":true,
        "curly":true,
        "eqnull":true,
        "expr":true,
        "noarg":true,
        "quotmark":"single",
        "smarttabs":true,
        "trailing":true,
        "undef":true,
        "unused": true,
        "sub": true,
        globals: {
          'dom': true
        }
      },
      afterconcat: ['builds/dom.js']
    },
    dox: { files: { src: ['source/*.js'], dest: 'docs' } }

  });

  // Default task.
  grunt.registerTask('default', ['qunit', 'concat', 'jshint:afterconcat', 'uglify']);

};
