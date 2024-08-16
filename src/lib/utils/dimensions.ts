import {Dimensions} from 'react-native';
import {isIOS} from '.';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

// iPhone 14 해상도
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

const widthRatio = SCREEN_WIDTH / BASE_WIDTH;
const heightRatio = SCREEN_HEIGHT / BASE_HEIGHT;

const widthScale = (size: number) => Math.round(size * widthRatio);
const heightScale = (size: number) => Math.round(size * heightRatio);
const moderateScale = (size: number, factor = 1) =>
  size + (widthScale(size) - size) * factor;

export const ws = widthScale;
export const hs = heightScale;
export const ms = moderateScale;

const BASE_SAFEAREATOP = 47;
const BASE_SAFEAREABOTTOM = 34;

export const topWithSafeArea = (top: number) =>
  isIOS ? ms(top) : ms(top - BASE_SAFEAREATOP);
