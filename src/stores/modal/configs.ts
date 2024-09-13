import { ModalConfigsType } from './';

export enum ModalType {
  NONE = 'NONE',
  SINGLE_BUTTON = 'SINGLE_BUTTON',
  TWO_BUTTONS = 'TWO_BUTTONS',
  STACKED_BUTTONS = 'STACKED_BUTTONS',
}

export enum LostItemRegistrationModalKeys {
  CONFIRMATION = 'CONFIRMATION',
}

export enum LostItemColorsModalKeys {
  OTHER_COLOR_SELECTED = 'OTHER_COLOR_SELECTED',
}

export enum HomeModalKeys {}

export enum ScreenKeys {
  LOST_ITEM_REGISTRATION = 'LOST_ITEM_REGISTRATION',
  HOME = 'HOME',
  LOST_ITEM_COLORS = 'LOST_ITEM_COLORS',
}

export const MODAL_CONFIGS: ModalConfigsType = {
  [ScreenKeys.LOST_ITEM_REGISTRATION]: {
    [LostItemRegistrationModalKeys.CONFIRMATION]: {
      title: '이대로 등록할까요?',
      body: '카테고리와 색상을 선택하지 않으면\n매칭 리스트를 확인할 수 없어요.',
      primaryButtonText: '확인',
      secondaryButtonText: '취소',
      modalType: ModalType.TWO_BUTTONS,
    },
  },
  [ScreenKeys.LOST_ITEM_COLORS]: {
    [LostItemColorsModalKeys.OTHER_COLOR_SELECTED]: {
      title: '색상 선택',
      body: '기타를 선택하면 다른 색상은\n선택할 수 없어요.',
      primaryButtonText: '확인',
      modalType: ModalType.SINGLE_BUTTON,
    },
  },
  [ScreenKeys.HOME]: {
    // 홈스크린 등록 관련 모달 설정을 여기에 추가
  },
};

export const ModalKeysByScreen = {
  [ScreenKeys.LOST_ITEM_REGISTRATION]: LostItemRegistrationModalKeys,
  [ScreenKeys.HOME]: HomeModalKeys,
  [ScreenKeys.LOST_ITEM_COLORS]: LostItemColorsModalKeys,
} as const;

