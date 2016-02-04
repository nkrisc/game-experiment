var gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    path = require('path'),
    jasmine = require('gulp-jasmine');

gulp.task('build', function() {
    return gulp.src('src/main.js')
        .pipe(webpack({
            module: {
                loaders: [
                    { test: /\.js$/, exclude: /node_modules|dist|old/, loader: 'babel-loader'}
                ]
            },
            output: {
                filename: 'main.js',
            }
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('test', function() {
    return gulp.src('test/test.js')
        .pipe(jasmine());
})