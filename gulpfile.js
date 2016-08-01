var gulp = require('gulp');
var connect = require('gulp-connect');
var jade = require('gulp-jade');
var sass=require('gulp-sass');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

gulp.task('connect', function() {
	connect.server({
		port: 47,
		livereload: true,
		root: ['dist', 'dist/html']
	});
});

gulp.task('jade', function() {
	gulp.src('src/jade/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('dist/html'))
		.pipe(connect.reload());
});

gulp.task('sass', function() {
	// implement sass task
	gulp.src('src/sass/*.sass')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'))
		.pipe(connect.reload());
});

gulp.task('requireJS', function() {
	// implement bundle.js file uglification
	rjs({
		baseUrl: 'src/js',
		name: '../../node_modules/almond/almond',
		include: ['app'],
		insertRequire: ['app'],
		out: 'bundle.js',
		wrap: true
	})
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('src/jade/*.jade', ['jade']);

	// watch for .sass and .js files
	gulp.watch('src/sass/*.sass', ['sass']);
	gulp.watch('src/js/*.js', ['requireJS']);
});

gulp.task('default', ['requireJS', 'jade', 'sass', 'connect', 'watch']);