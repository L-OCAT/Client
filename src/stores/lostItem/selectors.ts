import {DefaultValue, selector} from 'recoil';
import {
  lostItemCategoryAtom,
  lostItemColorsAtom,
  lostItemDescriptionAtom,
  lostItemImagesAtom,
  lostItemIsRewardOfferedAtom,
  lostItemLocationAtom,
  lostItemMainImageAtom,
  lostItemNameAtom,
} from './atoms';
import {ColorOption, LostItem, MainCategory, PartialLostItem} from './types';

export const partialLostItemSelector = selector<PartialLostItem>({
  key: 'partialLostItemSelector',
  get: ({get}) => ({
    images: get(lostItemImagesAtom),
    mainImage: get(lostItemMainImageAtom),
    name: get(lostItemNameAtom),
    category: get(lostItemCategoryAtom),
    colors: get(lostItemColorsAtom),
    description: get(lostItemDescriptionAtom),
    isRewardOffered: get(lostItemIsRewardOfferedAtom),
    location: get(lostItemLocationAtom),
  }),
  set: ({set}, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(lostItemImagesAtom, []);
      set(lostItemMainImageAtom, null);
      set(lostItemNameAtom, '');
      set(lostItemCategoryAtom, {main: null, sub: null});
      set(lostItemColorsAtom, []);
      set(lostItemDescriptionAtom, '');
      set(lostItemIsRewardOfferedAtom, false);
      set(lostItemLocationAtom, null);
    } else {
      if (newValue.images !== undefined)
        set(lostItemImagesAtom, newValue.images);
      if (newValue.mainImage !== undefined)
        set(lostItemMainImageAtom, newValue.mainImage);
      if (newValue.name !== undefined) set(lostItemNameAtom, newValue.name);
      if (newValue.category !== undefined)
        set(lostItemCategoryAtom, newValue.category);
      if (newValue.colors !== undefined)
        set(lostItemColorsAtom, newValue.colors);
      if (newValue.description !== undefined)
        set(lostItemDescriptionAtom, newValue.description);
      if (newValue.isRewardOffered !== undefined)
        set(lostItemIsRewardOfferedAtom, newValue.isRewardOffered);
      if (newValue.location !== undefined)
        set(lostItemLocationAtom, newValue.location);
    }
  },
});

export const isRequiredFilledSelector = selector<boolean>({
  key: 'isRequiredFilledSelector',
  get: ({get}) => {
    const name = get(lostItemNameAtom);
    const category = get(lostItemCategoryAtom);
    const colors = get(lostItemColorsAtom);
    const isRewardOffered = get(lostItemIsRewardOfferedAtom);

    return (
      name.trim() !== '' &&
      category.main !== null &&
      colors.length > 0 &&
      colors.length <= 2 &&
      typeof isRewardOffered === 'boolean'
    );
  },
});

export const hasSpecialCategoryOrColorSelector = selector<boolean>({
  key: 'hasSpecialCategoryOrColorSelector',
  get: ({get}) => {
    const category = get(lostItemCategoryAtom);
    const colors = get(lostItemColorsAtom);

    return (
      category.main === MainCategory.NONE || colors.includes(ColorOption.OTHER)
    );
  },
});

export const isLostItemCompleteSelector = selector<boolean>({
  key: 'isLostItemCompleteSelector',
  get: ({get}) => {
    const isRequiredFilled = get(isRequiredFilledSelector);
    const location = get(lostItemLocationAtom);

    return isRequiredFilled && location !== null;
  },
});

export const completeLostItemSelector = selector<LostItem | null>({
  key: 'completeLostItemSelector',
  get: ({get}) => {
    const partialItem = get(partialLostItemSelector);
    const isComplete = get(isLostItemCompleteSelector);

    if (!isComplete) {
      return null;
    }

    return {
      name: partialItem.name!,
      category: partialItem.category!,
      colors: partialItem.colors!,
      isRewardOffered: partialItem.isRewardOffered!,
      location: partialItem.location!,
      images: partialItem.images || [],
      mainImage: partialItem.mainImage || null,
      description: partialItem.description || '',
    };
  },
});
