var gulp = require('gulp');
var browserify = require('gulp-browserify');
var transform = require('vinyl-transform');
var exorcist = require('exorcist');

var browserSync = require('browser-sync');

gulp.task('default', ['build']);

gulp.task('serve', ['build'], function() {
	browserSync.init({
		server: {
			baseDir: "./app/"
		}
	});
});

gulp.task('build', ['copy-modules', 'copy-libs'], function()
{
	return gulp.src('src/hime.js')
		.pipe(browserify({
			debug: true
		}))
		.pipe(transform(function () { return exorcist('app/scripts/hime.js.map'); }))
		.pipe(gulp.dest("app/scripts"));
});

gulp.task('copy-modules', function()
{
	return gulp.src('src/royal*/**/*.js')
		.pipe(gulp.dest('node_modules'));
});

gulp.task('copy-libs', function()
{
	return gulp.src(['./bower_components/angular/angular.js',
					 './bower_components/jquery/jquery.js'])
		.pipe(gulp.dest('./app/scripts/'));
});

gulp.task('build-watch', function()
{
	gulp.watch('src/**/*.js', ['build']);
});
