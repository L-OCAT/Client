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

export enum HomeModalKeys {
  NO_LOST_ITEM = 'NO_LOST_ITEM',
}

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
      singleMessage: '\'기타\'를 선택하면\n다른 색상을 선택할 수 없어요.',
      primaryButtonText: '확인',
      modalType: ModalType.SINGLE_BUTTON,
    },
  },
  [ScreenKeys.HOME]: {
    [HomeModalKeys.NO_LOST_ITEM]: {
      singleMessage: '아직 등록한 분실물이 없어요',
      primaryButtonText: '분실물 등록하기',
      secondaryButtonText: '근처 습득물 보러가기',
      modalType: ModalType.STACKED_BUTTONS,
    },
  },
};

export const ModalKeysByScreen = {
  [ScreenKeys.LOST_ITEM_REGISTRATION]: LostItemRegistrationModalKeys,
  [ScreenKeys.HOME]: HomeModalKeys,
  [ScreenKeys.LOST_ITEM_COLORS]: LostItemColorsModalKeys,
} as const;

