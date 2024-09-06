import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import {isIOS} from '../../lib/utils';

interface KeyboardAvoidingWrapperProps {
  children: React.ReactNode;
  offset?: number;
  style?: ViewStyle;
  withMultiline?: boolean;
}

export const KeyboardAvoidingWrapper = ({
  children,
  offset = -140,
  style,
  withMultiline = false,
}: KeyboardAvoidingWrapperProps) => {
  const onFocusEffect = useCallback(() => {
    if (isIOS && withMultiline) {
      AvoidSoftInput.setAvoidOffset(offset);
      AvoidSoftInput.setEnabled(true);
      return () => {
        AvoidSoftInput.setEnabled(false);
      };
    }
  }, [offset]);

  useFocusEffect(onFocusEffect);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        style={[styles.container, style]}
        behavior={isIOS ? 'padding' : undefined}>
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
