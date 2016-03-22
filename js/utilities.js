define([], function () {
  'use strict';

  var Util = {
    randomInteger: function (num) {
      return Math.floor(Math.random() * num);
    }
  };

  return Util;
});
