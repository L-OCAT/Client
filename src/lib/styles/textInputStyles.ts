import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const TextInputStyle = StyleSheet.create({
    textInput: {
        borderRadius: 8,
        backgroundColor: COLORS.gray.Gray01,
        paddingHorizontal: 14,
        color: COLORS.black
    },
    smallText: {
        color: COLORS.gray.Gray04,
        fontSize: 12,
        marginLeft: 16
    }
});
