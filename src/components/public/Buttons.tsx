import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTFAMILY } from '../../lib/styles/theme';
import { SCREEN_WIDTH } from '../../lib/utils'

enum ButtonSize {
    XS = 'xs',
    SM = 'sm',
    MD = 'md',
    LG = 'lg'
}

enum ButtonType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    TERTIARY = 'tertiary'
}

interface BtnProps {
    text: string;
    size?: ButtonSize;
    type?: ButtonType;
    onPress?: () => void;
    textStyle?: TextStyle;
    isDisabled?: boolean;
}

const Button = ({ text, onPress, size = ButtonSize.MD, type = ButtonType.PRIMARY, textStyle, isDisabled = false }: BtnProps) => {
    const buttonStyles: ViewStyle[] = [
        styles.btn,
        styles[type],
        styles[size],
        type === ButtonType.PRIMARY && isDisabled && styles.disabledPrimary
    ];

    const buttonTextStyles: TextStyle[] = [
        styles.btnText,
        textStyle
    ];

    return (
        <Pressable onPress={!isDisabled ? onPress : undefined} style={buttonStyles} disabled={isDisabled}>
            <Text style={buttonTextStyles}>{text}</Text>
        </Pressable>
    );
};

// 버튼 생성 함수
const createButton = (size: ButtonSize, type: ButtonType) => {
    return (props: Omit<BtnProps, 'size' | 'type'>) => <Button {...props} size={size} type={type} />;
};

// 각 버튼 컴포넌트 정의
export const PrimaryXtraSmallBtn = (props: Omit<BtnProps, 'size' | 'type'>) => createButton(ButtonSize.XS, ButtonType.PRIMARY)(props);
export const PrimarySmallBtn = (props: Omit<BtnProps, 'size' | 'type'>) => createButton(ButtonSize.SM, ButtonType.PRIMARY)(props);
export const PrimaryMediumBtn = (props: Omit<BtnProps, 'size' | 'type'>) => createButton(ButtonSize.MD, ButtonType.PRIMARY)(props);
export const PrimaryLargeBtn = (props: Omit<BtnProps, 'size' | 'type'>) => createButton(ButtonSize.LG, ButtonType.PRIMARY)(props);
export const SecondaryMediumBtn = (props: Omit<BtnProps, 'size' | 'type'>) => createButton(ButtonSize.MD, ButtonType.SECONDARY)(props);
export const TertiaryMediumBtn = (props: Omit<BtnProps, 'size' | 'type'>) => createButton(ButtonSize.MD, ButtonType.TERTIARY)(props);

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 18,
        fontFamily: FONTFAMILY.pretendard_bold,
        color: COLORS.white
    },
    [ButtonSize.XS]: {
        width: 56,
        height: 24,
        borderRadius: 4,
    },
    [ButtonSize.SM]: {
        width: 73,
        height: 32,
        borderRadius: 4,
    },
    [ButtonSize.MD]: {
        width: 95,
        height: 47,
        borderRadius: 8,
    },
    [ButtonSize.LG]: {
        width: SCREEN_WIDTH - 32,
        height: 56,
        marginHorizontal: 16,
        borderRadius: 8,
    },
    [ButtonType.PRIMARY]: {
        backgroundColor: COLORS.orange.Orange01,
    },
    [ButtonType.SECONDARY]: {
        backgroundColor: COLORS.orange.Orange02,
    },
    [ButtonType.TERTIARY]: {
        backgroundColor: COLORS.gray.Gray03,
    },
    secondaryText: {
        color: COLORS.orange.Orange01,
    },
    disabledPrimary: {
        backgroundColor: COLORS.orange.Orange02,
    }
});