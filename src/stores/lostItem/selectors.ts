import {DefaultValue, selector} from 'recoil';
import {
  lostItemCategoryAtom,
  lostItemColorsAtom,
  lostItemDescriptionAtom,
  lostItemImageAtom,
  lostItemIsRewardOfferedAtom,
  lostItemLocationAtom,
  lostItemNameAtom,
} from './atoms';
import {ColorOption, LostItem, MainCategory, PartialLostItem} from './types';

// 모든 분실물 관련 atom들을 하나의 객체로 모아주는 selector
// 이 selector를 통해 모든 분실물 정보를 한 번에 가져오거나 설정할 수 있음
export const partialLostItemSelector = selector<PartialLostItem>({
  key: 'partialLostItemSelector',
  get: ({get}) => ({
    image: get(lostItemImageAtom),
    name: get(lostItemNameAtom),
    category: get(lostItemCategoryAtom),
    colors: get(lostItemColorsAtom),
    description: get(lostItemDescriptionAtom),
    isRewardOffered: get(lostItemIsRewardOfferedAtom),
    location: get(lostItemLocationAtom),
  }),
  set: ({set}, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(lostItemImageAtom, '');
      set(lostItemNameAtom, '');
      set(lostItemCategoryAtom, {main: null, sub: null});
      set(lostItemColorsAtom, []);
      set(lostItemDescriptionAtom, '');
      set(lostItemIsRewardOfferedAtom, false);
      set(lostItemLocationAtom, null);
    } else {
      if (newValue.image !== undefined) set(lostItemImageAtom, newValue.image);
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

// 필수입력 항목들이 모두 채워졌는지 확인하는 selector
// 분실물 등록 스크린에서 "다음"버튼 활성화 여부를 결정하는 데 사용
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

// 특별한 카테고리("해당없음")나 색상("기타")이 선택되었는지 확인하는 selector
// 이 경우 사용자에게 팝업 모달을 통해 안내 예정
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

// 모든 필수 정보(위치 포함)가 입력되었는지 확인하는 selector
// 최종적으로 분실물 정보가 완전한지 확인하는 데 사용
export const isLostItemCompleteSelector = selector<boolean>({
  key: 'isLostItemCompleteSelector',
  get: ({get}) => {
    const isRequiredFilled = get(isRequiredFilledSelector);
    const location = get(lostItemLocationAtom);

    return isRequiredFilled && location !== null;
  },
});

// 완전하고 유효한 분실물 정보를 제공하는 selector
// 백엔드로 분실물 정보를 보내기 전 최종 확인에 사용
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
      image: partialItem.image || '',
      description: partialItem.description || '',
    };
  },
});
