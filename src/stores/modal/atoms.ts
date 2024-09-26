import { atom } from 'recoil';
import { ModalType } from './configs';
import { ModalState, SingleMessageModalState } from './types';

export const modalState = atom<ModalState>({
  key: 'modalState',
  default: {
    isVisible: false,
    primaryButtonText: '',
    modalType: ModalType.NONE,
    singleMessage: '',
  } as SingleMessageModalState,
});
