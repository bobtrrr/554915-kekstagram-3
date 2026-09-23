import { isEscKeydown } from './util';
import { ALERT_SHOW_TIME } from './const';

const showAlert = (selector, capture) => {
  const alert = document.querySelector(`#${selector}`).content.querySelector(`.${selector}`).cloneNode(true);
  const closeButton = alert.querySelector(`.${selector}__button`);
  const alertInner = alert.querySelector(`.${selector}__inner`);

  const closeAlertClickHandler = () => closeAlert();

  function closeAlert () {
    closeButton.removeEventListener('click', closeAlertClickHandler);
    document.removeEventListener('keydown', documentEscKeydownHandler, capture);
    document.removeEventListener('click', documentClickHandler);

    alert.remove();
  }

  function documentClickHandler (evt) {
    const isChild = alertInner.contains(evt.target);

    if (!isChild) {
      closeAlert();
    }
  }

  function documentEscKeydownHandler (evt) {
    if (isEscKeydown(evt)) {
      evt.stopPropagation();
      closeAlert();
    }
  }


  closeButton.addEventListener('click', closeAlertClickHandler);
  document.addEventListener('keydown', documentEscKeydownHandler, capture);
  document.addEventListener('click', documentClickHandler);

  document.body.append(alert);
};

const showErrorAlert = (selector) => {
  const errorAlert = document.querySelector(`#${selector}`)
    .content
    .querySelector(`.${selector}`)
    .cloneNode(true);

  document.body.append(errorAlert);

  setTimeout(() => {
    errorAlert.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert, showErrorAlert};
