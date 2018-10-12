var gulp = require('gulp'),
	less = require('gulp-less'),
	smushit = require('gulp-smushit');
	

gulp.task('Less', function() {
	gulp.src('src/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('imgmin', function () {
  gulp.src('src/img/*.{jpg,png}')
      .pipe(smushit())
      .pipe(gulp.dest('dist/img'));
});

gulp.task('Watch', function() {
	gulp.watch('src/less/*.less', ['Less']);
	gulp.watch('src/img/*.{jpg,png}', ['imgmin']);
});
gulp.task('default', ['Watch', 'Less', 'imgmin']);