import React from 'react';
import {Pressable, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import {COLORS, FONTFAMILY} from '../../lib/styles/theme';
import {ms, SCREEN_WIDTH} from '../../lib/utils/dimensions';

enum ButtonSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

interface BtnProps {
  text: string;
  size?: ButtonSize;
  type?: ButtonType;
  onPress?: () => void;
  textStyle?: TextStyle;
  isDisabled?: boolean;
}

const Button = ({
  text,
  onPress,
  size = ButtonSize.MD,
  type = ButtonType.PRIMARY,
  textStyle,
  isDisabled = false,
}: BtnProps) => {
  const buttonStyles: ViewStyle[] = [
    styles.btn,
    styles[type],
    styles[size],
    ...(type === ButtonType.PRIMARY && isDisabled
      ? [styles.disabledPrimary]
      : type === ButtonType.TERTIARY && isDisabled
      ? [styles.disabledTertiary]
      : []),
  ];

  const buttonTextStyles: TextStyle[] = [
    styles.btnText,
    ...(textStyle ? [textStyle] : []),
    ...(type === ButtonType.TERTIARY && isDisabled
      ? [styles.disabledTertiaryText]
      : [])
  ];

  return (
    <Pressable
      onPress={!isDisabled ? onPress : undefined}
      style={buttonStyles}
      disabled={isDisabled}>
      <Text style={buttonTextStyles}>{text}</Text>
    </Pressable>
  );
};

// 버튼 생성 함수
const createButton = (size: ButtonSize, type: ButtonType) => {
  return (props: Omit<BtnProps, 'size' | 'type'>) => (
    <Button {...props} size={size} type={type} />
  );
};

// 각 버튼 컴포넌트 정의
export const PrimaryXtraSmallBtn = (props: Omit<BtnProps, 'size' | 'type'>) =>
  createButton(ButtonSize.XS, ButtonType.PRIMARY)(props);
export const PrimarySmallBtn = (props: Omit<BtnProps, 'size' | 'type'>) =>
  createButton(ButtonSize.SM, ButtonType.PRIMARY)(props);
export const PrimaryMediumBtn = (props: Omit<BtnProps, 'size' | 'type'>) =>
  createButton(ButtonSize.MD, ButtonType.PRIMARY)(props);
export const PrimaryLargeBtn = (props: Omit<BtnProps, 'size' | 'type'>) =>
  createButton(ButtonSize.LG, ButtonType.PRIMARY)(props);
export const SecondaryMediumBtn = (props: Omit<BtnProps, 'size' | 'type'>) =>
  createButton(ButtonSize.MD, ButtonType.SECONDARY)(props);
export const TertiaryMediumBtn = (props: Omit<BtnProps, 'size' | 'type'>) =>
  createButton(ButtonSize.MD, ButtonType.TERTIARY)(props);

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontFamily: FONTFAMILY.pretendard_bold,
    color: COLORS.white,
  },
  [ButtonSize.XS]: {
    width: ms(56),
    height: ms(24),
    borderRadius: 4,
  },
  [ButtonSize.SM]: {
    width: ms(73),
    height: ms(32),
    borderRadius: 4,
  },
  [ButtonSize.MD]: {
    width: ms(95),
    height: ms(47),
    borderRadius: 8,
  },
  [ButtonSize.LG]: {
    width: SCREEN_WIDTH - ms(32),
    height: ms(56),
    marginHorizontal: ms(16),
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
  },
  disabledTertiary: {
    backgroundColor: COLORS.gray.Gray01,
  },
  disabledTertiaryText: {
    color: COLORS.gray.Gray02
  }
});
