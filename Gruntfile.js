/* global module:true */

module.exports = function(grunt) {
    'use strict';

    var MODULE_NAME = 'SettingsManagerUI',
        BUILD_DIR = 'build',
        DIST_DIR = 'dist',
        STAGE_DIR = BUILD_DIR + '/' + DIST_DIR,
        rollup = require('rollup').rollup,
        resolve = require('rollup-plugin-node-resolve'),
        commonjs = require('rollup-plugin-commonjs'),
        babel = require('rollup-plugin-babel');


    // Change any strings in the content that match ${string} to the value specified in replacements.json
    var resolveFileContent = function(content) {
        var resolvedContent = content,
        // The file which has replacements in JSON format
        _replacementFilePath = 'replacements.json',
        // The replacements read in from the file
        _replacements = (function() {
            // If the file is not present, _replacements will be null
            if (grunt.file.exists(_replacementFilePath) && grunt.file.isFile(_replacementFilePath)) {
                    return grunt.file.readJSON(_replacementFilePath);
                }
            })(),
        // The build version
        _buildVersion = grunt.file.readJSON('package.json').version,
        // The build date
        _buildDate = new Date(),
        _buildUser = (function() {
            if ('win32' === process.platform) {
                return process.env.USERNAME;
            } else if ('linux' === process.platform) {
                return process.env.USER;
            }
        })();

        // The default resolvers (build user, version and date)
        resolvedContent = resolvedContent.replace(new RegExp('\\${build.user}', 'gi'), _buildUser);
        resolvedContent = resolvedContent.replace(new RegExp('\\${build.version}', 'gi'), _buildVersion);
        resolvedContent = resolvedContent.replace(new RegExp('\\${build.date}', 'gi'), _buildDate);

        // If the replacements file exists, use the key/value pairs from there
        if (_replacements) {
            for (var key in _replacements) {
                resolvedContent = resolvedContent.replace(new RegExp('\\${' + key + '}', 'gi'), _replacements[key]);
            }
        }

        // Return the resolved content
        return resolvedContent;
    };

    grunt.initConfig({
        watch: {
            build: {
                files: ['src/**/*.js', 'test/**/*.js'],
                tasks: ['build']
            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    [DIST_DIR + '/' + MODULE_NAME + '.min.js']: [DIST_DIR + '/' + MODULE_NAME + '.js']
                }
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: true
            },
            all: ['Gruntfile.js', 'src/*.js', 'test/**/*.js']
        },
        copy: {
            options: {
                process: resolveFileContent
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**/*.js'],
                        dest: STAGE_DIR,
                        filter: 'isFile'
                    }
                ]
            }
        }
    });


    // Load NPM tasks

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', [/*'jshint',*/ 'copy', 'transpile', 'uglify']);
    grunt.registerTask('build:watch', ['build', 'watch:build']);
    grunt.registerTask('transpile', 'Transpiles to ES5', function () {
        var done = this.async();

        rollup({
            entry: 'src/SettingsManagerUI.js',

            output: {
                file: 'distr/SettingsManagerUI-R.js',
                format: 'cjs',
                sourcemap: true,
            },
            input: STAGE_DIR + '/' + MODULE_NAME + '.js',
            plugins: [
                babel({
                    babelrc: false,
                    exclude: 'node_modules/**',
                    presets: [
                        [
                            'env',
                            {
                                modules: false
                            }
                        ]
                    ],
                    plugins: ['external-helpers'],
                    externalHelpers: false,
                }),
                resolve(),
                commonjs()
            ]
        })
        .then((result) => {
            return result.write(
                {
                    file: DIST_DIR + '/' + MODULE_NAME + '.js',
                    format: 'umd',
                    name: MODULE_NAME
                }
            );
        })
        .then((result) => {
            done();
        });

    });


    // Default task
    grunt.registerTask('default', 'build');
};