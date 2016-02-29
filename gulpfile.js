var gulp = require('gulp');
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var nodemon = require('nodemon');

var clientConfig = require('./webpack.client.js');
var serverConfig = require('./webpack.server.js');

function onBuild(done) {
    return function (err, stats) {
        if (err) console.log('Error', err);
        else console.log(stats.toString());
        if (done) done();
    }
}

gulp.task('client-build', function (done) {
    webpack(clientConfig).run(onBuild(done));
});

gulp.task('client-watch', function () {
    new WebpackDevServer(webpack(clientConfig), {
        publicPath: clientConfig.output.publicPath,
        hot: true
    }).listen(5001, 'localhost', function (err, result) {
        if (err) console.log(err);
        else console.log('webpack dev server listening at localhost:5001');
    });
});

gulp.task('server-build', function (done) {
    webpack(serverConfig).run(onBuild(done));
});

gulp.task('server-watch', function (done) {
    var firedDone = false;
    webpack(serverConfig).watch(100, function (err, stats) {
        if (!firedDone) {
            firedDone = true;
            done();
        }
        nodemon.restart();
    });
});

gulp.task('build', ['client-build', 'server-build']);

gulp.task('watch', ['server-watch', 'client-watch'], function () {
    nodemon({
        execMap: {
            js: 'node'
        },
        script: path.join(__dirname, 'build/server.js'),
        ignore: ['*'],
        watch: ['foo/'],
        ext: 'noop'
    }).on('restart', function () {
        console.log('server code patched');
    });
});

gulp.task('run', ['watch']);