'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyeColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
// var setupSubmit = userDialog.querySelector('.setup-submit');
var userNameInput = userDialog.querySelector('.setup-user-name');

var setupWizard = document.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardCoatHiddenInput = document.querySelector('[name="coat-color"]');
var wizardEyesHiddenInput = document.querySelector('[name="eyes-color"]');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var fireballsWrap = document.querySelector('.setup-fireball-wrap');
var fireball = fireballsWrap.querySelector('.setup-fireball');
var fireballHiddenInput = fireballsWrap.querySelector('[name="fireball-color"]');
// добавляет окну настройки персонажа класс hidden при нажатии ESC
var onPopupESCPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== document.querySelector('.setup-user-name')) {
    userDialog.classList.add('hidden');
  }
};

// показывает окно настройки персонажа
var showUserDialog = function () {
  userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
  document.addEventListener('keydown', onPopupESCPress);
};

// скрывает окно настройки персонажа
var hideUserDialog = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupESCPress);
};

setupOpen.addEventListener('click', function () {
  showUserDialog();
});

// при нажатии ENTER аватарку пользователя удаляет класс hidden окна настройки персонажа
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    showUserDialog();
  }
});

// при клике на крестике добавляет класс hidden окну настройки персонажа
setupClose.addEventListener('click', function () {
  hideUserDialog();
});

// при нажатии ENTER на крестике добавляет класс hidden окну настройки персонажа
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    hideUserDialog();
  }
});

// возварщает случайное число от min до max
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomArrayElement = function (someArray) {
  return someArray[getRandom(0, (someArray.length - 1))];
};

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

// изменяет цвет мантии при клике мантию
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getRandomArrayElement(coatColors);
  wizardCoatHiddenInput.value = wizardCoat.style.fill;
});

// изменяет цвет глаз при клике на глаза
wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getRandomArrayElement(eyeColors);
  wizardEyesHiddenInput.value = wizardEyes.style.fill;
});

// цвет fireball
fireball.addEventListener('click', function () {
  var fireballColor = getRandomArrayElement(fireballColors);
  fireballsWrap.style.background = fireballColor;
  fireballHiddenInput.value = fireballColor;
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

// отрисовка персонажа
// составляет массив имен персонажа из массивов имён и фамилий
var getUserNames = function () {
  var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var userNames = [];
  for (var i = 0; i < firstNames.length; i++) {
    // userNames.push(firstNames[getRandom(1, firstNames.length - 1)] + ' ' + secondNames[getRandom(1, secondNames.length - 1)]);
    userNames.push(getRandomArrayElement(firstNames) + ' ' + getRandomArrayElement(secondNames));
  }

  return userNames;
};

var getWizards = function () {
  var names = getUserNames();

  var wizards = [];

  for (var i = 0; i < 4; i++) {
    wizards.push({
      name: names[i],
      coatColor: getRandomArrayElement(coatColors), // coatColors[getRandom(1, (coatColors.length - 1))],
      eyeColor: getRandomArrayElement(eyeColors) // eyeColors[getRandom(1, (eyeColors.length - 1))]
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
// showUserDialog();
// hideUserDialog();
