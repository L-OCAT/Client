import {StyleSheet} from 'react-native';
import {FONTFAMILY} from './theme';

export const typography = StyleSheet.create({
  header: {
    fontFamily: FONTFAMILY.pretendard_bold,
    fontSize: 32,
    lineHeight: 32 * 1.2,
  },
  title: {
    fontFamily: FONTFAMILY.pretendard_bold,
    fontSize: 28,
    lineHeight: 28 * 1.2,
  },
  subTitle_01: {
    fontFamily: FONTFAMILY.pretendard_bold,
    fontSize: 24,
    lineHeight: 24 * 1.3,
  },
  subTitle_02: {
    fontFamily: FONTFAMILY.pretendard_bold,
    fontSize: 20,
    lineHeight: 20 * 1.3,
  },
  body_01: {
    fontFamily: FONTFAMILY.pretendard_regular,
    fontSize: 18,
    lineHeight: 18 * 1.3,
  },
  body_01_B: {
    fontFamily: FONTFAMILY.pretendard_bold,
    fontSize: 18,
    lineHeight: 18 * 1.3,
  },
  body_02: {
    fontFamily: FONTFAMILY.pretendard_regular,
    fontSize: 16,
    lineHeight: 16 * 1.3,
  },
  body_02_B: {
    fontFamily: FONTFAMILY.pretendard_bold,
    fontSize: 16,
    lineHeight: 16 * 1.3,
  },
  body_02_SB: {
    fontFamily: FONTFAMILY.pretendard_semibold,
    fontSize: 16,
    lineHeight: 16 * 1.3,
  },
  caption: {
    fontFamily: FONTFAMILY.pretendard_regular,
    fontSize: 12,
    lineHeight: 12 * 1.3,
  },
  buttons_01: {
    fontFamily: FONTFAMILY.pretendard_bold,
    fontSize: 18,
    lineHeight: 18 * 1.3,
  },
  buttons_02: {
    fontFamily: FONTFAMILY.pretendard_regular,
    fontSize: 18,
    lineHeight: 18 * 1.3,
  },
});
