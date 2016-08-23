var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	webserver = require('gulp-webserver'),
	uglify = require('gulp-uglify');

var path = {
	bower: './bower_components/',
	build: './build/'
}

gulp.task('sass', function(){
	return gulp.src('./source/scss/**/*.scss')
		.pipe(sass({
				outputStyle: 'nested',
				includePaths: [path.bower + '/bootstrap/scss/']
			}))
		.pipe(gulp.dest(path.build + 'stylesheets/'))
})

gulp.task('concat', function(){
	return gulp.src('./source/**/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.build + 'js/'));
});

gulp.task('html', function(){
	return gulp.src('./source/**/*.html')
		.pipe(gulp.dest(path.build));
});

var vendorjs = [
	path.bower + 'jquery/dist/jquery.min.js',
	path.bower + 'angular/angular.min.js'
]
gulp.task('vendor', function(){
	return gulp.src(vendorjs)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(path.build + 'js/'));
})

gulp.task('watch', function(){
	gulp.watch('./source/**/*.js', ['concat']);
	gulp.watch('./source/**/*.html', ['html']);
	gulp.watch('./source/scss/**/*.scss', ['sass']);
});

gulp.task('webserver', function() {
  gulp.src('build')
    .pipe(webserver({
			livereload: true,
      open: false,
      host: '0.0.0.0',
      port: 10000,
    }));
});

gulp.task('default', ['html', 'concat','vendor', 'sass', 'webserver', 'watch', 'webserver']);
