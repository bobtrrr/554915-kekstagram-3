const EFFECT_TYPE = {
  NONE: 'none',
};

const UNIT = {
  PIXEL: 'px',
  PERCENT: '%',
  NONE: '',
};

const EFFECT_CONFIGS = {
  none: {
    filter: 'none',
    unit: UNIT.NONE,
    options: { min: 0, max: 100, step: 1, start: 100 }
  },
  chrome: {
    filter: 'grayscale',
    unit: UNIT.NONE,
    options: { min: 0, max: 1, step: 0.1, start: 1 }
  },
  sepia: {
    filter: 'sepia',
    unit: UNIT.NONE,
    options: { min: 0, max: 1, step: 0.1, start: 1 }
  },
  marvin: {
    filter: 'invert',
    unit: UNIT.PERCENT,
    options: { min: 0, max: 100, step: 1, start: 100 }
  },
  phobos: {
    filter: 'blur',
    unit: UNIT.PIXEL,
    options: { min: 0, max: 3, step: 0.1, start: 3 }
  },
  heat: {
    filter: 'brightness',
    unit: UNIT.NONE,
    options: { min: 1, max: 3, step: 0.1, start: 3 }
  }
};

export {EFFECT_TYPE, UNIT, EFFECT_CONFIGS};
