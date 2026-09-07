import '../vendor/nouislider/nouislider';

const scaleContainer = document.querySelector('.img-upload');
const scaleMinusButton = scaleContainer.querySelector('.scale__control--smaller');
const scalePlusButton = scaleContainer.querySelector('.scale__control--bigger');
const scaleInput = scaleContainer.querySelector('.scale__control--value');
const scaleImage = scaleContainer.querySelector('.img-upload__preview img');

const SCALE_VALUE = {
  MAX: 100,
  MIN: 25,
  DEFAULT: 100,
  STEP: 25,
};

let currentScale = SCALE_VALUE.DEFAULT;

const normalizeScale = (value) => value / 100;

const updateDisplayScale = (scale) => (scaleInput.value = `${scale}%`);
const updateImageScale = (scale) => (scaleImage.setAttribute('style', `transform: scale(${normalizeScale(scale)})`));

const resetScale = () => {
  currentScale = SCALE_VALUE.DEFAULT;

  updateDisplayScale(SCALE_VALUE.DEFAULT);
  updateImageScale(SCALE_VALUE.DEFAULT);
};

updateDisplayScale(currentScale);

const scaleMinusButtonHandler = () => {
  if (currentScale > SCALE_VALUE.MIN) {
    currentScale -= SCALE_VALUE.STEP;
  }

  updateDisplayScale(currentScale);
  updateImageScale(currentScale);
};

const scalePlusButtonHandler = () => {
  if (currentScale < SCALE_VALUE.MAX) {
    currentScale += SCALE_VALUE.STEP;
  }

  updateDisplayScale(currentScale);
  updateImageScale(currentScale);
};

scaleMinusButton.addEventListener('click', scaleMinusButtonHandler);
scalePlusButton.addEventListener('click', scalePlusButtonHandler);

export {resetScale};
