//LOAD SCRIPTS
var fs = require('fs');
var scripts = JSON.parse(fs.readFileSync('loader.json', 'utf8'));
var scriptsList = scripts.scripts;
var scriptsHTML = '<script src="../' + scriptsList.join('"></script>\n<script src="../') + '"></script>';


module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-copy-to');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'app/css/main.css': 'dev/sass/main.scss',
				}
			},
			production: {
				options: {
					style: 'compressed'
				},
				files: {
					'app/css/main.css': 'dev/sass/main.scss',
				}
			}
		},

		uglify: {
			pack: {
				files: {
					'app/js/app.js': scriptsList
				}
			}
		},

		processhtml: {
			dev: {
				options: {
					process: true,
					data: {
						scripts: scriptsHTML
					}
				},
				files: {
					'app/index.html': ['dev/index.html']
				}
			},
			production: {
				options: {
					process: true,
					data: {
						scripts: ''
					}
				},
				files: {
					'app/index.html': ['dev/index.html']
				}
			}
		},

		copyto: {
			views: {
				cwd: 'dev/js/',
				src: ['**/*.html'],
				dest: 'app/js/',
				expand: true
			}
		},

		watch: {
			styles: {
				files: ['dev/sass/*', 'dev/sass/lib/*'],
				tasks: ['sass']
			},
			views: {
				files: ['dev/js/**/*.html'],
				tasks: ['copyto:views']
			},
			htmls: {
				files: ['dev/index.html'],
				tasks: ['processhtml:dev']
			}
		}
	});

	grunt.registerTask('update', ['uglify', 'processhtml:dev', 'copyto', 'sass']);
	grunt.registerTask('production', ['uglify', 'processhtml:production', 'copyto', 'sass']);
	grunt.registerTask('auto', ['watch']);
};