/* global module:true */




module.exports = function(grunt) {
    'use strict';

    var MODULE_NAME = 'SettingsManagerUI',
        BUILD_DIR = 'build',
        DIST_DIR = 'dist',
        STAGE_DIR = BUILD_DIR + '/' + DIST_DIR,
        rollup = require('rollup').rollup,
        // TODO: Use rollup-plugin-uglify?
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
        // open: {
        //     source: {
        //         path: 'test/source.html'
        //     },
        //     dist: {
        //         path: 'test/dist.html'
        //     },
        //     distmin: {
        //         path: 'test/dist-min.html'
        //     }
        // },
        // watch: {
        //     options: {
        //         livereload: true
        //     },
        //     files: ['src/**/*.*', 'spec/**/*.*', 'test/**/*.*', 'Gruntfile.js']
        // },
        // uglify: {
        //     options: {
        //         sourceMap: true
        //     },
        //     dist: {
        //         files: {
        //         'dist/SettingsManagerUI.min.js': ['dist/SettingsManagerUI.js']
        //         }
        //     }
        // },
        // jshint: {
        //     options: {
        //         jshintrc: '.jshintrc'
        //     },
        //     source: ['src/SettingsManagerUI.js'],
        //     // Only lint the unmin file
        //     dist: ['dist/SettingsManagerUI.js']
        // },
        // copy: {
        //     options: {
        //         process: _resolveFileContent
        //     },
        //     dist: {
        //         files: [
        //             {
        //                 expand: true,
        //                 cwd: 'src/',
        //                 src: ['**/*.js'],
        //                 dest: 'dist/',
        //                 filter: 'isFile'
        //             }
        //         ]
        //     }
        // },
        // mocha: {
        //     options: {
        //         // Uncomment to see console logging
        //         // log: true,
        //         run: true,
        //         reporter: 'Spec'
        //     },
        //     all: {
        //         src: ['test/**/*.*']
        //     },
        //     source: {
        //         src: ['test/source.html']
        //     },
        //     dist: {
        //         src: ['test/dist.html']
        //     },
        //     distmin: {
        //         src: ['test/dist-min.html']
        //     }
        // }
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
    // grunt.loadNpmTasks('grunt-bump');
    // grunt.loadNpmTasks('grunt-mocha');
    // grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register tasks
    // grunt.registerTask('build', ['jshint:source']);
    // grunt.registerTask('build-dist', ['build', 'copy:dist', 'uglify:dist', 'jshint:dist']);
    // grunt.registerTask('dist', ['bump:patch', 'build-dist', 'mocha:all']);
    // grunt.registerTask('release-patch', ['dist'  /*TODO: check for non-added files, add package files, verify no other changes, commit, tag, push*/]);
    // grunt.registerTask('release-minor', ['dist', /*TODO: check for non-added files, add package files, verify no other changes, commit, tag */ 'bump:minor' /*TODO: add package files, commit, push*/ ]);
    // grunt.registerTask('release-major', ['dist', /*TODO: check for non-added files, add package files, verify no other changes, commit, tag */ 'bump:major' /*TODO: add package files, commit, push*/ ]);
    // //
    // // Test tasks
    // //
    // // Test the source code
    // grunt.registerTask('test-source', ['open:source', 'watch']);
    // grunt.registerTask('test', ['test-source']); // Alias for test-source
    // // Test the code in dist
    // grunt.registerTask('test-dist', ['build-dist', 'open:dist', 'watch']);
    // // Test the minified dist file
    // grunt.registerTask('test-dist-min', ['build-dist', 'open:distmin', 'watch']);
    // // Test all the files at once!
    // grunt.registerTask('test-all', ['build-dist', 'open:source', 'open:dist', 'open:distmin', 'watch']);
    // //
    // // Headless test tasks
    // //
    // // Test the source code
    // grunt.registerTask('test-headless-source', ['mocha:source']);
    // grunt.registerTask('test-headless', ['test-headless-source']);
    // // Test the code in dist
    // grunt.registerTask('test-headless-dist', ['build-dist', 'mocha:dist']);
    // // Test the minified dist file
    // grunt.registerTask('test-headless-dist-min', ['build-dist', 'mocha:distmin']);
    // // Test all the code (source and dist)
    // grunt.registerTask('test-headless-all', ['build-dist', 'mocha:all']);

    grunt.registerTask('build', [/*'jshint',*/ 'copy', 'transpile', 'uglify']);
    grunt.registerTask('build:watch', ['build', 'watch:build']);
    grunt.registerTask('transpile', 'Transpiles to ES5', function () {
        var done = this.async();

        rollup({
            entry: 'src/SettingsManagerUI.js',

            external: ['template-manager'],
            output: {
                file: 'distr/SettingsManagerUI-R.js',
                format: 'cjs',
                sourcemap: true,
                globals: {
                    'template-manager': 'TemplateManager'
                }
            },
            // globals: {
            //     'template-manager': 'TemplateManager'
            // },
            // blarg: true,
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