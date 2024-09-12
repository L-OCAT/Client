import React from 'react';
import { Modal, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useRecoilValue } from 'recoil';
import useModal from '../../hooks/useModal';
import { COLORS } from '../../lib/styles/theme';
import { typography } from '../../lib/styles/typography';
import { ms } from '../../lib/utils/dimensions';
import { isModalVisibleSelector, ModalType, modalTypeSelector } from '../../stores/modal';

const CustomModal = () => {
  const isVisible = useRecoilValue(isModalVisibleSelector);
  const modalType = useRecoilValue(modalTypeSelector);
  const {
    title,
    body,
    primaryButtonText,
    secondaryButtonText,
    onPrimaryButtonPress,
    onSecondaryButtonPress,
    hideModal,
  } = useModal();

  const renderButtons = () => {
    const buttonStyles = [styles.button];
    const textStyles = [typography.buttons_01];

    const renderButton = (
      text: string,
      onPress: (() => void) | undefined,
      additionalBtnStyles: ViewStyle[],
      textStyle: TextStyle
    ) => (
      <TouchableOpacity
        style={[...buttonStyles, ...additionalBtnStyles]}
        onPress={onPress || (() => {})}>
        <Text style={[...textStyles, textStyle]}>{text}</Text>
      </TouchableOpacity>
    );

    switch (modalType) {
      case ModalType.SINGLE_BUTTON:
        return renderButton(primaryButtonText, onPrimaryButtonPress, [styles.singleButton], styles.primaryButtonText);
      case ModalType.TWO_BUTTONS:
        return (
          <View style={styles.twoButtonsContainer}>
            {renderButton(secondaryButtonText || '', onSecondaryButtonPress, [styles.secondaryButton], styles.secondaryButtonText)}
            {renderButton(primaryButtonText || '', onPrimaryButtonPress, [styles.primaryButton], styles.primaryButtonText)}
          </View>
        );
      case ModalType.STACKED_BUTTONS:
        return (
          <View style={styles.stackedButtonsContainer}>
            {renderButton(primaryButtonText, onPrimaryButtonPress, [styles.primaryButton, styles.stackedButton], styles.primaryButtonText)}
            {renderButton(secondaryButtonText || '', onSecondaryButtonPress, [styles.secondaryButton, styles.stackedButton], styles.secondaryButtonText)}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={hideModal}
      statusBarTranslucent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.textWrapper}>
              <Text style={[typography.subTitle_02, styles.title]}>{title}</Text>
              {body && (
                <Text style={[typography.body_02, styles.body]}>{body}</Text>
              )}
            </View>
            {renderButtons()}
          </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    width: ms(342),
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: ms(16),
    paddingTop: ms(24),
    alignItems: 'center',
  },
  textWrapper: {
    marginBottom: ms(24),
    gap: ms(8),
  },
  title: {
    textAlign: 'center',
    color: COLORS.black,
  },
  body: {
    textAlign: 'center',
    color: COLORS.gray.Gray05,
  },
  button: {
    height: ms(48),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  singleButton: {
    backgroundColor: COLORS.orange.Orange01,
    width: '100%',
  },
  twoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: ms(8),
  },
  stackedButtonsContainer: {
    width: '100%',
    gap: ms(12),
  },
  primaryButton: {
    backgroundColor: COLORS.orange.Orange01,
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: COLORS.orange.Orange02,
    flex: 1,
  },
  stackedButton: {
    width: '100%',
  },
  primaryButtonText: {
    color: COLORS.white,
  },
  secondaryButtonText: {
    color: COLORS.orange.Orange01,
  },
});

export default CustomModal;
