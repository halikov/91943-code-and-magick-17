'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  // добавляет окну настройки персонажа класс hidden при нажатии ESC
  var onPopupESCPress = function (evt) {
    if (document.activeElement !== document.querySelector('.setup-user-name')) {
      window.util.isEscEvent(evt, hideUserDialog);
    }
  };

  // показывает окно настройки персонажа
  var showUserDialog = function () {
    setup.classList.remove('hidden');
    setup.querySelector('.setup-similar').classList.remove('hidden');
    document.addEventListener('keydown', onPopupESCPress);
    setup.style.top = '';
    setup.style.left = '';
  };

  var hideUserDialog = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupESCPress);
  };

  setupOpen.addEventListener('click', function () {
    showUserDialog();
  });

  // при нажатии ENTER аватарку пользователя удаляет класс hidden окна настройки персонажа
  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, showUserDialog);
  });

  // при клике на крестике добавляет класс hidden окну настройки персонажа
  setupClose.addEventListener('click', function () {
    hideUserDialog();
  });

  // при нажатии ENTER на крестике добавляет класс hidden окну настройки персонажа
  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, hideUserDialog);
  });
})();
