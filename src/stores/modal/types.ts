import { ModalKeysByScreen, ModalType, ScreenKeys } from './configs';

export interface ModalState {
  isVisible: boolean;
  title?: string;
  body: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryButtonPress?: () => void;
  onSecondaryButtonPress?: () => void;
  modalType: ModalType
}

export type ModalKeysByScreenType = typeof ModalKeysByScreen;

export type ModalConfigsType = {
  [K in ScreenKeys]: {
    [P in keyof (typeof ModalKeysByScreen)[K]]: Omit<ModalState, 'isVisible' | 'onPrimaryButtonPress' | 'onSecondaryButtonPress'>;
  };
};

export type ShowModalParams<T extends ScreenKeys> = {
  screen: T;
  modalKey: keyof ModalKeysByScreenType[T];
  customConfig?: Partial<ModalState>;
};
