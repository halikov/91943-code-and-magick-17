'use strict';

(function () {

  var userNameInput = document.querySelector('.setup-user-name');

  var setup = document.querySelector('.setup');
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardCoatHiddenInput = document.querySelector('[name="coat-color"]');
  var wizardEyesHiddenInput = document.querySelector('[name="eyes-color"]');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var fireballsWrap = document.querySelector('.setup-fireball-wrap');
  var fireball = fireballsWrap.querySelector('.setup-fireball');
  var fireballHiddenInput = fireballsWrap.querySelector('[name="fireball-color"]');

  // проверяет на валидность введенных данных в поле ввода
  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из двух символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  // проверка длины имени персонажа и вывод соответствующего предупреждения
  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя персонажа должно состоять минимум из 2-х символов');
    } else if (target.value.length > 25) {
      target.setCustomValidity('Имя персонажа не должно превышать 25-ти символов');
    } else {
      target.setCustomValidity('');
    }
  });

  // изменяет цвет мантии при клике мантию
  wizardCoat.addEventListener('click', function () {
    // wizardCoat.style.fill = window.util.getRandomArrayElement(colorCoat);
    wizardCoatHiddenInput.value = wizardCoat.style.fill;
  });

  // изменяет цвет глаз при клике на глаза
  wizardEyes.addEventListener('click', function () {
    // wizardEyes.style.fill = window.util.getRandomArrayElement(colorEye);
    wizardEyesHiddenInput.value = wizardEyes.style.fill;
  });

  // цвет fireball
  fireball.addEventListener('click', function () {
    var colorFireball = window.util.getRandomArrayElement(colorFireball);
    fireballsWrap.style.background = colorFireball;
    fireballHiddenInput.value = colorFireball;
  });

  var similarListElement = document.querySelector('.setup-similar-list');
  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEye;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.save(new FormData(form), function (response) {
      setup.classList.add('hidden');
    }, errorHandler);
  });

})();
