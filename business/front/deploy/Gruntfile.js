'use strict';

module.exports = function(grunt){

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        yeoman: {
          app: 'app'
        },

        watch:{
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '<%= yeoman.app %>/assets/css/{,*/}*.css'
                ],
                tasks: [
                    'newer:watch:livereload:files'
                ]
            }
        },

        connect: {
            options: {
                port: 8083,
                hostname: '0.0.0.0',
                livereload: 35732
            },
            livereload: {
                options: {
                    open: true,
                    base: ['<%= yeoman.app %>']
                }
            }
        }
    });

    grunt.registerTask('serve', function(){
        grunt.task.run([
            'connect:livereload',
            'watch'
        ]);
    });

};