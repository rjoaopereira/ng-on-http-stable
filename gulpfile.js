var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var ngTemplates = require('gulp-ng-templates');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var Server = require('karma').Server;
var isparta = require('isparta');
var istanbul = require('istanbul');
var browserifyIstanbul = require('browserify-istanbul');

function templates() {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(ngTemplates({
            filename: 'templates.js',
            module: 'ngOnHttpStableTemplates',
        }))
        .pipe(gulp.dest('./src'));
}

function compile(watch) {
    var bundler = watchify(browserify({
        entries: 'src/ng-on-http-stable.js',
        debug: true
    }).transform(babelify));

    function rebundle() {
        bundler.bundle()
            .on('error', function (err) {
                console.error(err);
                this.emit('end');
            })
            .pipe(source('build.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist'));
    }

    if (watch) {
        bundler.on('update', function () {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
}

function watch() {
    return compile(true);
}

function clean() {
    return del(['dist/**/*']);
}

function test(done) {
    var options = {
        basePath: process.cwd(),

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine', 'browserify'],

        // reporters
        reporters: ['mocha', 'coverage'],

        // list of files / patterns to load in the browser
        files: [
            { pattern: 'node_modules/angular/angular.js'},
            { pattern: 'node_modules/angular-mocks/angular-mocks.js'},
            { pattern: 'src/**/*.js'},
            { pattern: 'tests/**/*.js'}
        ],

        preprocessors: {
            'src/**/*.js': ['browserify'],
            'tests/**/*.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: [
                babelify,
                browserifyIstanbul({
                    instrumenter: isparta,
                    instrumenterConfig: {
                        noCompact: true
                    }
                })
            ]
        },

        coverageReporter: {
            dir: 'reports',
            reporters: [{ type: 'html', subdir: 'html' }]
        },

        proxies: {},

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        captureTimeout: 20000,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'PhantomJS2'
        ],

        // Which plugins to enable
        plugins: [
            'karma-jasmine',
            'karma-phantomjs2-launcher',
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-browserify',
            'karma-mocha-reporter'
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        colors: true,

        // logLevel: 'LOG_DEBUG'

    };
    return new Server(options, function (exitStatus) {
        exitStatus ? process.exit(0) : done && done();
    }).start();
}

gulp.task('clean', clean);
gulp.task('templates', ['clean'], templates);
gulp.task('build', ['templates'], function () { return compile(); });
gulp.task('watch', function () { return watch(); });
gulp.task('default', ['watch']);
gulp.task('test', function (done) { return test(done); });
