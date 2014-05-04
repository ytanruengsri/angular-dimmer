module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-css');
    grunt.registerTask('compress', ['concat:js', 'uglify:js', 'cssmin']);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        src: {
            js: ['*.js']
        },
        cssmin: {
            css:{
                src: ['*.css', '!*.min.css'],
                dest: 'angular-dimmer.min.css'
            }
        },
        concat: {
            js : {
                src : [
                    'angular-*.js'
                ],
                dest : 'angular-dimmer.min.js'
            }
        },
        uglify : {
            js: {
                files: {
                    'angular-dimmer.min.js' : ['angular-dimmer.min.js']
                }
            }
        }
    });
};