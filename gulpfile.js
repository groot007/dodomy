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
		minifyInline = require('gulp-minify-inline'),
	    gulpif = require('gulp-if'),
	    image = require('gulp-image'),
		wiredep  = require('gulp-wiredep');


// // з папки bower в html
// gulp.task('bower', function () {
//   gulp.src('./app/index.html')
//     .pipe(wiredep({
//       directory: "app/bower_components/"
//     }))
//     .pipe(gulp.dest('./app'))
// })

gulp.task('image', function () {
  
});

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
		'app/scss/**/*',
		]).pipe(gulp.dest('dist/scss'));

	gulp.src([
		'app/js/**/*',
		]).pipe(gulp.dest('dist/js'));

	gulp.src('./app/img/**/*')
   		.pipe(image())
    	.pipe(gulp.dest('./dist/img/'));

	gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));
	return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});


// Скрипты проекта
gulp.task('scripts', function() {
	return gulp.src(['app/js/main.js'])
		.pipe(gulpImports())
		.pipe(uglify())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './app/'
		},
		// proxy: 'https://dodomy.com.wm/app/',
		// port: 8080,
		// notify: false,
		// online: true,
		// tunnel: true,
		// tunnel: "gootex", //Demonstration page: http://projectmane.localtunnel.me
	});
});


 

gulp.task('sass', function() {

	return gulp.src(['app/scss/style.scss', 'app/scss/style-mobile.scss', ])
		.pipe(sourcemaps.init())
	  	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		// .pipe(combineMq({
	        // beautify: true
	    // }))
		.pipe(rename({suffix: '.min'}))
		.pipe(autoprefixer(['last 15 versions']))
		// .pipe(cleanCSS({
		// 	keepSpecialComments : 0,
		// }))
		.pipe(minifyInline())
	  	.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('watch', function() {
	// gulp.watch('bower.json', ['bower']);
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/js/main.js', ['scripts']);
	gulp.watch('app/*.html').on("change", browserSync.reload);

});


gulp.task('default', ['browser-sync', 'sass', 'scripts', 'watch']);

