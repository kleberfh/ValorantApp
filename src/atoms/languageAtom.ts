import {atom} from "recoil";

export const languageAtom = atom({
  key: 'languageState',
  default: 'en-US',
});