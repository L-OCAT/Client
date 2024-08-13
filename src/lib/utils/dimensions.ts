import {Dimensions} from 'react-native';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

// iPhone 14 해상도
const BASE_WIDHT = 390;
const BASE_HEIGHT = 844;

const scaleWidth = SCREEN_WIDTH / BASE_WIDHT;
const scaleHeight = SCREEN_HEIGHT / BASE_HEIGHT;

//둘 중 더 작은 스케일 팩터를 사용하여 혹시모를 오버플로우 방지
export const scale = Math.min(scaleWidth, scaleHeight);

const scaledSize = (size: number) => Math.round(size * scale);
const scaledWidth = (size: number) => Math.round(size * scaleWidth);
const scaledHeight = (size: number) => Math.round(size * scaleHeight);

export const s = scaledSize;
export const w = scaledWidth;
export const h = scaledHeight;
