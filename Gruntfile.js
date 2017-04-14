'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  var files = {
    html: ['**/*.html'],
  };

  // Define the configuration for all the tasks
  grunt.initConfig({
    aws: grunt.file.readJSON('aws-keys.json'), // This is just a stub, it will actually pull the one from your ~.aws/credentials
    aws_s3: {
      options: {
        region: 'ap-northeast-1',
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },
      production: {
        options: {
          bucket: 'mt-omoikane-assets'
        },
        files: [
          {expand: true, cwd: '.', src: files.html, dest: '', params: { CacheControl: "no-cache,no-store" }},
        ]
      }
    }
  });

  grunt.registerTask('deploy', function (target) {
    var buildTasks;

    if (target === 'staging') {
      buildTasks = [
        'aws_s3:staging'
      ]
    }

    if (target === 'production') {
      buildTasks = [
        'aws_s3:production'
      ]
    }
    return grunt.task.run(buildTasks);
  });

};
