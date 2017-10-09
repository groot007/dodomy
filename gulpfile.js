var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		sourcemaps 		= require('gulp-sourcemaps'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		bourbon        = require('node-bourbon'),
		ftp            = require('vinyl-ftp'),
		gulpImports = require('gulp-imports'),
		combineMq = require('gulp-combine-mq'),
		notify         = require("gulp-notify"),
		useref = require('gulp-useref'),
	    gulpif = require('gulp-if'),
		wiredep  = require('gulp-wiredep');


// // з папки bower в html
// gulp.task('bower', function () {
//   gulp.src('./app/index.html')
//     .pipe(wiredep({
//       directory: "app/bower_components/"
//     }))
//     .pipe(gulp.dest('./app'))
// })


// delete /dist
gulp.task('removedist', function() { return del.sync('dist'); });


// чистий код в папку dist
gulp.task('build', ['removedist'], function () {
	gulp.src([
		'app/img/**/*',
		]).pipe(gulp.dest('dist/img'));

	gulp.src([
		'app/css/**/*',
		]).pipe(gulp.dest('dist/css'));

	gulp.src([
		'app/js/**/*',
		]).pipe(gulp.dest('dist/js'));

	gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));
	return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulp.dest('dist'));
});


// Скрипты проекта
gulp.task('scripts', function() {
	return gulp.src(['app/js/main.js'])
		.pipe(uglify())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		online: true,
		// tunnel: true,
		// tunnel: "gootex", //Demonstration page: http://projectmane.localtunnel.me
	});
});


gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sourcemaps.init())
  	.pipe(sass().on('error', sass.logError))
  	.pipe(sourcemaps.write())
	.pipe(combineMq({
        beautify: true
    }))
	.pipe(rename({suffix: '.min'}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});


gulp.task('watch', function() {
	// gulp.watch('bower.json', ['bower']);
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/js/*.js', ['scripts']);
	gulp.watch('app/*.html').on("change", browserSync.reload);

});


gulp.task('default', ['browser-sync', 'sass', 'scripts', 'watch']);

