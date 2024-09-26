import { ModalKeysByScreen, ModalType, ScreenKeys } from './configs';

type BaseModalState = {
  isVisible: boolean;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryButtonPress?: () => void;
  onSecondaryButtonPress?: () => void;
  modalType: ModalType;
};

export type SingleMessageModalState = BaseModalState & {
  singleMessage: string;
  title?: never;
  body?: never;
};

type TitleBodyModalState = BaseModalState & {
  singleMessage?: never;
  title: string;
  body: string;
};

export type ModalState = SingleMessageModalState | TitleBodyModalState;

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
