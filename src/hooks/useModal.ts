import { useRecoilState } from 'recoil';
import {
  MODAL_CONFIGS,
  modalState,
  ModalType,
  ScreenKeys,
  ShowModalParams,
  SingleMessageModalState
} from '../stores/modal';

const useModal = () => {
  const [state, setState] = useRecoilState(modalState);

  const showModal = <T extends ScreenKeys>({ screen, modalKey, customConfig = {} }: ShowModalParams<T>) => {
    const screenConfigs = MODAL_CONFIGS[screen];
    if (screenConfigs && modalKey in screenConfigs) {
      resetModal();
      const baseConfig = screenConfigs[modalKey];
      setState(prevState => ({
        ...prevState,
        ...baseConfig,
        ...customConfig,
        isVisible: true,
      }));
    }
  };

  const hideModal = () => {
    setState(prev => ({...prev, isVisible: false}));
  };

  const resetModal = () => {
    setState({
      isVisible: false,
      primaryButtonText: '',
      secondaryButtonText: '',
      modalType: ModalType.NONE,
      singleMessage: '',
    } as SingleMessageModalState);
  };

  return {
    showModal,
    hideModal,
    resetModal,
    ...state,
  };
};

export default useModal;
