var gulp = require('gulp');
// Load Gulp!
// Now that we've installed the uglify package we can require it:
var uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  eslint = require('gulp-eslint'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  prettyError = require('gulp-prettyerror');

gulp.task('sass',
  function () {
    gulp.src('./sass/style.scss')
      .pipe(prettyError()) //error handling
      .pipe(sass())
      .pipe(autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
  });

gulp.task('scripts', ['lint'],
  function () {
    gulp.src('./js/*.js')
      .pipe(uglify())
      .pipe(rename({
        extname: '.min.js'
      }))
      .pipe(gulp.dest('./build/js'))
  });


gulp.task('lint',
  function () {
    return gulp.src(['./js/*.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  });
  
  gulp.task('default', ['scripts']);

gulp.task('watch',
  function () {
    gulp.watch('sass/*.scss', ['sass'])
    gulp.watch('js/*.js', ['scripts']);
  });

gulp.task('browser-sync',
  function () {
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });

    gulp.watch(['*.index.html', 'build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);

  });
gulp.task('default', ['watch','browser-sync']);