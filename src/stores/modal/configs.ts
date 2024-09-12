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

export enum HomeModalKeys {}

export enum ScreenKeys {
  LOST_ITEM_REGISTRATION = 'LOST_ITEM_REGISTRATION',
  HOME = 'HOME',
  // 다른 스크린 키를 여기에 추가할 수 있습니다.
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
  [ScreenKeys.HOME]: {
    // 홈스크린 등록 관련 모달 설정을 여기에 추가
  },
};

export const ModalKeysByScreen = {
  [ScreenKeys.LOST_ITEM_REGISTRATION]: LostItemRegistrationModalKeys,
  [ScreenKeys.HOME]: HomeModalKeys,
} as const;
