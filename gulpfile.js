var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css')
    connect = require('gulp-connect'),
    wiredep = require('wiredep').stream,
    clean = require('gulp-clean'),
    opn = require('opn');


//localhost
gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
    opn('http://localhost:8080/');
});

//Bower
gulp.task('wiredep', function () { 
    gulp.src('app/*.html')
    .pipe(wiredep({
        directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('app'));
});

//html css
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



//DIST
gulp.task('dist', function () {
    var assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

// Очистка
gulp.task('clean', function () {
return gulp.src('dist', {read: false}).pipe(clean());
});

//Default
gulp.task('default', ['connect', 'watch']);