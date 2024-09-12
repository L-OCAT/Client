import { selector } from "recoil";
import { modalState } from "./atoms";

export const isModalVisibleSelector = selector({
  key: 'isModalVisibleSelector',
  get: ({get}) => {
    const modal = get(modalState);
    return modal.isVisible;
  },
});

export const modalTypeSelector = selector({
  key: 'modalTypeSelector',
  get: ({get}) => {
    const modal = get(modalState);
    return modal.modalType;
  },
});