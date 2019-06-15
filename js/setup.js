'use strict';


var showUserDialog = function () {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  // можно открыть это. если нам потом понадобится обратиться к этому блоку, чтобы не писать путь к нему от его родителя.
  // var setupSimilar = document.querySelector('.setup-similar');
  // закрыть это. эта строчка экономит две (сверху и снизу) строчки. Если к setup-similar нам не нужно обращаться без setup.
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
  // setupSimilar.classList.remove('hidden');
};

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getUserNames = function () {
  var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var userNames = [];
  for (var i = 1; i < firstNames.length; i++) {
    userNames.push(firstNames[getRandom(1, firstNames.length - 1)] + ' ' + secondNames[getRandom(1, secondNames.length - 1)]);
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
      coatColor: coatColors[getRandom(1, (coatColors.length - 1))],
      eyeColor: eyeColors[getRandom(1, (eyeColors.length - 1))]
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
showUserDialog();
