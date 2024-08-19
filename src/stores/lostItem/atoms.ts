import {atom} from 'recoil';
import {CategorySelection} from './types';

export const lostItemNameAtom = atom<string>({
  key: 'lostItemNameAtom',
  default: '',
});

export const lostItemImagesAtom = atom<string[]>({
  key: 'lostItemImagesAtom',
  default: [],
});

export const lostItemMainImageAtom = atom<string | null>({
  key: 'lostItemMainImageAtom',
  default: null,
});
export const lostItemCategoryAtom = atom<CategorySelection>({
  key: 'lostItemCategoryAtom',
  default: {
    main: null,
    sub: null,
  },
});

export const lostItemColorsAtom = atom<string[]>({
  key: 'lostItemColorsAtom',
  default: [],
});

export const lostItemDescriptionAtom = atom<string>({
  key: 'lostItemDescriptionAtom',
  default: '',
});

export const isRewardOfferedAtom = atom<boolean>({
  key: 'isRewardOfferedAtom',
  default: false,
});
