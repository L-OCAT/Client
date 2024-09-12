import { useRecoilState } from 'recoil';
import {
  MODAL_CONFIGS,
  modalState,
  ScreenKeys,
  ShowModalParams
} from '../stores/modal';

const useModal = () => {
  const [state, setState] = useRecoilState(modalState);

  const showModal = <T extends ScreenKeys>({ screen, modalKey, customConfig = {} }: ShowModalParams<T>) => {
    const screenConfigs = MODAL_CONFIGS[screen];
    if (screenConfigs && modalKey in screenConfigs) {
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

  return {
    showModal,
    hideModal,
    ...state,
  };
};

export default useModal;
