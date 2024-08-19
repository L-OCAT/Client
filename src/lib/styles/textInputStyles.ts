import {StyleSheet, TextStyle} from 'react-native';
import {ms} from '../utils/dimensions';
import {COLORS} from './theme';

const commonTextInputStyle: TextStyle = {
  height: ms(48),
  paddingHorizontal: ms(12),
  paddingVertical: ms(8),
  borderRadius: 8,
  backgroundColor: COLORS.gray.Gray01,
  color: COLORS.black,
};

export const textInputStyles = StyleSheet.create({
  default: {
    ...commonTextInputStyle,
  },
  detailDescription: {
    ...commonTextInputStyle,
    height: ms(140),
    paddingHorizontal: ms(10),
    paddingVertical: ms(10),
    textAlignVertical: 'top',
  },
  search: {
    ...commonTextInputStyle,
    paddingLeft: ms(40),
    paddingRight: ms(14),
  },
  popupInput: {
    ...commonTextInputStyle,
    backgroundColor: '#E7EAEE',
  },
  popupInputTextAlignCenter: {
    ...commonTextInputStyle,
    backgroundColor: '#E7EAEE',
    textAlign: 'center',
  },
  errorInput: {
    ...commonTextInputStyle,
    borderColor: '#FF2B29',
    borderWidth: 1,
  },
});

const commonSmallTextStyle = {
  fontSize: 12,
  marginLeft: ms(16),
};

export const smallTextStyles = StyleSheet.create({
  default: {
    ...commonSmallTextStyle,
    color: COLORS.gray.Gray04,
  },
  error: {
    ...commonSmallTextStyle,
    color: '#FF2B29',
  },
  success: {
    ...commonSmallTextStyle,
    color: COLORS.orange.Orange01,
  },
});
