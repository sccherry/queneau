define([], function () {
  'use strict';

  function Controller($http) {

    /**
     * Variables
     */

    var data;


    /**
     * Get and set data
     */

    $http.get('data/poem.json').then(function (response) {
      data = response.data;
    });
  }

  Controller.$inject = ['$http'];

  return Controller;
});
