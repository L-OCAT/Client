import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { useRecoilState, useResetRecoilState } from 'recoil';
import CheckIcon from '../../assets/svg/icon_check.svg';
import CategorySelector from '../../components/lostItem/CategorySelector';
import ColorSelector from '../../components/lostItem/ColorSelector';
import ImagePicker from '../../components/lostItem/ImagePicker';
import { PrimaryLargeBtn } from '../../components/public/Buttons';
import { BackBtnGnbHeader } from '../../components/public/GnbHeader';
import { KeyboardAvoidingWrapper } from '../../components/public/KeyboardAvoidingWrapper';
import useModal from '../../hooks/useModal';
import { useResetOnBackNavigation } from '../../hooks/useResetStateOnBackNavigation';
import {
  smallTextStyles,
  textInputStyles,
} from '../../lib/styles/textInputStyles';
import { COLORS } from '../../lib/styles/theme';
import { typography } from '../../lib/styles/typography';
import { ms } from '../../lib/utils/dimensions';
import {
  ColorOption,
  lostItemCategoryAtom,
  lostItemColorsAtom,
  lostItemDescriptionAtom,
  lostItemImageAtom,
  lostItemIsRewardOfferedAtom,
  lostItemNameAtom,
  MainCategory,
  partialLostItemSelector,
} from '../../stores/lostItem';
import { LostItemRegistrationModalKeys, ScreenKeys } from '../../stores/modal';

const LostItemRegistrationScreen = () => {
  const navigation = useNavigation();
  const {showModal, hideModal} = useModal();
  const [image, setImage] = useRecoilState(lostItemImageAtom);
  const [lostItemName, setLostItemName] = useRecoilState(lostItemNameAtom);
  const [lostItemCategory, setLostItemCategory] =
    useRecoilState(lostItemCategoryAtom);
  const [lostItemColors, setLostItemColors] =
    useRecoilState(lostItemColorsAtom);
  const [description, setDescription] = useRecoilState(lostItemDescriptionAtom);
  const [isRewardOffered, setIsRewardOffered] = useRecoilState(
    lostItemIsRewardOfferedAtom,
  );
  const [errors, setErrors] = useState({
    name: false,
    category: false,
    colors: false,
  });
  const [hasBeenChecked, setHasBeenChecked] = useState(false);

  const resetLostItem = useResetRecoilState(partialLostItemSelector);
  const handleGoBackWithResetState = useResetOnBackNavigation(resetLostItem);

  const validateRequiredFields = useCallback(() => {
    if (!hasBeenChecked) return true;
    
    const newErrors = {
      name: !lostItemName.trim(),
      category: !lostItemCategory.main,
      colors: lostItemColors.length === 0,
    };
    
    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  }, [hasBeenChecked, lostItemName, lostItemCategory.main, lostItemColors]);

  useEffect(() => {
    validateRequiredFields();
  }, [validateRequiredFields]);

  const handleNavigateToMap = () => {
    setHasBeenChecked(true);
    if (!validateRequiredFields()) return;
    if (
      lostItemCategory.main === MainCategory.NONE &&
      lostItemColors.includes(ColorOption.OTHER)
    ) {
      showModal({
        screen: ScreenKeys.LOST_ITEM_REGISTRATION,
        modalKey: LostItemRegistrationModalKeys.CONFIRMATION,
        customConfig: {
          onPrimaryButtonPress: () => {
            console.log('지도로 이동');
            // navigation.navigate('MapScreen');
          },
          onSecondaryButtonPress: hideModal,
        },
      });
    } else {
      console.log('지도로 이동');
      // navigation.navigate('MapScreen');
    }
  };

  const handleCheckbox = () => setIsRewardOffered(prev => !prev);

  const checkedStyle: ViewStyle | null = isRewardOffered
    ? {
        backgroundColor: COLORS.orange.Orange01,
        borderWidth: 0,
      }
    : null;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingWrapper withMultiline={true}>
        <BackBtnGnbHeader
          title="분실물 등록"
          onPress={handleGoBackWithResetState}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.contentsWrapper}>
            <ImagePicker onImageChange={setImage} />
            <View style={styles.textInputWrapper}>
              <Text style={[typography.body_02_B, styles.label]}>물건명*</Text>
              <TextInput
                style={[
                  textInputStyles.default,
                  errors.name && styles.requiredField,
                ]}
                value={lostItemName}
                onChangeText={text => {
                  setLostItemName(text);
                  setErrors(prev => ({...prev, name: false}));
                }}
                placeholder="물건 이름을 입력해주세요."
                placeholderTextColor={COLORS.gray.Gray03}
              />
              {errors.name && (
                <Text style={smallTextStyles.error}>
                  물건명을 입력해주세요.
                </Text>
              )}
            </View>
            <CategorySelector />
            {errors.category && (
              <Text style={smallTextStyles.error}>
                카테고리를 선택해주세요.
              </Text>
            )}
            <ColorSelector />
            {errors.colors && (
              <Text style={smallTextStyles.error}>
                색상을 선택해주세요.
              </Text>
            )}
            <View style={styles.textInputWrapper}>
              <Text style={[typography.body_02_B, styles.label]}>상세설명</Text>
              <TextInput
                style={textInputStyles.detailDescription}
                value={description}
                onChangeText={setDescription}
                placeholder="잃어버린 물건의 특징을 상세하게 작성해주세요."
                placeholderTextColor={COLORS.gray.Gray03}
                multiline
                scrollEnabled={false}
              />
            </View>
            <View style={styles.rewardWrapper}>
              <Pressable
                onPress={handleCheckbox}
                style={styles.checkBoxWrapper}>
                <View style={[styles.checkBox, checkedStyle]}>
                  {isRewardOffered && <CheckIcon />}
                </View>
              </Pressable>
              <Text style={[typography.body_02, styles.rewardText]}>
                보상금 지급 의사
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.btnBox}>
          <PrimaryLargeBtn text="다음" onPress={handleNavigateToMap} />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    gap: ms(12),
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentsWrapper: {
    paddingHorizontal: ms(16),
    flex: 1,
  },
  textInputWrapper: {
    paddingVertical: ms(12),
    gap: ms(8),
  },
  label: {
    color: COLORS.gray.Gray05,
  },
  btnBox: {
    paddingVertical: 10,
  },
  rewardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(12),
    gap: ms(4),
  },
  checkBoxWrapper: {
    width: ms(24),
    height: ms(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBox: {
    width: ms(18),
    height: ms(18),
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.gray.Gray02,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardText: {
    color: COLORS.gray.Gray04,
  },
  requiredField: {
    borderColor: COLORS.orange.Orange01,
    borderWidth: 1,
  },
});

export default LostItemRegistrationScreen;
