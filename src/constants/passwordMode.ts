import { SVGS } from './images';

const { eye } = SVGS;

export const PASSWORD_SHOW_MODE = {
  on: {
    iconEye: eye.on.url,
    inputType: 'text',
    showMode: eye.on.alt,
  },
  off: {
    iconEye: eye.off.url,
    inputType: 'password',
    showMode: eye.off.alt,
  },
};
