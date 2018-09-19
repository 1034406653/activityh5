var gulp = require('gulp'),
	less = require('gulp-less'),
	px2rem = require('gulp-px2rem-plugin'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	smushit = require('gulp-smushit');
	

gulp.task('Less', function() {
	gulp.src('src/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('px2rem', function() {
	gulp.src('dist/css/*.css')
		.pipe(px2rem())
		.pipe(gulp.dest('dist/css'))
});

gulp.task('csscompress', function() {
	gulp.src('dist/css/*.css')
		.pipe(cleanCSS())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('jsmin', function() {
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('imgmin', function () {
    gulp.src('src/img/*.{jpg,png}')
        .pipe(smushit())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('Watch', function() {
	gulp.watch('src/less/*.less', ['Less']);
	gulp.watch('dist/css/*.css', ['px2rem']);
	gulp.watch('dist/css/*.css', ['csscompress']);
	gulp.watch('src/js/*.js', ['jsmin']);
	gulp.watch('src/img/*.{jpg,png}', ['imgmin']);
});
gulp.task('default', ['Watch', 'Less', 'px2rem', 'csscompress', 'jsmin','imgmin']);