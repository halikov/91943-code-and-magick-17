'use strict';
// util.js
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // возварщает случайное число от min до max
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomArrayElement: function (someArray) {
      return someArray[getRandom(0, (someArray.length - 1))];
    }
  };
})();
