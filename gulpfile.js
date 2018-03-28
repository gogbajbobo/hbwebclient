const
    gulp = require('gulp'),
    connect = require('gulp-connect');

const paths = {
  app: './',
  src: ['./*.html', './html/*.html', './css/*.css', './js/*.js']
};

gulp.task('connect', () => {
  connect.server({
    root: paths.app,
    livereload: true,
    port: 2772
  });
});

gulp.task('html', () => {
  gulp.src(paths.src)
    .pipe(connect.reload());
});

gulp.task('watch', () => {
  gulp.watch([paths.src], ['html']);
});

gulp.task('default', ['connect', 'watch']);
