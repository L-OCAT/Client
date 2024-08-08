import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

const commonTextInputStyle = {
    borderRadius: 8,
    backgroundColor: COLORS.gray.Gray01,
    paddingHorizontal: 14,
    color: COLORS.black
}

export const textInputStyles = StyleSheet.create({
    default: {
        ...commonTextInputStyle
    },
    detailDescription: {
        ...commonTextInputStyle,
        height: 150
    },
    search: {
        ...commonTextInputStyle,
        paddingLeft: 40,
        paddingRight: 14
    },
    popupInput: {
        ...commonTextInputStyle,
        backgroundColor: '#E7EAEE'
    },
    popupInputTextAlignCenter: {
        ...commonTextInputStyle,
        backgroundColor: '#E7EAEE',
        textAlign: 'center'
    },
    errorInput: {
        ...commonTextInputStyle,
        borderColor: '#FF2B29',
        borderWidth: 1
    },
});

const commonSmallTextStyle = {
    fontSize: 12,
    marginLeft: 16
}
  
export const smallTextStyles = StyleSheet.create({
    default: {
        ...commonSmallTextStyle,
        color: COLORS.gray.Gray04
    },
    error: {
        ...commonSmallTextStyle,
        color: '#FF2B29'
    },
    success: {
        ...commonSmallTextStyle,
        color: COLORS.orange.Orange01
    },
});