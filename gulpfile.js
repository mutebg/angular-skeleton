var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var processhtml = require('gulp-processhtml');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');


//LOAD SCRIPTS
var fs = require('fs');
var scripts = JSON.parse(fs.readFileSync('loader.json', 'utf8'));
var scriptsList = scripts.scripts;
var scriptsHTML = '<script src="../' + scriptsList.join('"></script>\n<script src="../') + '"></script>';


var PRODUCTION = false;

//global options
var options = {
	sass_folder: 'dev/sass/main.scss',
	sass_folder_parts: 'dev/sass/**/*.scss',
	css_folder: 'app/css/',
	views: 'dev/js/**/*.html',
	views_dest: 'app/js/',
	index: 'dev/index.html',
	index_dest: 'app/',
	js_folder: 'dev/js/**/*.js',
	images_folder: 'dev/images/**/*',
	images_folder_dest: 'app/images/',
};

//development options
var devOptions = {
	sass: {
		errLogToConsole: true,
		onError: function(err) {
			console.log(err)
		}
	},
	processhtml: {
		process: true,
		data: {
			scripts: scriptsHTML
		}
	},
	uglify: {
		mangle: false
	},
	imagemin: {
		progressive: true,
		svgoPlugins: [{removeViewBox: false}]
	}
};

//production options
var prodOptions = {
	sass: {},
	processhtml: {
		process: true,
		data: {
			scripts: false
		}
	},
	uglify: {
		mangle: false
	},
	imagemin: devOptions.imagemin
};

gulp.task('sass', function() {
	gulp.src( options.sass_folder )
		.pipe( sass( PRODUCTION ? prodOptions.sass : devOptions.sass ) )
		.pipe( autoprefixer( { browsers: ['last 5 versions'], cascade: false } ) )
		.pipe( gulp.dest( options.css_folder ) );
});

gulp.task('uglify', function() {
	gulp.src( scriptsList )
		.pipe( uglify( PRODUCTION ? prodOptions.uglify : devOptions.uglify ) )
		.pipe( concat('app.js') )
		.pipe( gulp.dest('app/js/') );
});

gulp.task('copyViews', function(){
	gulp.src( options.views )
		.pipe( gulp.dest( options.views_dest ) );
});

gulp.task('processhtml', function () {
    gulp.src( options.index )
       	.pipe( processhtml( PRODUCTION ? prodOptions.processhtml : devOptions.processhtml) )
        .pipe( gulp.dest( options.index_dest ) );
});

gulp.task('imagemin', function () {
	gulp.src( options.images_folder )
    	.pipe( imagemin( PRODUCTION ? prodOptions.imagemin : devOptions.imagemin ) )
       	.pipe( options.images_folder_dest )
});

gulp.task('lint', function(){
	gulp.src( options.js_folder )
   		.pipe( jshint() )
    	.pipe( jshint.reporter('default') );
})

/****************************************************
************* MAIN TASKS ****************************
*****************************************************/
var tasks = ['uglify', 'sass', 'processhtml', 'copyViews', 'imagemin'];

gulp.task('default', function() {
	console.log('show user info about task');
});

//update current state
gulp.task('update', function(){
	PRODUCTION = false;
	gulp.start(tasks);
} );

//prepare for production
gulp.task('production', function(){
	PRODUCTION = true;
	gulp.start(tasks);
});

gulp.task('watch', function() {
	gulp.watch( options.js_folder, ['lint'] );
	gulp.watch( options.sass_folder_parts, ['sass'] );
	gulp.watch( options.views, ['copyViews'] );
	gulp.watch( options.index, ['processhtml'] );
	gulp.watch( options.images_folder, ['imagemin'] );
});