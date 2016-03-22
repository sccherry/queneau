define([
  'utilities'
], function (Util) {
  'use strict';

  function Controller($http) {

    /**
     * Variables
     */

    var self = this,
      data;

    self.lines = [];

    self.langs = ['fr', 'en'];

    self.activeLang = 'en';

    self.title = {
      'fr': 'Cent mille milliards de poèmese',
      'en': 'One hundred million million poems'
    };


    /**
     * Private functions
     */

    function pickLine(i) {
      var lineIndex,
        line;

      lineIndex = Util.randomInteger(data[i].length);
      line = data[i][lineIndex];

      return line;
    }


    /**
     * Public functions
     */

    self.isActiveLang = function (lang) {
      return lang === self.activeLang ? 'is-active': '';
    }


    /**
     * Get and set data
     */

    $http.get('data/poem.json').then(function (response) {
      data = response.data;

      data.forEach(function (currentValue, index, array) {
        self.lines.push(pickLine(index));
      });
    });
  }

  Controller.$inject = ['$http'];

  return Controller;
});
