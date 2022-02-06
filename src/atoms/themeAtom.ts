import {atom} from "recoil";

export const themeAtom = atom({
  key: 'themeState',
  default: 'light',
});