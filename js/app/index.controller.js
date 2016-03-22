define([
  'utilities'
], function (Util) {
  'use strict';

  function Controller($http, $scope) {

    /**
     * Variables
     */

    var self = this,
      data,
      activeIndex = null;

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

    self.isChanged = function (i) {
      return i === activeIndex ? 'is-changed' : '';
    }

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


    /**
     * Update data and repeat
     */

    setInterval(function () {
      var index = Util.randomInteger(data.length);

      activeIndex = index;
      self.lines[index] = pickLine(index);

      $scope.$apply();
    }, 5000);
  }

  Controller.$inject = ['$http', '$scope'];

  return Controller;
});
