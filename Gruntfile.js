module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    folders: {
    	src: 	'src',
    	dist: 	'dist',
    	tmp: 	'<%= folders.src %>/tmp',
    	scss: 	'<%= folders.src %>/css',
    	coffee: '<%= folders.src %>/js',
    	hbs: 	'<%= folders.src %>/templates'
    },
    filesets: {
    	scss: 	'<%= folders.scss %>/**/*.scss',
    	css: 	'<%= folders.tmp %>/*.css',
    	coffee: '<%= folders.coffee %>/**/*.coffee',
    	js:		'<%= folders.tmp %>/*.js',
    	hbs:	'<%= folders.hbs %>/**/*.hbs'
    },
	coffee: {
	  options: { join: true },
      compile: {
        files: { '<%= folders.tmp %>/app.js': '<%= filesets.coffee %>' }
      }
    },
    sass: {
      compile: {
      	options: { style: 'compressed' },
        files: { '<%= folders.dist %>/style.css': '<%= folders.tmp %>/style.scss' }	
      }
    },
    emberTemplates: {
      compile: {
      	options: { templateBasePath: 'src/templates' },
      	files: { '<%= folders.tmp %>/templates.js': '<%= filesets.hbs %>' }
      }
    },
    concat: {
      options: { separator: ';' },
      scss: {
      	src: '<%= filesets.scss %>',
      	dest: '<%= folders.tmp %>/style.scss'
      }
    },
    uglify: {
    	js: {
    		files: { '<%= folders.dist %>/app.js': ['<%= filesets.js %>'] }
    	}
    },
    watch: {
      scss: {
      	files: ['<%= filesets.scss %>'],
      	tasks: ['concat', 'sass'],
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