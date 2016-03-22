require.config({
  paths: {
    angular: 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular.min'
  },
  shim: {
    angular: {
      exports: 'angular'
    }
  }
});

require([
  'angular',
  'app/index.controller'
], function (angular, IndexController) {
  'use strict';

  var app = angular.module('app', []);

  app.controller('IndexController', IndexController);

  angular.bootstrap(document, ['app']);
});
