import { atom } from 'recoil';
import { ModalType } from './configs';
import { ModalState } from './types';

export const modalState = atom<ModalState>({
  key: 'modalState',
  default: {
    isVisible: false,
    body: '',
    primaryButtonText: '',
    modalType: ModalType.NONE,
  },
});
