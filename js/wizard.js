'use strict';

(function () {

  var COAT_COLORS = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ];

  var EYES_COLORS = [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple'
  ];

  var setupWizard = document.querySelector('.setup-wizard');
  var fireballsWrap = document.querySelector('.setup-fireball-wrap');
  var fireballHiddenInput = fireballsWrap.querySelector('[name="fireball-color"]');

  var wizard = {
    onEyesChange: function (color) {},
    onCoatChange: function (color) {}
  };

  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  // изменяет цвет мантии при клике мантию
  wizardCoat.addEventListener('click', function () {
    var newColor = window.util.getRandomArrayElement(COAT_COLORS);
    this.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  var wizardEyes = document.querySelector('.wizard-eyes');
  // изменяет цвет глаз при клике на глаза
  wizardEyes.addEventListener('click', function () {
    var newColor = window.util.getRandomArrayElement(EYES_COLORS);
    this.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  var fireball = document.querySelector('.setup-fireball');
  // цвет fireball
  fireball.addEventListener('click', function () {
    var colorFireball = window.util.getRandomArrayElement(colorFireball);
    fireballsWrap.style.background = colorFireball;
    fireballHiddenInput.value = colorFireball;
  });

  return window.wizard = wizard;

})();
