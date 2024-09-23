import { atom } from 'recoil';

interface User {
  isLoggedIn: boolean;
}

export const userState = atom<User>({
  key: 'userState',
  default: {
    isLoggedIn: false,
  },
});