import { isEscKeydown } from './util.js';
import { resetScale, initScale } from './scale.js';
import { initEffects, resetEffects } from './effect.js';
import { initValidation,resetValidation } from './validate.js';
import { initUploadFile, resetUploadFile } from './upload.js';

const uploadForm = document.querySelector('.img-upload__form');
const openUploadButton = uploadForm.querySelector('.img-upload__input');
const closeUploadButton = uploadForm.querySelector('.img-upload__cancel');
const uploadPopup = uploadForm.querySelector('.img-upload__overlay');
const commentInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');

const isElementFocused = (element) => document.activeElement === element;
const isTextFieldFocused = () => isElementFocused(hashtagInput) || isElementFocused(commentInput);

const initForm = () => {
  initUploadFile();
  initScale();
  initEffects();
  initValidation(closeUploadForm);
};

const resetForm = () => {
  resetUploadFile();
  resetScale();
  resetEffects();
  resetValidation();
};

const closeUploadFormClickHandler = () => closeUploadForm();

function documentEscKeydownHandler (evt) {
  if (isEscKeydown(evt) && !isTextFieldFocused()) {
    closeUploadForm();
  }
}

function closeUploadForm () {
  uploadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');

  resetForm();

  closeUploadButton.removeEventListener('click', closeUploadFormClickHandler);
  document.removeEventListener('keydown', documentEscKeydownHandler);
}

function openUploadForm () {
  uploadPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');

  initForm();

  closeUploadButton.addEventListener('click', closeUploadFormClickHandler);
  document.addEventListener('keydown', documentEscKeydownHandler);
}


openUploadButton.addEventListener('change', openUploadForm);


