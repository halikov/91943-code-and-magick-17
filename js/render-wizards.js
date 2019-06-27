'use strict';

(function () {
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyeColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userNameInput = document.querySelector('.setup-user-name');

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
    wizardCoat.style.fill = window.util.getRandomArrayElement(coatColors);
    wizardCoatHiddenInput.value = wizardCoat.style.fill;
  });

  // изменяет цвет глаз при клике на глаза
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = window.util.getRandomArrayElement(eyeColors);
    wizardEyesHiddenInput.value = wizardEyes.style.fill;
  });

  // цвет fireball
  fireball.addEventListener('click', function () {
    var fireballColor = window.util.getRandomArrayElement(fireballColors);
    fireballsWrap.style.background = fireballColor;
    fireballHiddenInput.value = fireballColor;
  });

  // отрисовка персонажа
  // составляет массив имен персонажа из массивов имён и фамилий
  var getUserNames = function () {
    var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
    var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
    var userNames = [];
    for (var i = 0; i < firstNames.length; i++) {
      userNames.push(window.util.getRandomArrayElement(firstNames) + ' ' + window.util.getRandomArrayElement(secondNames));
    }

    return userNames;
  };

  var getWizards = function () {
    var names = getUserNames();

    var wizards = [];

    for (var i = 0; i < 4; i++) {
      wizards.push({
        name: names[i],
        coatColor: window.util.getRandomArrayElement(coatColors),
        eyeColor: window.util.getRandomArrayElement(eyeColors)
      });
    }
    return wizards;
  };
  var wizardsList = getWizards();

  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

    return wizardElement;
  };

  var renderAllWizards = function () {
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    wizardsList.forEach(function (item) {
      fragment.appendChild(renderWizard(item));
    });
    similarListElement.appendChild(fragment);
  };

  renderAllWizards();
})();
