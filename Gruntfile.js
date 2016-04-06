//noinspection JSUnresolvedVariable
module.exports = function (grunt) {

    //noinspection JSUnresolvedFunction
    grunt.initConfig({
        shell: { // для запуска 8080 своими командами
            dev: {
                command: 'node server'
            },
            options: {
                stdout: true,
                stderr: true
            //},
            //server: {
            //    command: 'node server.js'
            }
        },
        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates', // исходная директория
                    src: '*.xml', // имена шаблонов
                    dest: 'public_html/js/tmpl' // результирующая директория
                }],
                options: {
                    template: function (data) { /* задаем формат функции-шаблона */

                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });', /* присваиваем функцию-шаблон переменной */
                            {data: data}
                        );
                    }
                }
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015'],
                plugins: [
                    ["transform-es2015-arrow-functions", { "spec": true }]
                ]
            },
            dist: {
                files: [{
                    "expand": true,
                    "cwd": "public_html/js",
                    "src": "**/*.jsx",
                    "ext": ".js"
                }]
            }
        },
        watch: {//наблюдает за измененинями
            fest: {
                files: ['templates/**/*.xml'],
                tasks: ['fest'],
                options: {
                    interrupt: true,
                    atBegin: true,
                    spawn: false,
                }

            },
            babel: {
                files: ['public_html/js/**/*.jsx'],
                tasks: ['babel'],
                options: {
                    interrupt: true,
                    atBegin: true,
                    spawn: false,
                }
            },

            server: {
                files: [
                    'public_html/js/**/*.js',
                    'public_html/css/**/*.css'
                ],
                options: {
                    interrupt: true,
                    livereload: true //подгрузка изменений в реальном времени
                }
            }
        },
        concurrent: { // запускает shell and watch
            target: ['watch', 'shell'],
            options: {
                logConcurrentOutput: true
            }
        },
        qunit: {
            all: ['./public_html/tests/index.html']
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('test', ['qunit:all']);
    grunt.registerTask('default', ['concurrent']);

};