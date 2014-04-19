module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    filesets: {
    	scss: 	'src/css/**/*.scss',
    	css: 	'src/tmp/*.css',
    	coffee: 'src/js/**/*.coffee',
    	js:		'src/tmp/*.js',
    	hbs:	'src/templates/**/*.hbs'
    },
	coffee: {
	  options: { join: true },
      compile: {
        files: { 'src/tmp/app.js': '<%= filesets.coffee %>' }
      }
    },
    sass: {
      compile: {
      	options: { style: 'compressed' },
        files: [
          { 'src/tmp/style.css': 'src/css/style.scss' },
          { 'src/tmp/normalize.css': 'src/css/normalize.scss'} 
        ] 	
      }
    },
    emberTemplates: {
      compile: {
      	options: { templateBasePath: 'src/templates' },
      	files: { 'src/tmp/templates.js': '<%= filesets.hbs %>' }
      }
    },
    concat: {
      options: { separator: ';' },
      css: {
      	src: '<%= filesets.css %>',
      	dest: 'dist/style.css'
      }
    },
    uglify: {
    	js: {
    		files: { 'dist/app.js': ['<%= filesets.js %>'] }
    	}
    },
    watch: {
      scss: {
      	files: ['<%= filesets.scss %>'],
      	tasks: ['sass', 'concat'],
      	options: { spawn: false, reload: true }
      },
	  coffee: {
	    files: ['<%= filesets.coffee %>'],
	    tasks: ['coffee', 'uglify'],
	    options: { spawn: false, reload: true }
	  },
	  html: {
	  	files: ['<%= filesets.hbs %>'],
    	tasks: ['emberTemplates', 'uglify']
	  }
	}
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['watch']);

};