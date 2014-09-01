var gulp = require('gulp');
var browserify = require('gulp-browserify');
var transform = require('vinyl-transform');
var exorcist = require('exorcist');

gulp.task('default', ['build']);

gulp.task('build', ['copy-modules'], function()
{
	gulp.src('src/hime.js')
		.pipe(browserify({
			debug: true
		}))
		.pipe(transform(function () { return exorcist('app/scripts/hime.js.map'); }))
		.pipe(gulp.dest("app/scripts"));
});

gulp.task('copy-modules', function()
{
	gulp.src('src/royal*/**/*.js')
		.pipe(gulp.dest('node_modules'));
});

gulp.task('build-watch', function()
{
	gulp.watch('src/**/*.js', ['build']);
});