import {atom} from 'recoil';
import {CategorySelection, SelectedColors} from './types';

export const lostItemNameAtom = atom<string>({
  key: 'lostItemNameAtom',
  default: '',
});

export const lostItemImageAtom = atom<string>({
  key: 'lostItemImageAtom',
  default: '',
});

export const lostItemCategoryAtom = atom<CategorySelection>({
  key: 'lostItemCategoryAtom',
  default: {
    main: null,
    sub: null,
  },
});

export const lostItemColorsAtom = atom<SelectedColors>({
  key: 'lostItemColorsAtom',
  default: [],
});

export const lostItemDescriptionAtom = atom<string>({
  key: 'lostItemDescriptionAtom',
  default: '',
});

export const lostItemIsRewardOfferedAtom = atom<boolean>({
  key: 'lostItemIsRewardOfferedAtom',
  default: false,
});

export const lostItemLocationAtom = atom<string | null>({
  key: 'lostItemLocationAtom',
  default: null,
});
