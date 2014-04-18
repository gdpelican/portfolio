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
      }
    },
    emberTemplates: {
      compile: {
      	options: { templateBasePath: 'src/templates' },
      	files: { 'src/tmp/templates.js': 'src/templates/**/*.hbs' }
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
      cssCompile: {
      	files: ['src/css/**/*.scss'],
      	tasks: ['sass'],
      	options: { spawn: false, reload: true }
      },
      cssConcat: {
      	files: ['src/tmp/*.css'],
      	tasks: ['concat'],
      	options: { spawn: false, reload: true }
      },
	  jsCompile: {
	    files: ['src/js/**/*.coffee'],
	    tasks: ['coffee'],
	    options: { spawn: false, reload: true }
	  },
	  jsConcat: {
	  	files: ['src/tmp/*.js'],
	  	tasks: ['concat'],
	  	options: { spawn: false, reload: true }
	  },
	  jsMinimize: {
	  	files: ['dist/*.js'],
	  	tasks: ['uglify'],
	  	optiosn: { spawn: false, reload: true }
	  },
	  html: {
	  	files: 'src/templates/**/*.hbs',
    	tasks: ['emberTemplates']
	  }
	}
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['sass', 'coffee', 'emberTemplates', 'concat']);

};