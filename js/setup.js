'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var firstnames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var getUserNames = function () {
  var userNames = [];
  for (var i = 1; i < firstnames.length; i++) {
    userNames.push(firstnames[getRandom(1, firstnames.length - 1)] + ' ' + secondnames[getRandom(1, secondnames.length - 1)]);
  }

  return userNames;
};


var getWizards = function () {
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyeColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var names = getUserNames();

  var wizards = [];

  for (var i = 0; i < 4; i++) {
    wizards.push({
      name: names[i],
      coatColor: coatColors[i],
      eyeColor: eyeColors[i]
    });
  }
  return wizards;
};

var wizardsList = getWizards();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizardsList.length; i++) {
  fragment.appendChild(renderWizard(wizardsList[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('.hidden');
