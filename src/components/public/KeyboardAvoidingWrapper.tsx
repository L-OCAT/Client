import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {KeyboardAvoidingView, StyleSheet, ViewStyle} from 'react-native';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import {isIOS} from '../../lib/utils';

interface KeyboardAvoidingWrapperProps {
  children: React.ReactNode;
  offset?: number;
  style?: ViewStyle;
}

export const KeyboardAvoidingWrapper: React.FC<
  KeyboardAvoidingWrapperProps
> = ({children, offset = -140, style}) => {
  const onFocusEffect = useCallback(() => {
    if (isIOS) {
      AvoidSoftInput.setAvoidOffset(offset);
      AvoidSoftInput.setEnabled(true);
      return () => {
        AvoidSoftInput.setEnabled(false);
      };
    }
  }, [offset]);

  useFocusEffect(onFocusEffect);

  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={isIOS ? 'padding' : undefined}>
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
