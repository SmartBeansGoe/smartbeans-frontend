export const SHIRTS = 'shirts';
export const PANTS = 'pants';
export const HATS = 'hats';
export const FACES = 'faces';

export const attributes = {
  standard: {
    'not-work-with': ['no-pants'],
    order: [FACES, PANTS, SHIRTS, HATS],
  },
  'on-top': {
    'not-work-with': ['no-pants'],
    order: [FACES, SHIRTS, PANTS, HATS],
  },
  'no-pants': {
    'not-work-with': ['on-top'],
    order: [FACES, SHIRTS, HATS],
  },
};

export const attributePriority = ['no-pants', 'on-top', 'standard'];

export const BLUE = '#489ac7';
export const LIGHTBLUE = '#a2cce2';
