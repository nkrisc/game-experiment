var gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    path = require('path'),
    jasmine = require('gulp-jasmine'),
    gutil = require( 'gulp-util'),
    ftp = require( 'vinyl-ftp' );

gulp.task('build', function() {
    return gulp.src('src/main.js')
        .pipe(webpack({
            module: {
                loaders: [
                    { test: /\.js$/, exclude: /node_modules|dist|old/, loader: 'babel-loader'}
                ]
            },
            output: {
                filename: 'main.js'
            }
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('test', function() {
    return gulp.src('test/test.js')
        .pipe(jasmine());
});

/** Configuration **/
var user = process.env.FTP_USER;
var password = process.env.FTP_PWD;
var host = process.env.HOST;
var port = process.env.PORT;
var localFilesGlob = ['_site/**/*'];
var remoteFolder = process.env.REMOTE_FOLDER;


// helper function to build an FTP connection based on our configuration
function getFtpConnection() {
    return ftp.create({
        host: host,
        port: port,
        user: user,
        password: password,
        parallel: 5,
        log: gutil.log
    });
}

/**
 * Deploy task.
 * Copies the new files to the server
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy`
 */
gulp.task('ftp-deploy', function() {

    var conn = getFtpConnection();

    return gulp.src(localFilesGlob, { base: './_site/', buffer: false })
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files
        .pipe( conn.dest( remoteFolder ) )
        ;
});