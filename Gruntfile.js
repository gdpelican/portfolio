module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	coffee: {
	  options: { join: true },
      compile: {
        files: {
          'src/tmp/app.js': ['src/js/**/*.coffee']
        }
      }
    },
    sass: {
      compile: {
      	options: { style: 'compressed' },
        files: [
          { 'src/tmp/style.css': 'src/css/style.scss' },
          { 'src/tmp/normalize.css': 'src/css/normalize.scss'} 
        ] 	
      },
      normalize: {
      	options: { style: 'compressed' },
      	files: { 'src/tmp/normalize.css': 'src/css/normalize.scss'}
      }
    },
    emberTemplates: {
      compile: {
      	options: { templateBasePath: 'src/templates' },
      	files: {
      	  'src/tmp/templates.js': 'src/templates/**/*.hbs'
      	}
      }
    },
    concat: {
      options: { separator: ';' },
      js: {
      	src: 'src/tmp/*.js',
      	dest: 'dist/app.js' 
      },
      css: {
      	src: 'src/tmp/*.css',
      	dest: 'dist/style.css'
      }
    },
    watch: {
      css: {
      	files: ['src/css/**/*.scss'],
      	tasks: ['sass'],
      	options: { spawn: false }
      },
	  js: {
	    files: ['src/js/**/*.coffee'],
	    tasks: ['coffee'],
	    options: { spawn: false }
	  },
	  html: {
	  	files: 'src/templates/**/*.hbs',
    	tasks: ['emberTemplates', 'livereload']
	  }
	}
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['sass', 'coffee', 'emberTemplates', 'concat']);

};