import { initFullPhoto, resetFullPhoto } from './full-photo';
import { isEscKeydown } from './util';

const modal = document.querySelector('.big-picture');
const closeModalButton = modal.querySelector('.big-picture__cancel');

const openModal = (photo) => {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  initFullPhoto(photo);

  window.addEventListener('keydown', documentKeydownHandler);
};

const closeModal = () => {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  resetFullPhoto();

  window.removeEventListener('keydown', documentKeydownHandler);
};

function documentKeydownHandler (evt) {
  if (isEscKeydown(evt)) {
    closeModal();
  }
}

closeModalButton.addEventListener('click', closeModal);

export {openModal};
