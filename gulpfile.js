var gulp = require('gulp'),
    connect = require('gulp-connect');
    opn = require('opn');

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
    opn('http://localhost:8080/');
});

gulp.task('htmlCss', function () {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});

// gulp.task('css', function () {
//     gulp.src('./app/css/*.css')
//         .pipe(connect.reload());
// });

gulp.task('watch', function () {
    gulp.watch(['./app/*.html'], ['htmlCss']);
    gulp.watch(['./app/css/*.css'], ['htmlCss']);
});

gulp.task('default', ['connect', 'watch']);