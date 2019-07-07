'use strict';

(function () {

  var userNameInput = document.querySelector('.setup-user-name');
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
